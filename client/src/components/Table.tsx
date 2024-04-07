import React from "react";

interface Props {
  data: any[];
}

const Table: React.FC<Props> = (props) => {

  return (
    <div className="px-4 py-2 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Product Name</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Profit</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(
            ({ _id, totalProfit, totalQuantity }: any, index: number) => (
              <tr
                key={`${_id.orderType}-${_id.Product}`}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="py-2 px-4">{_id.Product}</td>
                <td className="py-2 px-4">{totalQuantity}</td>
                <td className="py-2 px-4">${totalProfit}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

