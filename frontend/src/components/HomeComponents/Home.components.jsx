import React from "react";

export default function HomeComponents({ item }) {
  return (
    <div className="flex border border-slate-700 p-2 h-44 items-start rounded-md gap-4">
      <div className="w-1/2 flex flex-col gap-2 ">
        <h3 className="text-white text-md leading-9">{item.title}</h3>
        {item.prices && <p className="text-[#787878]">{item.prices}</p>}
        <div className="flex gap-1">
          {item.isUp ? (
            <p className="text-red-700">نردبان شده</p>
          ) : (
            <p>{item?.time}</p>
          )}

          {item.location && (
            <p className="text-[#787878]">در {item.location} </p>
          )}
        </div>
      </div>
      <div className="w-44 self-center ">
        <img
          src={item.img}
          className="rounded-md w-full h-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
}
