"use client";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
const CurrentWeekData = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/getCurrentWeekData");
        const result = await response.json();
        setItems(result.result);
      };
      fetchData();
    }, []);

    const itemsPerPage = 25;

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      
      setItemOffset(newOffset);
    };
  return (
    <div className="w-full mt-5 px-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
          <thead className="text-xs text-white uppercase bg-gray-400 dark:text-white text-center">
            <tr scope="col" className="px-6 py-3">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <td scope="col" className="px-6 py-3">
                UID
              </td>
              <th scope="col" className="px-6 py-3">
                Score
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                TimeStamp
              </th>
              <th scope="col" className="px-6 py-3">
                Rank
              </th>
            </tr>
          </thead>

          <tbody className="text-center">
            {currentItems.map((item) => (
              <tr
                key={item.UID}
                className="bg-gray-300 border-b border-blue-400"
              >
                <td className="px-6 py-4">{item.Name}</td>
                <td className="px-6 py-4">{item.UID}</td>
                <td className="px-6 py-4">{item.Score}</td>
                <td className="px-6 py-4">{item.Country}</td>
                <td className="px-6 py-4">{item.TimeStamp}</td>
                <td className="px-6 py-4">{item.UserRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>showing 25 (max) results per page*</p>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex flex-row justify-center my-10"
        pageClassName="mx-2"
        activeClassName="bg-blue-400 text-white"
        activeLinkClassName="bg-blue-400 text-white px-3 py-2 rounded-md"
        disabledClassName="text-gray-400"
        nextClassName="mx-2"
        previousClassName="mx-2"
      />
    </div>
  );
};

export default CurrentWeekData;
