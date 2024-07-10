import sql from '../config/db.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUploadPath = path.join(__dirname, "..", "Uploads");

// Base model
class BaseModel {
  constructor(tableName, ID, baseUploadPath) {
    this.tableName = tableName;
    this.ID = ID;
    this.baseUploadPath = baseUploadPath
  }

  async getAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    
    return await sql.query(query);
  }

  async getByUsername(username) {
    const query = `SELECT * FROM ${this.tableName} WHERE Username = ?`;
    return await sql.query(query, [username]);
  }

  async getByID(T_ID,username) {
    const query = `SELECT * FROM ${this.tableName} WHERE T_ID = ? AND Username=?`;
    const results = await sql.query(query, [T_ID,username]);
    return results;
  }

  async create(newData) {
    // 
    const columns = Object.keys(newData).join(", ");
    const placeholders = Object.keys(newData)
      .map(() => "?")
      .join(", ");
    const values = Object.values(newData);

    const query = `INSERT INTO ${this.tableName} VALUES (${placeholders})`;
    console.log('Query: ', query);
    try {
      const result = await sql.query(query, values);
      return result;
    } catch (error) {
      throw new Error(`Error inserting data: ${error.message}`);
    }
  }

  async update(username, ID, updatedFields) {

    const setValues = [];
    const setFields = [];

    for (const key in updatedFields) {
      if (Object.prototype.hasOwnProperty.call(updatedFields, key)) {
        setFields.push(`\`${key}\` = ?`);
        setValues.push(updatedFields[key]);
      }
    }

    const query = `UPDATE ${this.tableName} SET ${setFields.join(
      ", "
    )} WHERE Username = ? and ${this.ID} = ?`;
    setValues.push(username, ID);
    
    try {
      const result = await sql.query(query, setValues);
      return result;
    } catch (error) {
      console.error(`Error executing query: ${query}, error`);
      throw new Error(`Error updating data: ${error.message}`);
    }
  }

  async deleteByUsername(username, ID) {
    const query = `DELETE FROM ${this.tableName} WHERE Username = ? and ${this.ID} = ?`;

    try {
      const result = await sql.query(query, [username, ID]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting data: ${error.message}`);
    }
  }

  //filtering query
  async filterQuery(filters, orderBy, limit, Start_Year, End_Year, startDate, endDate, dateColumn) {
    let query = `SELECT * FROM ${this.tableName}`;
    const queryParams = [];
  
    if (filters && Object.keys(filters).length > 0) {
      query += ' WHERE ';
      const filterKeys = Object.keys(filters);
      filterKeys.forEach((key, index) => {
        if(key == 'Username') {
          query += `Username like '%${filters[key]}%'`;
        }
        else{
          query += `\`${key}\` like '%${filters[key]}%'`;
        }
  
        if (index !== filterKeys.length - 1) {
          query += ' AND ';
        }
      });
    }

    if(Start_Year && End_Year) {
      
      if (filters && Object.keys(filters).length > 0) {
        query += ' AND ';
      } else {
        query += ' WHERE ';
      }
      query += `Year BETWEEN '${Start_Year}' AND '${End_Year}'`;
    }

    // Adding dynamic date filtering if start and end dates are provided
    if (startDate && endDate && dateColumn) {
      if (filters && Object.keys(filters).length > 0) {
        query += ' AND ';
      } else {
        query += ' WHERE ';
      }
      query += `${dateColumn} BETWEEN '${startDate}' AND '${endDate}'`;
    }
  
    // Adding ORDER BY clause
    if (orderBy) {
      query += ` ORDER BY ${orderBy} `;
    }
  
    // Adding LIMIT clause
    if (limit) {
      query += ` LIMIT ${limit} `;
    }
    query+=';';

    

    try {
      const result = await sql.query(query);
      return result[0];
    } catch (error) {
      throw new Error(`Error querying data: ${error.message}`);
    }
}

  // get all the columns that are selected for filtering by giving a table name
  async getFilteringColumns() {
    const query = `SELECT filtering_columns FROM metadata_teacher WHERE table_name = '${this.tableName}'`;
    
    // return await sql.query(query, [tableName]);
    const [rows] = await sql.query(query, [this.tableName]); 
    const filteringColumnsArray = rows[0].filtering_columns.split(',');
    return filteringColumnsArray;
  }

  // async getDistinctValues() {
  //   const filteringColumns = await this.getFilteringColumns();
  //   const columnsArray = filteringColumns;
  //   const distinctValues = {};

  //   for (const column of columnsArray) {
  //     const query = `SELECT DISTINCT ${column} FROM ${this.tableName}`;
  //     const result = await sql.query(query);

  //     distinctValues[column] = result[0].map((row) => row[column]);
  //   }

  //   return distinctValues;
  // }


  //combined

  async getFilteringColumnsWithDistinctValues() {
    const filteringColumns = await this.getFilteringColumns();
    const filteringColumnsWithDistinctValues = [];

    for (const column of filteringColumns) {
      const query = `SELECT DISTINCT ${column} FROM ${this.tableName}`;
      const result = await sql.query(query);
      const distinctValues = result[0].map((row) => row[column]);

      filteringColumnsWithDistinctValues.push({
        [column]: distinctValues,
      });
    }

    return filteringColumnsWithDistinctValues;
  }

  // get names of tables for students and teahers

  async getTableNamesST() {
    const query = `SELECT Student_Tables,Teacher_Tables FROM ${this.tableName};`;
    
    return await sql.query(query);
  }

  //check if file already exists
  async checkExistingFile(user_id, role, filename) {
    // const filename = `${file.originalname}`;
    const existingFileQuery = `SELECT * FROM uploads WHERE user_id = ? AND role = ? AND original_filename = ?`;
    const result = await sql.query(existingFileQuery, [user_id, role, filename]);

    // 

    if (result[0].length > 0) {
        const file = result[0][0];
        if (file.file_path) {
            return { filename: file.file_name, filePath: file.file_path };
        }
    }

    return null;
}



  //file upload functionality

  async uploadFile(username, role, tableName, columnName, file) {
    // Check and create folders if they don't exist
    const uploadPath = this.getUploadPath(username, role, tableName, columnName);
    this.createFoldersIfNotExist(uploadPath);
    
    // const originalFilename = file.originalname;
    // const filename = `${Date.now()}_${originalFilename}`;
    // const filePath = path.join(uploadPath, filename);

    const filename = `${file.originalname}`;

    const originalFilename = filename
    const filePath = path.join(uploadPath, filename);

    // Save file to local storage
    fs.writeFileSync(filePath, file.buffer);

    // Save file information to the database
    const insertQuery = `INSERT INTO uploads (user_id, role, original_filename, file_name, file_path, created_at) VALUES (?, ?, ?, ?, ?, NOW())`;
    const result = await sql.query(insertQuery, [1, role, originalFilename, filename, filePath]);

    return { filename, filePath };
}


  getUploadPath(username, role, tableName, columnName) {
    const baseUploadPath = this.baseUploadPath;
    // const roleFolder = role === 1 ? 'Teacher_Uploads' : 'Student_Uploads';
    let roleFolder = 'Admin_Uploads';

    if(role == 1) roleFolder = 'Teacher_Uploads';
    if(role == 2) roleFolder = 'Student_Uploads';

    const userFolder = username;
    const tableFolder = tableName;
    const columnFolder = columnName;
  
    // Use process.cwd() to get the current working directory
    // const currentDirPath = process.cwd();
  
    return path.join(baseUploadPath, roleFolder, tableFolder, userFolder, columnFolder);
  }    

  createFoldersIfNotExist(folderPath) {
    try {
      // Use synchronous stat to check if the folder exists
      fs.statSync(folderPath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // ENOENT indicates that the folder doesn't exist
        try {
          // Use synchronous mkdir to create the folder
          fs.mkdirSync(folderPath, { recursive: true });
          
        } catch (mkdirError) {
          console.error(`Error creating folder: ${mkdirError.message}`);
          // Handle the error as needed, e.g., throw an exception or log a message
        }
      } else {
        console.error(`Error checking folder existence: ${error.message}`);
        // Handle the error as needed
      }
    }
  }
  
  // fetch the pdf files

  async getPdfContent(user_id, role, filename) {
    try {
      const query = `
        SELECT file_name, file_path
        FROM uploads
        WHERE user_id = ? AND role = ? AND file_name = ?;
      `;
      const result = await sql.query(query, [user_id, role, filename]);

      if (result && result.length > 0) {
        return result[0];
      }

      return null;
    } catch (error) {
      throw new Error(`Error fetching PDF content: ${error.message}`);
    }
  }


  

  // You can have more specific methods 
  // for each table in their respective models.
}

export default BaseModel;