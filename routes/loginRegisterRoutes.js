import express from "express";
const router = express.Router();

import { login, register, verify, checkRegistration, getAllStudent, getAllTeacher, forgotPasswordController, resetPasswordController } from '../controller/loginRegister_controller.js';

// const login = require("../../controllers/register.js")
// const register = require("../../controllers/register.js");
// const verify = require("../../controllers/register.js");
// const checkRegistration = require("../../controllers/register.js");


router.post('/register', register);

router.post('/verify', verify);

router.get('/checkRegistration/:email', checkRegistration);

router.post('/login', login);

router.get('/getAllStudent', getAllStudent);

router.get('/getAllTeacher', getAllTeacher);

router.post('/forgot-password', forgotPasswordController);

router.post('/reset-password', resetPasswordController);

export default router