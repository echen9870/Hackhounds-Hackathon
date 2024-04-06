import React, { useState } from "react";

export const Test = () => {
    const formData = {
        orderType: "in",
        ordered: "2024-04-08T12:00:00.000Z",
        arrival: "2024-04-08T12:00:00.000Z",
        product: "123456",
        price: 22.00,
        quantity: 10,
      };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/orders/putOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleSubmit}>Test</button>;
};

export default Test;
