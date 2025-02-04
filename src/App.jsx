import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AddProduct from "./components/AddProduct";
import ViewProducts from "./components/ViewProducts";

function App() {
  const [selectedTab, setSelectedTab] = useState("add");
  return (
    <>
      <div className="flex h-screen">
        <Sidebar setSelectedTab={setSelectedTab} />
        <div className="flex-1 p-5">
          {selectedTab === "add" ? <AddProduct /> : <ViewProducts />}
        </div>
      </div>
    </>
  );
}

export default App;
