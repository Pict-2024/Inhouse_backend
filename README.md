# Starter template for node js projects
This starter template includes user authentication and authorization for any express.js application.
-It is using lastest import statment. To use the lastest import statment syntax you can check out package.json file for type field.

## Middleware for Handling Asynchrnous function
### Use Case:
- The use case for this code is to simplify error handling for asynchronous route handlers in an Express.js application.
- Instead of writing try...catch blocks in every asynchronous route handler, you can use this middleware to handle errors globally. It allows you to focus on the business logic of your routes while ensuring that any errors are captured and properly handled
- Ex: 
    ```
    export default theFunc => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
    };
    ```

## Middleware for Handling Error  
### ErrorHandler
- This class inherits the default Erro class of node js
- The Error.captureStackTrace() method in Node.js creates a .stack property on the target object, which returns a string representing the location in the code where Error.captureStackTrace() was called. 
    ```
    class ErrorHander extends Error{
        constructor(message,statusCode){
            super(message);
            this.statusCode = statusCode
            Error.captureStackTrace(this,this.constructor);
        }
    }

    ```
### Creating Custom Error (Error.js)
- If you want to add custom error you can add it in this file.
- To throw new error, we are using ErroHandler created previously
- ErrorHandler takes two major arguments 
    1. Error message to be shown
    2. Status code of the error
- Ex:
    ```
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    ```
### Adding errorhandler to app.js

    ```
    import errorMiddleware from './middleware/Error.js'
    // this middleware should be used at the last
    app.use(errorMiddleware)
    ```
    
## Combining both custome error Handler and catchAsyncError function
    ```
    const ErrorHandler = require('./ErrorHandler');
    const getUser = catchAsync(async (req, res) => {
        // Simulate fetching a user from a database
        const user = /* your user fetching logic here */ null;

        if (!user) {
            const message = 'User not found';
            const statusCode = 404;
            throw new ErrorHandler(message, statusCode);
        }

        res.status(200).json({ user });
    });
    ```

