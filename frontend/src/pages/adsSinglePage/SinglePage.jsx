import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ImageSlider from "components/Slider";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

import { timeDif } from "utils/functions.js";
import { numberSeprator } from "utils/functions";
import Loader from "components/Loader";
import api from "config/axios.config";
import Swal from "sweetalert2";
import { numberEngToPersian } from "utils/functions";
import {
  setUserBookmarks,
  deleteUserBookmarks,
} from "reduxs/slices/user.slice";
import toast from "react-hot-toast";

export default function SinglePage() {
  /* -------------------------------- variables ------------------------------- */
  const location = useLocation();
  const [adsDetails, setAdsDetails] = useState({});
  const [options, setOptions] = useState({});
  const { userIn } = useSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const [envVariables, setEnvVariables] = useState({
    loader: true,
    userMobile: null,
    isBookmarked: false,
  });
  const { userId } = useSelector((state) => state.user);
  const { userBookmarks } = useSelector((state) => state.user);
  const adsId = queryParams.get("ads-id");
  const dispatch = useDispatch();
  /* -------------------------------- functions -------------------------------- */
  const getAdsDetails = async () => {
    try {
      const { data } = await api.get(`ads/get-ads?_id=${adsId}`);

      if (data.success) {
        data.data.body[0].options = data.data.body[0].options
          .map((option) => JSON.parse(option))
          .map((option) =>
            setOptions((prev) => ({
              ...prev,
              [Object.keys(option)]: Object.values(option).toString(),
            }))
          );

        setEnvVariables((prev) => ({ ...prev, loader: false }));
        setAdsDetails(data.data.body[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserMobile = async () => {
    try {
      const { data } = await api.post(
        "user/mobile",
        { id: adsDetails.author },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      if (data.success) {
        setEnvVariables((prev) => ({
          ...prev,
          userMobile: data.data.body.mobile,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const persianOptions = (option) => {
    const index = ["metrage", "number_of_rooms"].indexOf(option);
    if (index >= 0) return ["متراژ", "تعداد اتاق ها"][index];
    return;
  };

  const callHandler = () => {
    Swal.fire({
      text: `شماره تماس آگهی :       ${numberEngToPersian(
        envVariables.userMobile
      )}`,
      background: "#242424",
      color: "white",
      confirmButtonColor: "green",
      confirmButtonText: "تایید",
    });
  };

  const addBookmarksHandler = async () => {
    if (!userIn) {
      Swal.fire({
        text: "برای ذخیره آگهی لطفا وارد شوید",
        background: "#242424",
        color: "white",
        confirmButtonColor: "orange",
        confirmButtonText: "متوجه شدم",
      });
      return;
    }
    const index = userBookmarks.indexOf(adsId);
    if (index == -1) {
      try {
        const Authorization =
          Cookies.get("Authorization") ?? localStorage.getItem("Authorization");
        const { data } = await api.post(
          "/user/add-bookmarks",
          { userId, adsId },
          { headers: { Authorization } }
        );
        if (data.success) {
          dispatch(setUserBookmarks({ adsId }));
          setEnvVariables((prev) => ({ ...prev, isBookmarked: true }));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  const removeBookmarksHandler = async () => {
    if (!userIn) {
      Swal.fire({
        text: "برای ذخیره آگهی لطفا وارد شوید",
        background: "#242424",
        color: "white",
        confirmButtonColor: "orange",
        confirmButtonText: "متوجه شدم",
      });
      return;
    }

    const index = userBookmarks.indexOf(adsId);
    if (index != -1) {
      try {
        const Authorization =
          Cookies.get("Authorization") ?? localStorage.getItem("Authorization");
        const { data } = await api.post(
          "/user/delete-bookmarks",
          { userId, adsId },
          { headers: { Authorization } }
        );
        if (data.success) {
          dispatch(deleteUserBookmarks({ adsId }));
          setEnvVariables((prev) => ({ ...prev, isBookmarked: false }));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  /* ------------------------------- useEffects ------------------------------- */
  // get Details
  useEffect(() => {
    getAdsDetails();
  }, []);

  useEffect(() => {
    if (!envVariables.loader) {
      getUserMobile();
    }
  }, [adsDetails]);
  useEffect(() => {
    if (userBookmarks.includes(adsId)) {
      setEnvVariables((prev) => ({ ...prev, isBookmarked: true }));
    }
  }, [userBookmarks]);

  if (envVariables.loader) {
    return (
      <div className="w-full">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className=" w-3/4 mx-auto flex flex-col gap-2 ">
        <div className="">asdf</div>
        <div className="grid grid-cols-10 w-full h-full *:p-5 ">
          {/* -------------------------------- rightSide ------------------------------- */}
          <div className=" col-span-4 flex flex-col gap-4 ">
            <h2 className="text-3xl font-bold text-slate-200">
              {adsDetails.title}
            </h2>
            <div className="flex gap-1 text-gray-400 font-bold text-sm border-b pb-3 border-b-slate-700">
              <p>{timeDif(adsDetails.updatedAt)}</p>
              <p>در</p>
              <p>{adsDetails.city}</p>
            </div>
            <div className="flex w-full justify-between gap-3 ">
              <div className="flex gap-2 w-3/4">
                <button
                  className="bg-red-500 rounded-sm p-3 w-full "
                  onClick={callHandler}
                >
                  اطلاعات تماس
                </button>
                <button className="bg-transparent rounded-sm border text-slate-400 border-slate-400 p w-full ">
                  چت
                </button>
              </div>
              <div className="flex w-1/4  justify-end items-center gap-4 text-slate-300 *:cursor-pointer ">
                {envVariables.isBookmarked ? (
                  <BookmarkIcon onClick={removeBookmarksHandler} />
                ) : (
                  <BookmarkBorderIcon onClick={addBookmarksHandler} />
                )}
                <ShareIcon />
              </div>
            </div>
            <div className="flex border-b py-2 border-b-gray-600 ">
              {Object.keys(options).map((optionKey, idx) => {
                if (persianOptions(optionKey)) {
                  return (
                    <div
                      key={idx}
                      className="flex w-full  flex-col justify-center items-center gap-2 "
                    >
                      <p className="text-gray-400 font-bold">
                        {persianOptions(optionKey)}
                      </p>
                      <p className="text-white">{options[optionKey]}</p>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex justify-between items-center py-3 border-b border-b-gray-600">
              <p className="text-gray-400 ">قیمت</p>
              <p className="text-gray-100 flex gap-2">
                <span>{numberSeprator(options.price)}</span>
                <span>تومان</span>
              </p>
            </div>
            <div className="">
              <h4 className="text-gray-200 text-2xl my-4"> توضیحات</h4>
              <p className="text-gray-100 text-justify leading-8">
                {adsDetails.description}
              </p>
            </div>
          </div>
          {/* -------------------------------- leftSide -------------------------------- */}
          <div className="col-span-6  ">
            <ImageSlider images={adsDetails.images} />
          </div>
        </div>
      </div>
    );
  }
}
