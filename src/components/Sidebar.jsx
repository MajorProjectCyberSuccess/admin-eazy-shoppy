import PropTypes from "prop-types";

function Sidebar({ setSelectedTab }) {
  return (
    <div className="w-64 bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-4">Eazy Shoppy Admin</h2>
      <button
        className="block w-full text-left p-2 hover:bg-gray-600"
        onClick={() => setSelectedTab("add")}
      >
        Add Product
      </button>
      <button
        className="block w-full text-left p-2 hover:bg-gray-600"
        onClick={() => setSelectedTab("view")}
      >
        View Products
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  setSelectedTab: PropTypes.func,
};

export default Sidebar;
