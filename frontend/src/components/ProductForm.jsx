import { useState } from "react";

const ProductForm = ({ nextStep, addProduct }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, quantity, rate });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Product Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Product Qty:
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
          min={1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Product Rate:
        </label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
          min={1}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
