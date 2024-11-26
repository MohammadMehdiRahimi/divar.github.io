import React, { useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import api from "config/axios.config";
import { useDispatch } from "react-redux";

export default function Category({ props }) {
  const {
    setStep,
    setCategoryId,
    setInitialCategoryList,
    initialCategoryList,
    setIsChild,
    isChild,
    setCategoryList,
    categoryList,
  } = props;
  const dispatch = useDispatch();
  async function send(item) {
    if (item?.isTarget == true) {
      setStep(2);
      dispatch(setCategoryId(item._id));
    }
    const { slug } = item;
    try {
      const { data } = await api.get(`ads/category?slug=${slug}`);
      if (data.success) {
        setCategoryList(data.data.body);
        setIsChild(data.data.isChild);
      } else {
        setError(data.data.message);
      }
    } catch (error) {
      setError(error.response.data.data.message);
    }
  }
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await api.get("/ads/category");
        if (data.success) {
          setCategoryList(data.data.body);
          setInitialCategoryList(data.data.body);
        } else {
          setError(data.data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getCategory();
  }, []);

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="*:mb-1 ">
        <h3 className="text-white">ثبت آگهی</h3>
        <p className="text-slate-400 text-sm">انتخاب دسته بندی</p>
      </div>
      <div className="relative ">
        <div className="absolute inset-2 text-gray-600  w-fit  ">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="w-full bg-transparent rounded pr-10 focus:outline-none focus:ring-0 focus:border-red-600 text-white h-9 placeholder:text-sm"
          placeholder="جستجو در دسته ها"
        />
      </div>

      <div className="flex flex-col  ">
        {isChild && (
          <p
            onClick={() => {
              setCategoryList(initialCategoryList);
              setIsChild(false);
            }}
            className="text-white text-xs my-2 cursor-pointer"
          >
            {" "}
            بازگشت به همه دسته بندی ها
          </p>
        )}
        {categoryList?.length > 0 &&
          categoryList.map((item) => (
            <div
              className="grid grid-cols-12 border-b border-b-slate-700 py-2 cursor-pointer "
              key={item._id}
              onClick={() => send(item)}
            >
              <div className="col-span-4 flex gap-3 items-center">
                {item?.icon && (
                  <img className="w-5 " src={`/${item.icon}`} alt="" />
                )}
                <p className="text-white text-sm">{item.name}</p>
              </div>
              <div className="col-span-8 flex justify-end">
                <img src="/leftArrow.svg" alt="" className="w-4 self-end" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
