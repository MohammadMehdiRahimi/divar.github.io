import React, { useEffect, useState } from "react";
import api from "config/axios.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Maps from "components/Map";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Ads({ props }) {
  /* -------------------------------- variables ------------------------------- */

  const {
    categoryId,
    setError,
    setCategoryList,
    initialCategoryList,
    setCategoryId,
    setStep,
    setIsChild,
  } = props;
  const [options, setOptions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  const author = useSelector((state) => state.user.userId);
  const [listData, setListData] = useState({
    title: "",
    description: "",
    categoryId,
    province: "",
    city: "",
    coordinate: null,
    images: [],
    options: [],
  });

  /* -------------------------------- functions ------------------------------- */
  async function changeHandle(e) {
    try {
      let { name, value } = e.target;
      const key = name.split("-")[1];
      if (name.startsWith("options")) {
        let keyIsExist = false;
        for (let i = 0; i < listData.options.length; i++) {
          if (Object.keys(listData.options[i])[0] == key) {
            keyIsExist = true;
            setListData((prev) => {
              let newOpt = [...prev.options];
              newOpt[i] = { [key]: value };
              return {
                ...prev,
                options: newOpt,
              };
            });
            break;
          }
        }
        if (!keyIsExist) {
          setListData((prev) => ({
            ...prev,
            options: [...prev.options, { [key]: value }],
          }));
          return;
        }
      } else if (name == "province") {
        const province = provinces.find((province) => province.id == value);

        setListData((prev) => ({ ...prev, [name]: province?.name ?? value }));
        await fetchCities(value);
        return;
      } else if (name == "city") {

        const city = states.find((state) => state.id == value);
    
        if (city) value = city.name;
        setListData((prev) => ({ ...prev, [name]: value }));
      } else {
        setListData((prev) => ({ ...prev, [name]: value }));
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchCities(provinceId) {
    try {
      const response = await axios.get(
        `https://iran-locations-api.ir/api/v1/fa/cities?state_id=${provinceId}`
      );
      setStates(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleFileChange(e) {
    const images = Array.from(e.target.files);
    setListData((prev) => ({
      ...prev,
      images: [...images],
    }));
    return;
  }
  async function submintHandle(e) {
    let formData = new FormData();
    e.preventDefault();

    formData.append("author", author);
    for (const key in listData) {
      if (key === "images") {
        listData.images.forEach((file) => formData.append("images", file));
      } else if (key == "options") {
        listData.options.forEach((option) => {
          return formData.append("options", JSON.stringify(option));
        });
      } else {
        formData.append(key, listData[key]);
      }
    }
    try {
      const { data } = await toast.promise(
        api.post("/ads/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "در حال انتشار آگهی ...",
          success: "آگهی با موفقیت منتشر شد",
        }
      );

      setTimeout(() => navigate("/"), [2000]);
    } catch (error) {
      console.log(error);
      setError(error.response.data.data.message);
    }
  }
  /* ------------------------------- useEffects ------------------------------- */
  useEffect(() => {
    if (!categoryId) {
      setError("دسته بندی وجود ندارد");
      navigate("/");
      return;
    }
    const getOptions = async () => {
      try {
        const { data } = await api.get(
          `/option/category-option-by-id/${categoryId}`
        );
        if (data.success) {
          setOptions(data.data.body);
        } else {
          setError(data.data.message);
        }
      } catch (error) {
        setError(error.response.data.data.message);
      }
    };

    const getProvinces = async () => {
      try {
        const { data } = await axios.get(
          "https://iran-locations-api.ir/api/v1/fa/states"
        );
        setProvinces(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getProvinces();
    getOptions();
  }, [categoryId]);

  return (
    <form
      className="flex flex-col w-full text-[#E3E3E3] gap-4"
      onSubmit={submintHandle}
      method="POST"
      encType="multipart/form-data"
    >
      <p
        onClick={() => {
          setCategoryList(initialCategoryList);
          setCategoryId("");
          setStep(1);
          setIsChild(false);
        }}
        className="text-white text-xs my-2 cursor-pointer"
      >
        {" "}
        بازگشت به همه دسته بندی ها
      </p>
      <h3 className="text-white text-lg font-bold">ثبت آگهی</h3>

      <div className="w-full text-sm" name="location">
        <h4 className="mb-4 font-bold">موقعیت آگهی</h4>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {" "}
            <h5>استان</h5>
            <select
              name="province"
              required
              onChange={changeHandle}
              className="w-full bg-transparent *:bg-[#242424] rounded text-xs "
            >
              <option disabled>انتخاب کنید</option>
              {provinces.length > 0 &&
                provinces.map((province, idx) => {
                  return (
                    <option key={`${province.id}${idx}`} value={province.id}>
                      {province.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <h5>شهر</h5>
            <select
              required
              className="w-full bg-transparent *:bg-[#242424] rounded text-xs"
              onChange={changeHandle}
              name="city"
            >
              {states.length > 0 && <option disabled>انتخاب کنید</option>}
              {states.length > 0 ? (
                states.map((state, idx) => {
                  return (
                    <option key={idx} value={state.id}>
                      {state.name}
                    </option>
                  );
                })
              ) : (
                <option disabled>درحال بارگزاری محله ها ...</option>
              )}
            </select>
          </div>
          <div>
            <h5>موقعیت مکانی آگهی</h5>
            <Maps setListData={setListData} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 " name="images">
        <h5>عکس آگهی</h5>
        <div className="">
          <div className="grid  grid-cols-12 gap-5">
            <label
              htmlFor="addImg"
              className="col-span-4 md:col-span-3  flex justify-center items-center cursor-pointer"
            >
              <AddPhotoAlternateIcon
                className="border-dashed border-2 border-red-500 rounded-lg w-full"
                sx={{ fontSize: 110, padding: 5 }}
              />
            </label>
            <ImageIcon
              className="col-span-4 md:col-span-3 border-dashed border-2 border-slate-600 rounded-lg "
              sx={{ fontSize: 110, padding: 3 }}
            />
            <ImageIcon
              className="col-span-4 md:col-span-3 border-dashed border-2 border-slate-600 rounded-lg "
              sx={{ fontSize: 110, padding: 3 }}
            />
            <ImageIcon
              className="col-span-4 md:col-span-3 border-dashed border-2 border-slate-600 rounded-lg "
              sx={{ fontSize: 110, padding: 3 }}
            />
            <ImageIcon
              className="col-span-4 md:col-span-3 border-dashed border-2 border-slate-600 rounded-lg "
              sx={{ fontSize: 110, padding: 3 }}
            />
            <ImageIcon
              className="col-span-4 md:col-span-3 border-dashed border-2 border-slate-600 rounded-lg "
              sx={{ fontSize: 110, padding: 3 }}
            />
          </div>
          <input
            type="file"
            id="addImg"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <p className="text-slate-400 text-xs">
          عکس‌هایی از فضای داخل و بیرون ملک اضافه کنید.
        </p>
        <p className="text-slate-400 text-xs">
          در صورت نداشتن عکس از ملک، آگهی را بدون عکس ثبت کنید.
        </p>
      </div>
      <div className="*:mb-4" name="optins">
        {options.map((item, idx) => (
          <div key={`${item._id}${idx}`} className="flex flex-col gap-1">
            <h6>{item.title}</h6>
            {item.type == "array" ? (
              <select
                className="w-full bg-transparent *:bg-[#242424] text-xs rounded"
                name={`options-${item.key}`}
                onChange={changeHandle}
              >
                <option disabled>انتخاب کنید</option>
                {item.enums[0].split(",").map((a, idx) => {
                  return (
                    <option value={a} key={idx}>
                      {a}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                placeholder={item.guid}
                name={`options-${item.key}`}
                onChange={changeHandle}
                className="bg-transparent border border-slate-400 placeholder:text-sm focus:ring-red-600 rounded p-1"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h6>عنوان</h6>
          <input
            onChange={changeHandle}
            className="bg-transparent border border-slate-400 placeholder:text-sm focus:ring-red-600 rounded p-1 w-full"
            name="title"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <h6>توضیحات</h6>
          <textarea
            onChange={changeHandle}
            cols="30"
            rows="10"
            className="bg-transparent border border-slate-400 placeholder:text-sm focus:ring-red-600 rounded p-1 w-full"
            name="description"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="bg-red-600 p-2 w-3/4 rounded self-center"
      >
        انتشار آگهی
      </button>
    </form>
  );
}
