import { useState, useEffect } from "react";
import axios from "axios";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({}); // Store image URLs for each product
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/getAllProducts")
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          console.log("Products:", res.data.data);
          setProducts(res.data.data);
        } else {
          setError("Expected an array of products but got something else.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Function to fetch an image as a Blob and create an Object URL
  const fetchImage = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/product/images/${productId}`
      );
      if (!res.ok) {
        throw new Error("Image not found");
      }
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImages((prev) => ({
        ...prev,
        [productId]: imageObjectURL,
      }));
    } catch (error) {
      console.error("Error fetching image:", error);
      setImages((prev) => ({
        ...prev,
        [productId]: null,
      }));
    }
  };

  // Fetch images for each product
  useEffect(() => {
    products.forEach((product) => {
      fetchImage(product.productId);
    });
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="border border-gray-300 p-3">Name</th>
            <th className="border border-gray-300 p-3">Price</th>
            <th className="border border-gray-300 p-3">Old Price</th>
            <th className="border border-gray-300 p-3">Discount</th>
            <th className="border border-gray-300 p-3">Rating</th>
            <th className="border border-gray-300 p-3">Category</th>
            <th className="border border-gray-300 p-3">Description</th>
            <th className="border border-gray-300 p-3">Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.productId}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
            >
              <td className="border border-gray-300 p-3">{product.name}</td>
              <td className="border border-gray-300 p-3">
                ${product.discountedPrice}
              </td>
              <td className="border border-gray-300 p-3">
                ${product.originalPrice}
              </td>
              <td className="border border-gray-300 p-3">
                {product.discount}%
              </td>
              <td className="border border-gray-300 p-3">
                {product.ratings}⭐
              </td>
              <td className="border border-gray-300 p-3">
                {product.categoryName}
              </td>
              <td className="border border-gray-300 p-3">
                {product.productDescription}
              </td>
              <td className="border border-gray-300 p-3 flex justify-center items-center">
                {images[product.productId] ? (
                  <img
                    src={images[product.productId]}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                  />
                ) : (
                  <span>No Image Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProducts;
