import { useState } from "react";
import Search from "./pages/Search";
import Main from "./pages/Main";
import "tailwindcss/tailwind.css";

function App() {
  const [page, setPage] = useState("Main");
  const onFileUpload = () => {};

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div id="header" className="bg-gray-200 p-4 flex justify-end space-x-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300"
          onClick={() => setPage("Main")}
        >
          Main
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300"
          onClick={() => setPage("Search")}
        >
          Search
        </button>
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={onFileUpload}
          />
          Upload
        </label>
      </div>
      <div className="flex-1 overflow-hidden">
        {page === "Main" && <Main />}
        {page === "Search" && <Search />}
      </div>
    </div>
  );
}

export default App;
