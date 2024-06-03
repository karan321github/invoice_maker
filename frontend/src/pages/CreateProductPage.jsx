import  { useState } from "react";
import ProductForm from "../components/ProductForm";
import Summary from "../components/Summary";

const CreateProductPage = () => {
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const addProduct = (product) => {
    setProducts([...products, product]);
    const productTotal = product.quantity * product.rate;
    setTotal(total + productTotal);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {step === 1 && (
        <ProductForm nextStep={nextStep} addProduct={addProduct} />
      )}
      {step === 2 && (
        <Summary products={products} total={total} prevStep={prevStep} />
      )}
    </div>
  );
};

export default CreateProductPage;
