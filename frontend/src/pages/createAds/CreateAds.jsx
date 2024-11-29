import React, { useState } from "react";
import Category from "./category";
import Ads from "./Ads";
import { setCategoryId } from "reduxs/slices/ads.slice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
export default function CreateAds() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [initialCategoryList, setInitialCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isChild, setIsChild] = useState(false);
  const { categoryId } = useSelector((state) => state.ads);
  const sendObj = {
    step,
    setStep,
    categoryId,
    setCategoryId,
    error,
    setError,
    initialCategoryList,
    setInitialCategoryList,
    isChild,
    setIsChild,
    categoryList,
    setCategoryList,
  };
  if (error) {
    console.log(error);
    toast.error(`خطا: ${error}`);
  }
  return (
    <div className="w-full grid grid-cols-12  justify-center p-4">
      <div className="hidden md:col-span-3 md:grid"></div>
      <div className="col-span-12 md:col-span-6">
        {step == 1 ? (
          <Category props={sendObj} />
        ) : step == 2 ? (
          <Ads props={sendObj} />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="hidden md:col-span-3 md:grid"></div>
    </div>
  );
}
