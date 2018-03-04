import React from "react";

import Statistic from "./Statistic";

let Statistics = props => {
  return (
    <div className="statistics">
      <table>
        <tbody>
          {props.data.map((statistic, index) => (
            <Statistic
              key={index}
              title={statistic.title}
              value={statistic.value}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
