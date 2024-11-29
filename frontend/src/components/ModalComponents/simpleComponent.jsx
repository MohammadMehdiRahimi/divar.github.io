import React from "react";

export default function SimpleComponent({ text, icon }) {
  return (
    <div className="flex items-center gap-3 dark:text-white cursor-pointer">
      <img className="w-5" src={icon} alt="" />
      <p>{text}</p>
    </div>
  );
}
