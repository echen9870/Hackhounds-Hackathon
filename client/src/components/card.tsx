import React, { useState } from "react";

// Define the Order interface
interface Order {
  _id: string;
  orderType: string;
  ordered: Date;
  arrival: Date;
  product: string;
  quantity: number;
  price: number;
}

interface Props {
  order: Order;
  handleDelete: (id: string) => void;
  handleUpdate: (order: Order) => void;
}
const Card: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState({ ...props.order });

  const formatDate = (date: Date): string => {
    date = new Date(date);
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year}`;
  };

  const onDelete = () => {
    props.handleDelete(order._id);
  };

  const onUpdate = () => {
    props.handleUpdate(order);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-100 flex flex-col">
      <p className="mb-1">ID: {order._id}</p>
      {isEditing ? (
        <>
          <input
            type="text"
            name="orderType"
            value={order.orderType}
            className="mb-1"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="ordered"
            value={order.ordered.toString()}
            className="mb-1"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="arrival"
            value={order.arrival.toString()}
            className="mb-1"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="product"
            value={order.product}
            className="mb-1"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="quantity"
            value={order.quantity}
            className="mb-1"
            onChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <p className="mb-1">Ordered: {formatDate(order.ordered)}</p>
          <p className="mb-1">Arrival: {formatDate(order.arrival)}</p>
          <p className="mb-1">Product: {order.product}</p>
          <p className="mb-1">Quantity: {order.quantity}</p>
        </>
      )}

      <div className="flex">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 ${
            isEditing ? "hidden" : ""
          }`}
          onClick={() => setIsEditing(true)}
        >
          Update
        </button>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 ${
            isEditing ? "" : "hidden"
          }`}
          onClick={onUpdate}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
