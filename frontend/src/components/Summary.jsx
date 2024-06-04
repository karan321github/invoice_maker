import axios from "axios";
import { selectUser } from "../store/reducers/authReducers";
import { useSelector } from "react-redux";

const Summary = ({ products, total, prevStep }) => {
  const user = useSelector(selectUser);
  console.log('user' , user?.name)
  console.log('userEmail' , user?.email)
  const handleGeneratePdf = async () => {
    try {
      // Make API call to generate PDF
      const response = await axios.post(
        "http://localhost:5000/api/user/generate-pdf",
        {
          products,
          userDetails: { name: user.name, email: user.email }, // Replace with actual user details
        }
      );

      // Download PDF
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      link.click();
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
        onClick={handleGeneratePdf}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Generate PDF Invoice
      </button>
    </div>
  );
};

export default Summary;
