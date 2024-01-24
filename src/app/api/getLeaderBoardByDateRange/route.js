import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";
export async function POST(req) {
  // console.log("entering getLeaderBoardByDateRange route");

    const { start_date, end_date, country } = await req.json();
  connectSql();

  const result = await connection
    .promise()
    .query(
      `SELECT UID, Name, Score, Country, TimeStamp, RANK() OVER (ORDER BY Score DESC) AS UserRank FROM user WHERE TimeStamp BETWEEN '${start_date}' AND '${end_date}' AND Country = '${country}' ORDER BY UserRank LIMIT 200;`
    )
    .then(([data, fields]) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Error getting data" },
        { status: 500 }
      );
    });

  return NextResponse.json({ result: result }, { status: 200 });
}
