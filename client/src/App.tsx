import "./App.css";

import Test from "./components/Test";

function App() {


  return (
    <>
      <div id="header" style={styles.navBar}>
        <ul>
        <button className="button" onClick={ () => {setPage("Main")}}>
          Main
        </button>
        <button className="button" onClick={() => {setPage("History")}}>
          History
        </button>
        <button id="plus" className="button">
          +
        </button>
        </ul>
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
