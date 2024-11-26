import React from "react";
import { Link } from "react-router-dom";
export default function Items({ item }) {
  const { name, icon } = item;
  const IconComponent = icon;
  return (
    <div
      className="*:flex *:text-white *:gap-2 *:rtl p-4"
      onClick={item.function ? item.function : null}
    >
      {item.link ? (
        <Link to={item.link}>
          {IconComponent && <IconComponent />}
          <p className="text-sm">{name}</p>
        </Link>
      ) : (
        <div>
          {IconComponent && <IconComponent />}
          <p className="text-sm">{name}</p>
        </div>
      )}
    </div>
  );
}
