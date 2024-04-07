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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="orderType">Order Type:</label>
        <select
          id="orderType"
          name="orderType"
          value={formData.orderType}
          onChange={handleChange}
          required
        >
          <option value="">Select Order Type</option>
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>
      </div>
      <div>
        <label htmlFor="ordered">Ordered:</label>
        <input
          type="date"
          id="ordered"
          name="ordered"
          value={formData.ordered.toString()}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="arrival">Arrival:</label>
        <input
          type="date"
          id="arrival"
          name="arrival"
          value={formData.arrival.toString()}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="product">Product:</label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
