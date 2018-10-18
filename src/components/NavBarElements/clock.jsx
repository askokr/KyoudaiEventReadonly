import React from "react";

const Clock = ({ time }) => {
  const y = time.getFullYear();
  const M = time.getMonth();
  const d = time.getDate();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  const months = [
    "jaanuar",
    "veebruar",
    "märts",
    "aprill",
    "mai",
    "juuni",
    "juuli",
    "august",
    "september",
    "oktoober",
    "november",
    "detember"
  ];
  return (
    <h2 className="text-white">
      {d + ". "}
      {months[M] + " "}
      {y + " "}
      {h % 24}:{m < 10 ? "0" + m : m}:{s < 10 ? "0" + s : s}
    </h2>
  );
};

export default Clock;
