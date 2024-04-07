import { useState } from "react";
import History from "./pages/History";
import Main from "./pages/Main";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Arrange children vertically
    height: "100vh",
    width: "100vw", // Full height of the viewport
  },
  navBar: {
    textAlign: 'right' as const,
  },
  mainScreen: {
    flex: 1, // Take remaining space
  },
};

function App() {
  const [page, setPage] = useState("Main");

  return (
    <div style={styles.container}>
      <div id="header" style={styles.navBar}>
        <button className="button" onClick={ () => setPage("Main")}>
          Main
        </button>
        <button className="button" onClick={() => setPage("History")}>
          History
        </button>
        <button id="plus" className="button">
          +
        </button>
      </div>
      <div style = {styles.mainScreen}>
      {page === "Main" && <Main />}
      {page === "History" && <History />}
      </div>
      
      </div>
  );
}

export default App;
