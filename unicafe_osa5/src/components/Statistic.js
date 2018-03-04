import React from "react";

let Statistic = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
};
export default Statistic;