import React, { ChangeEvent, FormEvent, useState } from "react";
import Card from "../components/Card";

interface OrderSearchQuery {
  orderType: string | null;
  ordered: Date | null;
  arrival: Date | null;
  product: string | null;
  quantity: number | null;
  price: number | null;
}

interface Order {
  _id: string;
  orderType: string;
  ordered: Date;
  arrival: Date;
  product: string;
  quantity: number;
  price: number;
}

const OrderSearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<OrderSearchQuery>({
    orderType: null,
    ordered: null,
    arrival: null,
    product: null,
    quantity: null,
    price: null,
  });

  const [orderList, setOrderList] = useState<Order[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchQuery((prevSearchQuery) => ({
      ...prevSearchQuery,
      [name]:
        name === "ordered" || name === "arrival"
          ? value
            ? new Date(value)
            : null
          : value,
    }));
  };

  const onSubmit = async () => {
    try {
      const queryString = new URLSearchParams({
        orderType: searchQuery.orderType || "",
        ordered: searchQuery.ordered ? searchQuery.ordered.toISOString() : "",
        arrival: searchQuery.arrival ? searchQuery.arrival.toISOString() : "",
        product: searchQuery.product || "",
        quantity: searchQuery.quantity ? String(searchQuery.quantity) : "",
        price: searchQuery.price ? String(searchQuery.price) : "",
      }).toString();

      const response = await fetch(
        `http://localhost:3000/orders/findOrderByQuery?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const orders = await response.json();
      setOrderList(orders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/orders/delOrder/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
    onSubmit();
  };

  return (
    <>
      <div style={styles.navBar}>
        <input
          type="text"
          name="orderType"
          placeholder="Order Type"
          value={searchQuery.orderType || ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="ordered"
          value={
            searchQuery.ordered
              ? searchQuery.ordered.toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
        />
        <input
          type="date"
          name="arrival"
          value={
            searchQuery.arrival
              ? searchQuery.arrival.toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
        />
        <input
          type="text"
          name="product"
          placeholder="Product"
          value={searchQuery.product || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={searchQuery.quantity || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={searchQuery.price || ""}
          onChange={handleChange}
        />
        <button type="button" onClick={onSubmit}>
          Search
        </button>
      </div>
      <div>
        {orderList.map((order) => (
          <Card
            key={order._id}
            order={order}
            handleDelete={handleDelete}
          ></Card>
        ))}
      </div>
    </>
  );
};

const styles = {
  navBar: {
    display: "flex" as 'flex',
    flexDirection: "row" as 'row',
    alignItems: "center" as 'center',
  },
};

export default OrderSearchInput;
