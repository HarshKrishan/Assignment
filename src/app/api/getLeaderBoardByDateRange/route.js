// import connectSql, { connection } from "../connectDb/route"; // uncomment this line to connect to mysql database locally
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export async function POST(req) {
  // console.log("entering getLeaderBoardByDateRange route");

    const { start_date, end_date, country } = await req.json();

  // uncomment this code to connect to mysql database locally
  // connectSql();

  // const result = await connection
  //   .promise()
  //   .query(
  //     `SELECT UID, Name, Score, Country, TimeStamp, RANK() OVER (ORDER BY Score DESC) AS UserRank FROM user WHERE TimeStamp BETWEEN '${start_date}' AND '${end_date}' AND Country = '${country}' ORDER BY UserRank LIMIT 200;`
  //   )
  //   .then(([data, fields]) => {
  //     // console.log(data);
  //     return data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return NextResponse.json(
  //       { result: "Error getting data" },
  //       { status: 500 }
  //     );
  //   });

  // return NextResponse.json({ result: result }, { status: 200 });


  //code for connecting to vercel database
  const result =
    await sql`SELECT UID, Name, Score, Country, TimeStamp, RANK() OVER (ORDER BY Score DESC) AS UserRank FROM userdata WHERE TimeStamp BETWEEN ${start_date} AND ${end_date} AND Country = ${country} ORDER BY UserRank LIMIT 200;`
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
