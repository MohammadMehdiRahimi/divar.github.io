import React from "react";
import { timeDif } from "utils/functions.js";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { useNavigate } from "react-router-dom";

export default function HomeComponents({ item }) {
  const navigate = useNavigate();
  // get ads time and format this

  return (
    <div
      className="flex border border-slate-700 p-2 h-44 items-start rounded-md gap-4"
      onClick={() => navigate(`/ads/single?ads-id=${item._id}`)}
    >
      <div className="w-1/2 flex flex-col justify-between h-full">
        <h3 className="text-white text-md leading-9">{item.title}</h3>
        <div className="flex flex-col self-start gap-2 items-center">
          {item.price ? (
            <p className="text-[#787878] self-start">{item.price}</p>
          ) : (
            <p className="text-[#787878] self-start">توافقی</p>
          )}
          <div className="flex gap-2 items-center">
            {item.isUp ? (
              <p className="text-red-700">نردبان شده</p>
            ) : (
              <p className="text-white text-sm"> {timeDif(item.updatedAt)}</p>
            )}

            {item.city && <p className="text-[#787878]">در {item.city} </p>}
          </div>
        </div>
      </div>
      <div className="w-44 self-center h-full ">
        {item.images.length > 0 ? (
          <img
            src={`http://localhost:3000/uploads/${item.images[0]}`}
            className="rounded-md w-full h-full object-cover"
          />
        ) : (
          <div className="w-full flex justify-center items-center bg-gray-500/30 h-full rounded-md">
            <NoPhotographyIcon style={{ fontSize: "48px", color: "#5C5D5C" }} />
          </div>
        )}
      </div>
    </div>
  );
}
