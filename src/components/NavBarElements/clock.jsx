import React from "react";
import Months from "../functions/months";

const Clock = ({ time }) => {
  const y = time.getFullYear();
  const M = time.getMonth();
  const d = time.getDate();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  return (
    <h2 className="text-white">
      {d + ". "}
      {Months[M] + " "}
      {y + " "}
      {h % 24}:{m < 10 ? "0" + m : m}:{s < 10 ? "0" + s : s}
    </h2>
  );
};

export default Clock;
