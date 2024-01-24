"use client";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
const PastWeekData = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]); 
  const [country, setCountry] = useState("all");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://leader-board-pro.vercel.app/api/getPastWeekData"
      );
      const result = await response.json();
      const { rows } = result.result;
      setData(rows);
      setItems(rows);
    };
    fetchData();
  }, []);
  useEffect(() => {
    filterByCountry(country);
    }, [country]);

  function filterByCountry(country){
    if(country === "all"){
      setItems( data);
    }
    else{
      setItems(data.filter((item) => item.country === country));
    }
  }
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
      <div className="flex items-center justify-end ">
        <div className="flex items-center border-b border-teal-500 mb-3">
          Show Users from Country :
          <select
            className=" w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ND">North Dakota (ND)</option>
            <option value="VT">Vermont (VT)</option>
            <option value="ME">Maine (ME)</option>
            <option value="MN">Minnesota (MN)</option>
            <option value="NM">New Mexico (NM)</option>
            <option value="RI">Rhode Island (RI)</option>
            <option value="ID">Idaho (ID)</option>
            <option value="GA">Georgia (GA)</option>
            <option value="WI">Wisconsin (WI)</option>
            <option value="MO">Missouri (MO)</option>
            <option value="CT">Connecticut (CT)</option>
            <option value="LA">Louisiana (LA)</option>
            <option value="WY">Wyoming (WY)</option>
            <option value="SD">South Dakota (SD)</option>
            <option value="KY">Kentucky (KY)</option>
            <option value="AK">Alaska (AK)</option>
            <option value="HI">Hawaii (HI)</option>
            <option value="FL">Florida (FL)</option>
            <option value="NJ">New Jersey (NJ)</option>
            <option value="WA">Washington (WA)</option>
            <option value="OR">Oregon (OR)</option>
            <option value="DE">Delaware (DE)</option>
            <option value="MI">Michigan (MI)</option>
            <option value="DC">District of Columbia (DC)</option>
            <option value="VA">Virginia (VA)</option>
            <option value="TX">Texas (TX)</option>
            <option value="MS">Mississippi (MS)</option>
            <option value="OH">Ohio (OH)</option>
            <option value="IA">Iowa (IA)</option>
            <option value="NH">New Hampshire (NH)</option>
            <option value="UT">Utah (UT)</option>
            <option value="MT">Montana (MT)</option>
            <option value="KS">Kansas (KS)</option>
            <option value="AR">Arkansas (AR)</option>
            <option value="PA">Pennsylvania (PA)</option>
            <option value="OK">Oklahoma (OK)</option>
            <option value="TN">Tennessee (TN)</option>
            <option value="WV">West Virginia (WV)</option>
            <option value="IN">Indiana (IN)</option>
            <option value="MD">Maryland (MD)</option>
            <option value="AL">Alabama (AL)</option>
            <option value="AZ">Arizona (AZ)</option>
            <option value="NC">North Carolina (NC)</option>
            <option value="NE">Nebraska (NE)</option>
            <option value="NY">New York (NY)</option>
            <option value="IL">Illinois (IL)</option>
            <option value="NV">Nevada (NV)</option>
            <option value="SC">South Carolina (SC)</option>
            <option value="CO">Colorado (CO)</option>
            <option value="MA">Massachusetts (MA)</option>
            <option value="CA">California (CA)</option>
          </select>
        </div>
      </div>

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
            {
                currentItems.length === 0 ? <tr><td colSpan="6" className="px-6 py-4">No Data Found</td></tr> :
                
                currentItems.map((item) => (
              <tr
                key={item.uid}
                className="bg-gray-300 border-b border-blue-400"
              >
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.uid}</td>
                <td className="px-6 py-4">{item.score}</td>
                <td className="px-6 py-4">{item.country}</td>
                <td className="px-6 py-4">{item.timestamp}</td>
                <td className="px-6 py-4">{item.userrank}</td>
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

export default PastWeekData;
