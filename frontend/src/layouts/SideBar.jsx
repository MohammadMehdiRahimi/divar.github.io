import React, { useEffect } from "react";
import Items from "components/SideBarComponents/Item.component";
import PersonIcon from "@mui/icons-material/Person";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserIn } from "reduxs/slices/user.slice";
import { setIsSmall } from "reduxs/slices/smallSize.slic";

export default function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setUserIn(false));
    Cookies.remove("Authorization");
    localStorage.removeItem("Authorization");
    navigate("/");
  };
  const closeHandle = () => {
    dispatch(setIsSmall(true));
  };
  const clickHandle = () => {
    dispatch(setIsSmall(false));
  };

  const list = [
    { name: "کاربر دیوار", icon: PersonIcon },
    { name: "تایید هویت", icon: GppGoodIcon },
    {
      name: "آگهی های من",
      icon: ReceiptLongIcon,
      function: () => navigate("/my-ads"),
    },
    {
      name: "نشان ها",
      icon: BookmarkIcon,
      function: () => navigate("/bookmarks"),
    },
    { name: "یادداشت", icon: NoteAltIcon },
    {
      name: "بازدید های اخیر",
      icon: AccessTimeIcon,
      function: () => navigate("/recently-viewed"),
    },
    { name: "رزومه من", icon: PersonIcon },
    { name: "خروج", icon: LogoutIcon, function: logout },
  ];

  const { isSmall } = useSelector((state) => state.smallSize);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 500;
      dispatch(setIsSmall(isSmallScreen));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <>
      {isSmall ? (
        <div className="mr-4 cursor-pointer" onClick={clickHandle}>
          <MenuIcon />
        </div>
      ) : (
        <div className="w-fit border-l border-slate-600 cursor-pointer">
          {window.innerWidth < 500 && (
            <div onClick={closeHandle} className="mr-4">
              <CloseIcon />
            </div>
          )}
          {list.map((item, index) => (
            <Items key={index} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
