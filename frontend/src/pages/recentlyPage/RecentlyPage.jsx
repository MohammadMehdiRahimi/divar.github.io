import React, { useEffect, useState } from "react";
import HomeComponents from "pages/HomePage/HomeComponents/Home.components";
import { useSelector } from "react-redux";
import api from "config/axios.config";
import Cookies from "js-cookie";
export default function RecentlyPage() {
  const [ads, setAds] = useState([]);
  const [adsIdList, setAdsIdList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { userId } = useSelector((state) => state.user);
  const Authorization =
    Cookies.get("Authorization") ?? localStorage.getItem("Authorization");
  const getAdsIdList = async () => {
    try {
      const { data } = await api.post(
        "user/get-recently",
        { userId },
        {
          headers: {
            Authorization,
          },
        }
      );

      if (data.success) {
        setAdsIdList([...data.body]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getAds() {
    try {
      const { data } = await api.post(
        "ads/get-many-ads",
        { adsIds: adsIdList },
        { headers: { Authorization } }
      );
      if (data.success) {
        setDataLoaded(true);
        setAds([...data.body]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (userId != null) {
      getAdsIdList();
    }
  }, [userId]);
  useEffect(() => {
    getAds();
  }, [adsIdList]);

  return (
    <>
      {dataLoaded && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  grid-cols-1  gap-2 h-fit *:cursor-pointer w-full px-4 ">
          {ads.map((ads, idx) => (
            <HomeComponents item={ads} key={idx} />
          ))}
        </div>
      )}
      {ads.length == 0 && (
        <p className="text-white text-4xl w-full flex justify-center items-center">
          آگهی برای نمایش وجود ندارد
        </p>
      )}
    </>
  );
}
