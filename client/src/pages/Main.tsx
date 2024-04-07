import React, { useEffect, useState } from "react";
import { Order } from "../components/Order";
import Form from "../components/Form";
import Card from "../components/Card";
import Table from "../components/Table";

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
  const [aggregatedData, setAggregatedData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  {
    /* useEffect hook to automatically update orders */
  }
  useEffect(() => {
    getOrders();
    getStats();
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

  const getStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/orders/findStatsDate/${currentDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setAggregatedData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (order:Order) => {
    try {
      const response = await fetch(
        `http://localhost:3000/orders/putOrder/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );
      const data = await response.json();
      console.log(data);
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
    getStats();
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
    getStats();
    getOrders();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(e.target.value);
  };

  return (
    <div className="flex flex-row h-screen ">
      <div className="w-1/4 h-full p-4 pb-16 border-r border-gray-300 flex flex-col justify-center items-center rounded-lg">
        <h1 className="text-xl font-bold mb-4">Incoming Stock</h1>
        <div
          className="overflow-hidden h-full pb-16 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.scrollbarColor = "auto auto")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.scrollbarColor = "transparent transparent")
          }
        >
          {orderList &&
            orderList
              .filter((order) => order.orderType === "in")
              .map((order, index) => (
                <div key={order._id} className={`${index !== 0 ? "mt-2" : ""}`}>
                  <Card handleUpdate = {handleUpdate} order={order} handleDelete={handleDelete} />
                </div>
              ))}
        </div>
      </div>
      <div className="w-1/4 h-full p-4 pb-16 border-r border-gray-300 flex flex-col justify-center items-center rounded-lg">
        <h1 className="text-xl font-bold mb-4">Outgoing Stock</h1>
        <div
          className="overflow-hidden h-full pb-16 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.scrollbarColor = "auto auto")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.scrollbarColor = "transparent transparent")
          }
        >
          {orderList
            .filter((order) => order.orderType === "out")
            .map((order, index) => (
              <div key={order._id} className={`${index !== 0 ? "mt-2" : ""}`}>
                <Card order={order} handleUpdate = {handleUpdate} handleDelete={handleDelete} />
              </div>
            ))}
        </div>
      </div>
      <div className="flex-grow flex-shrink-0 w-60 mx-4 my-2 p-4 ">
        <div>
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="inline-block px-4 py-2 my-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Open Form
          </button>

          {showForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center border-r border-gray-300 rounded-lg">
              <div className="bg-white p-20 rounded-5 shadow-md">
                <button
                  className="inline-block px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
          className="appearance-none block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />

        <Table data={aggregatedData} />
      </div>
    </div>
  );
};

export default Main;
