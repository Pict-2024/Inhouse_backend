import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./emailService.js";
import bcrypt from "bcrypt";

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const register = async (req, res) => {
  const { name, gmail, password, pro_email } = req.body;
  let role;


  try {
    const student = await pool.query(
      "SELECT * FROM student_login WHERE Email = ?",
      [gmail]
    );
    const teacher = await pool.query(
      "SELECT * FROM teacher_login WHERE Username = ?",
      [gmail]
    );

    const proEmailCheck = await pool.query(
      "SELECT * FROM register WHERE  Username = ?",
      [gmail]
    );


    if (proEmailCheck[0].length > 0) {
      return res.status(400).send({ message: "User is already registered" });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    if (student[0].length > 0) {
      role = 2;
      await pool.query(
        "INSERT INTO register (Name, Username, Password, Role, Professional_Email) VALUES(?,?,?,?,?)",
        [name, gmail, hash_password, role, pro_email]
      );
      res.status(200).send("Registration successful");
    } else if (teacher[0].length > 0) {
      role = 1;
      await pool.query(
        "INSERT INTO register (Name, Username, Password, Role, Professional_Email) VALUES(?,?,?,?,?)",
        [name, gmail, hash_password, role, gmail]
      );
      res.status(200).send("Registration successful");
    } else {
      res.status(400).send("Invalid email");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

export const verify = async (req, res) => {
  const { gmail, password } = req.body;
  let role;

  try {
    const teacher = await pool.query(
      "SELECT * FROM teacher_login WHERE Username = ? AND Password = ?",
      [gmail, password]
    );
    const student = await pool.query(
      "SELECT * FROM student_login WHERE Email = ? AND Password = ?",
      [gmail, password]
    );
    if (student[0].length > 0) {
      role = 2;
    } else if (teacher[0].length > 0) {
      role = 1;
    }
    if (student[0].length > 0 || teacher[0].length > 0) {
      res.status(200).send({
        success: true,
        message: "Email and Password verified",
        role: role,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

export const checkRegistration = async (req, res) => {
  const email = req.params.email;

  try {
    const results = await pool.query(
      "SELECT * FROM register WHERE Email = ? AND Password IS NOT NULL",
      [email]
    );
    if (results[0].length > 0) {
      res.status(200).json({ registered: true });
    } else {
      res.status(200).json({ registered: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// Updated login function
export const login = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    // Check if the email exists in the register table
    const results = await pool.query(
      "SELECT * FROM register WHERE Professional_Email = ?",
      [gmail]
    );

    if (results[0].length > 0) {
      const user = results[0][0];

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.Password);
      if (isMatch) {
        // Generate token excluding password
        const accessToken = generateToken({
          id: user.id,
          email: user.Email,
          role: user.Role,
        });

        // Create user object without password
        const userWithoutPassword = {
          id: user.id,
          Name: user.Name,
          Username: user.Username,
          Role: user.Role,
          Professional_Email: user.Professional_Email,
        };

        res.status(200).send({
          success: true,
          message: "Login Successful",
          data: {
            user: userWithoutPassword,
            accessToken,
          },
        });
        console.log(req.body); // Log request body if needed
      } else {
        res.status(401).send({
          success: false,
          message: "Incorrect password",
          data: "Incorrect password",
        });
      }
    } else {
      res.status(401).send({
        success: false,
        message: "Email not registered",
        data: "Email not registered",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      data: err.message,
    });
  }
};


export const hashExistingPassword = async (req, res) => {
  try {
    // change fields here
    // const users = await pool.query("SELECT Username, Password FROM register");
    // const { rows: users } = await pool.query("SELECT Username, Password FROM register WHERE Hashed_Password IS NULL");
    const result = await pool.query("SELECT Username, Password FROM register WHERE Hashed_Password = '' ");
    const users = result[0];

    // console.log(users);
    for (const user of users) {
      console.log(user.Password);

      const saltRound = 10;
      const hash_password = await bcrypt.hash(user.Password, saltRound);
      await pool.query("UPDATE register SET Hashed_Password = ? WHERE Username = ?", [
        hash_password,
        user.Username,
      ]);
    }
    console.log('success');
    res.status(200).send({
      success: true,
      message: "Password hashed",
    });
  } catch (error) {
    console.error(error);
  } 
};


export const getAllTeacher = async (req, res) => {
  try {
    const teacher = await pool.query(
      "SELECT Name, Username, Role, SpecialAccess_Teacher, SpecialAccess_Student FROM register WHERE Role = 1"
    );
    if (teacher[0].length > 0) {
      res.status(200).send({
        success: true,
        message: "Data Fetched Successfully",
        data: teacher[0],
      });
    } else {
      res.status(401).send({
        success: false,
        message: "No Data Found",
        data: "No Data Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Fetching data",
      data: err.message,
    });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const student = await pool.query(
      "SELECT Name, Username, Role FROM register WHERE Role = 2"
    );
    if (student[0].length > 0) {
      res.status(200).send({
        success: true,
        message: "Data Fetched Successfully",
        data: student[0],
      });
    } else {
      res.status(401).send({
        success: false,
        message: "No Data Found",
        data: "No Data Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Fetching data",
      data: err.message,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    //check
    const [user] = await pool.query(
      "SELECT * FROM register WHERE Username = ? AND Password IS NOT NULL",
      [email]
    );
    if (!user.length) {
      res.status(404).send({ success: false, message: "User not found" });
      return;
    }

    //me
    const resetPasswordToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetPasswordLink = `${process.env.APP_URL}/reset-password`;

    const mailOptions = {
      to: email,
      subject: "Password reset Link",
      html: `click <a href= ${resetPasswordLink} >here</a> to reset your password`,
    };

    await sendEmail(mailOptions);

    res.status(200).send({
      success: true,
      message: "Password reset link has been sent to your email address.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//reset password controller
export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .send({ message: "Email and New password is required" });
    }

    const [user] = await pool.query("SELECT * FROM register WHERE Username = ?", [
      email,
    ]);
    if (!user.length) {
      res.status(400).send({
        success: false,
        message: "User not found.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE register SET Password = ? WHERE Username = ?', [hashedPassword, email]);

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in resetting password",
      error,
    });
  }
};
