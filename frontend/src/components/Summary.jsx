import React from "react";

const Summary = ({ products, total, prevStep }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="mb-4">
        {products.map((product, index) => (
          <div key={index} className="mb-2">
            <p>
              {product.name}: {product.quantity} * {product.rate} ={" "}
              {product.quantity * product.rate}
            </p>
          </div>
        ))}
      </div>
      <p>Total: {total}</p>
      <button
        onClick={prevStep}
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-2"
      >
        Back
      </button>
      <button
        onClick={() => {} /* Function to generate PDF invoice */}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Generate PDF Invoice
      </button>
    </div>
  );
};

export default Summary;
