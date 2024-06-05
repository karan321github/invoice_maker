import React from "react";
import axios from "axios";
import { selectUser } from "../store/reducers/authReducers";
import { useSelector } from "react-redux";

const Summary = ({ products, total, prevStep }) => {
  const user = useSelector(selectUser);
  console.log("user", user?.name);
  console.log("userEmail", user?.email);

  const handleGeneratePdf = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/products",
        {
          products,
          userDetails: { name: user.name, email: user.email , address: user.address },
        },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="mb-4">
        {products.map((product, index) => (
          <div key={index} className="mb-2">
            <ul className="flex justify-between text-stone-400 font-semibold">
              {product.name} - {product.quantity} X {product.rate} ={" "}
              {product.quantity * product.rate}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-stone-400 font-semibold">Total - {total}</p>
      <button
        onClick={prevStep}
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-2"
      >
        Back
      </button>
      <button
        onClick={handleGeneratePdf}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Generate PDF Invoice
      </button>
    </div>
  );
};

export default Summary;
