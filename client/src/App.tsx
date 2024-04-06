import { useEffect, useState } from "react";
import "./App.css";
import { Main } from "./components/Main";
import {History}  from "./components/History";
function App() {
  const [page, setPage] = useState("History");



  return (
    <>
      <div id="header" style={styles.navBar}>
        <button className="button" onClick={ () => {setPage("Main")}}>
          Main
        </button>
        <button className="button" onClick={() => {setPage("History")}}>
          History
        </button>
        <button id="plus" className="button">
          +
        </button>
      </div>
      {page === "Main" && <Main></Main>}
      {page === "History" && <History></History>}
      

    </>
  );
}

export default App;

const styles = {
  navBar: {
    textAlign: "right" as const,
  },
};
