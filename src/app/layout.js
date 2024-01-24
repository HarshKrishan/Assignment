import { Inter } from "next/font/google";
import "./globals.css";
import SearchUser from "@/components/SearchUser";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
export const metadata = {
  title: "Leader Board Pro",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center justify-between p-10">
          <Link href="/">
          <h1 className="text-4xl font-bold">Leader Board Pro</h1>
          </Link>
          <SearchUser />
          <div className="flex justify-start w-full">
            <ul className="flex gap-x-5">
              <li className="hover:border-black hover:border-b-2">
                <Link href="/currentWeek" className="">
                  Show Current Week LeaderBoard
                </Link>
              </li>
              <li className="hover:border-black hover:border-b-2">
                <Link href="/pastWeek" className="">
                  Show Past Week LeaderBoard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
