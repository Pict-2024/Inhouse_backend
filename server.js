import app from './app.js'
import 'dotenv/config'


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// call connect Database function here



// starting the server
const server = app.listen(process.env.PORT, () => {

  //console.log(`Server is working on http://10.10.15.150:${process.env.PORT}`);
   console.log(`Server is working on http://localhost:${process.env.PORT}`);

});



// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });

