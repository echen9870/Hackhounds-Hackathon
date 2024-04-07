import React from "react";

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

interface Props{
  order: Order,
  handleDelete: (id:string) => void;
}
const Card: React.FC<Props> = ( props) => {

  const onDelete = () => {
    props.handleDelete(order._id);
  }
  
  const order = props.order
  // Parse ordered and arrival properties into Date objects
  const orderedDate = new Date(order.ordered);
  const arrivalDate = new Date(order.arrival);
  // Function to format date as MM-DD-YYYY
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
  };

  return (
    <div style={styles.card}>
      {/* Use formatDate function for MM-DD-YYYY date format */}
      <p>Ordered: {formatDate(orderedDate)}</p>
      <p>Arrival: {formatDate(arrivalDate)}</p>
      <p>Product: {order.product}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Price: ${order.price.toFixed(2)}</p>
      <button onClick = {onDelete}>Delete</button>
    </div>
  );
};


// CSS styles for the card component
const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
  },
};

export default Card;
