import express from "express";
const app = express();
import cors from 'cors';
import 'dotenv/config'
import errorMiddleware from './middleware/Error.js'
import bodyParser from 'body-parser';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Route imports
import teachersRoute from './routes/teachers.routes.js'
import loginRegisterRoutes from './routes/loginRegisterRoutes.js';
import basicRoutes from './routes/basics.routes.js';
import studentRoutes from './routes/students_routes.js';

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// //Simple middleware to log incoming requests
// app.use((req, res, next) => {
//     console.log(`Received request:${req.method} ${req.protocol}://${req.hostname}:${process.env.PORT}${req.url} `);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use("/api/v1/teacher", teachersRoute);
app.use("/api/v1/auth", loginRegisterRoutes);
app.use("/api/v1/general",basicRoutes)
app.use("/api/v1/student", studentRoutes);

// app.use(express.static(path.join(__dirname, "../Inhouse_frontend/dist")));
// app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')))



// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../Inhouse_frontend/dist/index.html"));
// });


app.use(errorMiddleware)

export default app