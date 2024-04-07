import React, { ChangeEvent, FormEvent, useState } from "react";
interface FormInput {
  orderType: string;
  ordered: Date;
  arrival: Date;
  product: string;
  quantity: number;
  price: number;
}

interface Props {
  onSubmit: (formData: FormInput) => void;
}

const Form: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState<FormInput>({
    orderType: "",
    ordered: new Date(),
    arrival: new Date(),
    product: "",
    quantity: 0,
    price: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="orderType" className="block font-semibold">
          Order Type:
        </label>
        <select
          id="orderType"
          name="orderType"
          value={formData.orderType}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Order Type</option>
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="ordered" className="block font-semibold">
          Ordered:
        </label>
        <input
          type="date"
          id="ordered"
          name="ordered"
          value={formData.ordered.toString()}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="arrival" className="block font-semibold">
          Arrival:
        </label>
        <input
          type="date"
          id="arrival"
          name="arrival"
          value={formData.arrival.toString()}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="product" className="block font-semibold">
          Product:
        </label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block font-semibold">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block font-semibold">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
