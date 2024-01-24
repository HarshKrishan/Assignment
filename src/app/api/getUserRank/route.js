// import connectSql,{connection} from "../connectDb/route";  // uncomment this line to connect to mysql database locally
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export async function POST(req) {
  // console.log("entering getUserRank route");


  const { user_id } = await req.json();
  

  //uncomment this code to connect to mysql database locally
  // connectSql();

  // const result = await connection
  //   .promise()
  //   .query(
  //     `SELECT UID, Name, Score, Country, TimeStamp, UserRank FROM ( SELECT UID, Name, Score, Country, TimeStamp, RANK() OVER (ORDER BY Score DESC) AS UserRank FROM assignment.user) AS temp WHERE UID = '${user_id}';`
  //   )
  //   .then(([data, fields]) => {
  //     // console.log(data);
  //     return data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return NextResponse.json(
  //       { result: "Error getting Rank" },
  //       { status: 500 }
  //     );
  //   });
    
  // return NextResponse.json({ result: result }, { status: 200 });




  //code for connecting to vercel database
  const result =
    await sql`SELECT UID, Name, Score, Country, TimeStamp, UserRank FROM ( SELECT UID, Name, Score, Country, TimeStamp, RANK() OVER (ORDER BY Score DESC) AS UserRank FROM userdata) AS temp WHERE UID = ${user_id};`
    .then((data) => {
      // console.log(data);
      return data;
    }
    )
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Error getting Rank" },
        { status: 500 }
      );
    });

  return NextResponse.json({ result: result }, { status: 200 });
}
