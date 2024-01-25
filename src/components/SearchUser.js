"use client"
import React,{useState} from 'react'

const SearchUser = () => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    function handleClick() {
        const res = fetch(
          "https://leader-board-pro.vercel.app/api/getUserRank",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const { rows } = data.result;
            if (rows.length === 0) {
              alert("No user found with this ID");
              return;
            }
            setUserData(rows[0]);
          });
    
        setShowDelete(true);

    }
  return (
    <div className="w-full">
      <div className="flex items-center justify-end ">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search User"
            aria-label="Search User"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          {showDelete ? (
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={() => {
                setUserData(null);
                setUserId("");
                setShowDelete(false);
              }}
            >
              Delete
            </button>
          ) : (
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleClick}
            >
              Search
            </button>
          )}
        </div>
      </div>
      {userData && (
        <div className="absolute z-10 right-20 ">
          <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 bg-white">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{userData.name}</div>
              <p className="text-gray-700 text-base">Score: {userData.score}</p>
              <p className="text-gray-700 text-base">
                Country: {userData.country}
              </p>
              <p className="text-gray-700 text-base">
                Rank: {userData.userrank}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchUser