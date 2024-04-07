import React, { useEffect, useState } from "react";
import { Order } from "../components/Order";
import Form from "../components/Form";
import Card from "../components/Card";

interface FormInput {
  orderType: string;
  ordered: Date;
  arrival: Date;
  product: string;
  quantity: number;
  price: number;
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

export const Main = () => {
  const [showForm, setShowForm] = useState(false);
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  {
    /* useEffect hook to automatically update orders */
  }
  useEffect(() => {
    getOrders();
  }, [currentDate]);

  {
    /*This function is called when we first load in, when date changes, and when a form is submitted*/
  }
  const getOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/orders/findOrderAfterDate/${currentDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setOrderList(data);
    } catch (error) {
      console.error(error);
    }
  };

  {
    /*Delete functions that allow individual orders to be deleted */
  }
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
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
    getOrders();
  };

  {
    /* This function is passed to the Form component, and whenever an order is submitted this function is called */
  }
  const handleOnSubmit = async (formData: FormInput) => {
    try {
      const response = await fetch("http://localhost:3000/orders/postOrder", {
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
    setShowForm(false);
    getOrders();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(e.target.value);
  };

  return (
    <div style={styles.bigDiv}>
      <div style={styles.inDiv}>
        {orderList &&
          orderList
            .filter((order) => order.orderType === "in")
            .map((order) => (
              <Card key={order._id} order={order} handleDelete={handleDelete} />
            ))}
      </div>
      <div style={styles.outDiv}>
        {orderList
          .filter((order) => order.orderType === "out")
          .map((order) => (
            <Card
              key={order._id}
              order={order}
              handleDelete={handleDelete}
            ></Card>
          ))}
      </div>
      <div style={styles.order}>
        <div>
          <button
            onClick={() => {
              setShowForm(true);
            }}
          >
            Open Form
          </button>
          {showForm && (
            <div style={styles.popup}>
              <div style={styles.popupContent}>
                <button
                  onClick={() => {
                    setShowForm(false);
                  }}
                >
                  Close
                </button>
                <Form onSubmit={handleOnSubmit}></Form>
              </div>
            </div>
          )}
        </div>
        <input
          type="date"
          id="date"
          name="date"
          value={currentDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default Main;

interface Styles {
  bigDiv: React.CSSProperties;
  inDiv: React.CSSProperties;
  outDiv: React.CSSProperties;
  order: React.CSSProperties;
  popup: React.CSSProperties;
  popupContent: React.CSSProperties;
}

const styles: Styles = {
  bigDiv: {
    display: "flex",
    flexDirection: "row",
    height: "100vh", // Full height of the viewport
  },
  inDiv: {
    flex: "1 0 20%", // Grow, but don't shrink, and start at 25% width
    background: "lightblue", // Example background color
  },
  outDiv: {
    flex: "1 0 20%", // Grow, but don't shrink, and start at 25% width
    background: "lightgreen", // Example background color
  },
  order: {
    flex: "2 0 60%", // Grow, but don't shrink, and start at 50% width
    background: "lightcoral", // Example background color
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
};