import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

import { promisify } from "util";
import { mkdir, stat } from "fs";
import path from "path";
import { table } from "console";

const mkdirAsync = promisify(mkdir);
const statAsync = promisify(stat);

// Generic Controller
class GenericController {
  constructor(Model, ID, baseUploadPath) {
    this.Model = Model;
    this.ID = ID;
    this.baseUploadPath = baseUploadPath
  }

  getAll = async (req, res) => {
    try {
      const modelInstance = new this.Model();
      const data = await modelInstance.getAll();
      res.json({ success: true, data: data[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  create = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();
    const newData = req.body;
    const result = await modelInstance.create(newData);
    res.json({ success: true, data: result });
  });

  getByUsername = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();
    const { username } = req.params;
    const data = await modelInstance.getByUsername(username)
    res.json({ success: true, data: data[0] });
  });


  updateByUsername = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();
    const { username } = req.query;
    const ID = req.query[this.ID]; // Use the stored ID field name

    const updatedFields = req.body;
    const result = await modelInstance.update(username, ID, updatedFields);
    res.json({ success: true, data: result });
  });

  deleteByUsername = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();
    const { username } = req.query;
    const ID = req.query[this.ID];
    const result = await modelInstance.deleteByUsername(username, ID);
    res.json({ success: true, data: result });
  });

  filterData = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();

    const { orderBy, limit, Start_Year, End_Year, startDate, endDate, dateColumn, ...filters } = req.query;

    const result = await modelInstance.filterQuery(
      filters,
      orderBy,
      limit,
      Start_Year,
      End_Year,
      startDate,
      endDate,
      dateColumn
    );

    res.json({ success: true, data: result })
  });


  //fetch usernames controller method
  getAllUsers = async (req, res) => {
    try {
      const modelInstance = new this.Model();
      const data = await modelInstance.getAllUsers();
      res.json({ success: true, data: data[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //get the names/list of selected filtering columns for a specific table

  // getFilteringColumns = catchAsyncErrors(async (req, res) => {
  //   try {
  //     const modelInstance = new this.Model();
  //     const filtering_columns = await modelInstance.getFilteringColumns();
  //     res.json({ success: true, data: { filtering_columns } });
  //   } catch (error) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // });

  // formatDateString(dateString) {
  //   try {
  //     const date = new Date(dateString);
  //     if (isNaN(date.getTime())) {
  //       return dateString;
  //     }
  //     const formattedDate = date.toISOString().split('T')[0];
  //     return formattedDate;
  //   } catch (error) {
  //     console.error(`Error formatting date: ${error.message}`);
  //     return dateString;
  //   }
  // }

  // getDistinctValues = catchAsyncErrors(async (req, res) => {
  //   try {
  //     const modelInstance = new this.Model();

  //     // store the distinct values from the specified columns
  //     const distinctValues = await modelInstance.getDistinctValues();

  //     // format the dates as they have time also with them
  //     const formattedDistinctValues = {};
  //     for (const column in distinctValues) {
  //       formattedDistinctValues[column] = distinctValues[column].map(this.formatDateString);
  //     }

  //     res.json({ success: true, data: formattedDistinctValues });
  //   } catch (error) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // });

  //combined

  getFilteringColumnsWithDistinctValues = catchAsyncErrors(async (req, res) => {
    try {
      const modelInstance = new this.Model();
      const filteringColumnsWithDistinctValues = await modelInstance.getFilteringColumnsWithDistinctValues();

      res.json({ success: true, data: { filtering_columns: filteringColumnsWithDistinctValues } });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  getTableNamesST = catchAsyncErrors(async (req, res) => {
    try {
      const modelInstance = new this.Model();
      const tableNames = await modelInstance.getTableNamesST();

      // combining all student and teacher data into separate arrays so that it will be easy to map in frontend 
      const combinedData = tableNames[0].reduce((accumulator, { Student_Tables, Teacher_Tables }) => {
        accumulator.Student_Tables.push(...Student_Tables.split(',').filter(Boolean));
        accumulator.Teacher_Tables.push(...Teacher_Tables.split(',').filter(Boolean));
        return accumulator;
      }, { Student_Tables: [], Teacher_Tables: [] });

      res.json({ success: true, data: combinedData });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });


  // upload file controller

  // upload file controller
  ensureDirectoryExists = async (directory) => {
    try {
      await statAsync(directory);
    } catch (error) {
      if (error.code === "ENOENT") {
        await mkdirAsync(directory, { recursive: true });
      } else {
        throw error;
      }
    }
  };

  uploadFile = async (req, res) => {
    try {
        const modelInstance = new this.Model();
        const { username, role, tableName, columnNames } = req.query;
        let files = req.files;
        console.log(req.body);
        console.log(files);

        if (!files) {
            return res.status(400).json({ success: false, message: 'Files not provided' });
        }

        // Ensure files is an array
        files = Array.isArray(files) ? files : [files];

        // Check if the file type is PDF for each file
        for (const file of files) {
            if (file.mimetype !== 'application/pdf') {
                return res.status(400).json({ success: false, message: 'Only PDF files are allowed' });
            }
        }

        // Convert columnNames string to an array
        const columnNameArray = columnNames.split(',');

        if (columnNameArray.length !== files.length) {
            return res.status(400).json({ success: false, message: 'Number of column names does not match the number of files' });
        }

        const uploadResults = [];
        for (let i = 0; i < columnNameArray.length; i++) {
            const columnName = columnNameArray[i].trim();
            const file = files[i];
            const { filePath } = await modelInstance.uploadFile(username, role, tableName, columnName, file);
            await this.ensureDirectoryExists(filePath);
            uploadResults.push({ columnName, filePath });
        }

        return res.json({ success: true, message: "Files uploaded successfully", uploadResults });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



  // get the pdf file controller
  getPdfContent = catchAsyncErrors(async (req, res) => {
    try {
      const modelInstance = new this.Model();
      const { user_id, role, filename } = req.query;

      const pdfContent = await modelInstance.getPdfContent(user_id, role, filename);

      if (!pdfContent) {
        return res.status(404).json({ success: false, message: 'PDF file not found for the user' });
      }

      res.json({ success: true, data: pdfContent });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // basic func ends

}

export default GenericController;