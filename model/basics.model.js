import sql from '../config/db.js';

// Get all table names
export async function getAllTablesModel() {
    const query = `SHOW TABLES;`;
    return await sql.query(query);
  }

// Get all columns from a specific table
export async function getAllColumnsModel(tableName) {
  const query = `DESC ${tableName};`;
  return await sql.query(query);
}

// Get all columns from a specific table
export async function getAllColumns(tableName) {
  const query = `SHOW COLUMNS FROM ${tableName};`;
  return await sql.query(query);
}

// Get all the data of the user according to selected table names
export async function getDataForUserModel(username, tableName) {
  const query = `SELECT * FROM ${tableName} WHERE Username = ?`;
  return await sql.query(query, [username]);
}

export async function updateSpecialAccess(Email, SpecialAccess) {

  const query = `UPDATE register set SpecialAccess = '${SpecialAccess}' where Email = '${Email}'`;

  const rows = await sql.query(query);
  const selectQuery = `Select * from register where Role = 1`;

  const res = await sql.query(selectQuery);

  return res[0];
}

// Update SpecialAccess columns for a user
export async function updateSpecialAccessFields(username, studentTables, teacherTables) {
  // Function to remove duplicates from an array
  const removeDuplicates = (array) => Array.from(new Set(array));

  // Function to append new values to existing values without duplicates
  const appendWithoutDuplicates = (existingValues, newValues) => {
    const allValues = removeDuplicates([...(existingValues || '').split(','), ...newValues]);
    return allValues.join(',');
  };

  const query = `
    UPDATE register
    SET 
        SpecialAccess_Student = ?,
        SpecialAccess_Teacher = ?
    WHERE Username = ?;
  `;

  // Fetch existing values
  const fetchQuery = `SELECT SpecialAccess_Student, SpecialAccess_Teacher FROM register WHERE Username = ?`;
  const [existingValues] = await sql.query(fetchQuery, [username]);

  const existingStudentTables = existingValues[0]?.SpecialAccess_Student || '';
  const existingTeacherTables = existingValues[0]?.SpecialAccess_Teacher || '';

  // Append new values without duplicates
  const updatedStudentTables = appendWithoutDuplicates(existingStudentTables, studentTables);
  const updatedTeacherTables = appendWithoutDuplicates(existingTeacherTables, teacherTables);

  const params = [updatedStudentTables, updatedTeacherTables, username];
  await sql.query(query, params);
}


// get the names of the tables whose access is given by admin

export async function getSpecialAccessTables (username) {
  const query = `SELECT SpecialAccess_Student, SpecialAccess_Teacher FROM register WHERE Username = '${username}';`;
  return await sql.query(query)
}

// remove any table from special access of a user 
export async function removeSpecialAccessFields(username, studentTables, teacherTables) {
  // Function to remove values from existing values
  const removeValues = (existingValues, valuesToRemove) => {
    const updatedValues = existingValues.split(',').filter(value => !valuesToRemove.includes(value));
    return updatedValues.join(',');
  };

  const query = `
    UPDATE register
    SET 
        SpecialAccess_Student = ?,
        SpecialAccess_Teacher = ?
    WHERE Username = ?;
  `;

  // Fetch existing values
  const fetchQuery = `SELECT SpecialAccess_Student, SpecialAccess_Teacher FROM register WHERE Username = ?`;
  const [existingValues] = await sql.query(fetchQuery, [username]);

  // Remove specified values
  const updatedStudentTables = removeValues(existingValues[0].SpecialAccess_Student, studentTables);
  const updatedTeacherTables = removeValues(existingValues[0].SpecialAccess_Teacher, teacherTables);

  const params = [updatedStudentTables, updatedTeacherTables, username];
  await sql.query(query, params);
}

// Get count of entries for a user in each table
export async function getEntryCountsOfUser(username) {
  try {
    // Determine if the user is a teacher or student based on the 'Role' column
    const roleQuery = `SELECT Role FROM register WHERE Username = ?`;
    const [roleResult] = await sql.query(roleQuery, [username]);
    const role = roleResult[0].Role;

    let tablesColumn;
    if (role === 1) {
      // Teacher role
      tablesColumn = 'Teacher_Tables';
    } else if (role === 2) {
      // Student role
      tablesColumn = 'Student_Tables';
    } else {
      throw new Error('Invalid user role');
    }

    // Fetch table names for the specific role
    const tablesQuery = `SELECT ${tablesColumn} FROM alltables_stud_fact`;
    const [tablesResult] = await sql.query(tablesQuery);

    const tables = tablesResult
    .filter(row => row[tablesColumn])
    .map(row => row[tablesColumn]);

    // Fetch count of entries for the user in each table
    const entryCounts = [];
    for (const table of tables) {
      const countQuery = `SELECT COUNT(*) AS entryCount FROM \`${table}\` WHERE Username = ?`;
      const [countResult] = await sql.query(countQuery, [username]);
      const entryCount = countResult[0].entryCount;

      entryCounts.push({ [table]: entryCount });
    }

    return entryCounts;
  } catch (error) {
    throw new Error(`Error fetching entry counts: ${error.message}`);
  }
}

// get the count of rows/entries from table
export async function getTableNames() {
  try {
    const tablesQuery = "SELECT * FROM alltables_stud_fact";
    const [tablesResult] = await sql.query(tablesQuery);

    
    const allTables = tablesResult[0];
    
    // Assuming 'Student_Tables' and 'Teacher_Tables' are columns in the result
    const studentTables = tablesResult.map(row => row.Student_Tables).filter(tableName => tableName.trim() !== '');
    const teacherTables = tablesResult.map(row => row.Teacher_Tables).filter(tableName => tableName.trim() !== '');


    return { studentTables, teacherTables };
  } catch (error) {
    throw new Error(`Error fetching table names: ${error.message}`);
  }
}

export async function getEntryCountsOfTable(tableName) {
  try {
    // Ensure proper backtick usage around the table name
    const countQuery = `SELECT COUNT(*) AS entryCount FROM \`${tableName}\``;
    const [countResult] = await sql.query(countQuery);
    return countResult[0].entryCount;
  } catch (error) {
    throw new Error(`Error fetching entry counts for ${tableName}: ${error.message}`);
  }
}

export async function getAllNotices(Role, Username) {
  let query = "";
  let params = []; // Store query parameters

  if (Role == 1) {
    query = `SELECT * FROM notices WHERE Role = 0 AND (Receiver = ? OR Receiver = 'All') order by DateTime desc`;
    params = [Username];
  } else {
    query = `SELECT * FROM notices WHERE Receiver = ? order by DateTime desc`;
    params = [Username];
  }

  try {
    const result = await sql.query(query, params);
    return result[0];
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error; // Propagate the error to the caller
  }
}


export async function addNotices(notice) {
  
  const { Username, Title, Description, Role, Receiver} = notice;
  await sql.query("INSERT INTO notices (Username, Title, Description, Role, DateTime, Receiver) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)", [Username, Title, Description, Role, Receiver]);
  
}