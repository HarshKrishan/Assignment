// import connectSql, { connection } from "../connectDb/route";   // uncomment this line to connect to mysql database locally
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req) {
  // console.log("entering getAllData route");

  
  //uncomment this code to connect to mysql database locally
  // connectSql();

  // const result = await connection
  //   .promise()
  //   // .query(
  //   //   `SELECT UID, Name, Score, Country, TimeStamp, RANK() OVER (ORDER BY Score DESC) AS UserRank FROM user;`  // this query was working on localhost but not on hostedDatabase
  //   // )
  //   .query(
  //     `SELECT UID, Name, Score, Country, TimeStamp, (SELECT COUNT(*) + 1 FROM user u2 WHERE u2.Score > u1.Score) AS UserRank FROM user u1 ORDER BY Score DESC;`
  //   )
  //   .then(([data, fields]) => {
  //     console.log(data);
  //     return data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return NextResponse.json(
  //       { result: "Error getting data" },
  //       { status: 500 }
  //     );
  //   });
  //   connection.release();
  // return NextResponse.json({ result: result }, { status: 200 });



  //code for connecting to vercel database
  const result =
    await sql`SELECT UID, Name, Score, Country, TimeStamp, RANK() OVER (ORDER BY Score DESC) AS UserRank FROM userdata;`
    .then((data) => {
      // console.log(data);
      return data;
    }
    )
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Error getting data" },
        { status: 500 }
      );
    });

  return NextResponse.json({ result: result }, { status: 200 });

}
