//uncomment this code to connect to mysql database locally

// import mysql from "mysql2";

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,  // database name
//   user: process.env.DB_USER,            // username
//   password: process.env.DB_PASSWORD,    // password
// });
// const connectSql = () => {
//   try {
//     connection.connect(function (err) {
//       if (err) throw err;
//       // console.log("Connected!");
//     });
//   } catch (error) {
//     console.log("error connecting sql", error);
//   }
// };


// export default connectSql;

// export { connection };