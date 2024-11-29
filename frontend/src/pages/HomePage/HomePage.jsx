import HomeComponents from "./HomeComponents/Home.components";
import api from "config/axios.config";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [adsList, setAdsList] = useState([]);
  useEffect(() => {
    const getAds = async () => {
      const { data } = await api.get("/ads/get-ads");
      if (data.success) {
        setAdsList([...data.data.body]);
      }
    };
    getAds();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3  grid-cols-1  gap-2 h-fit *:cursor-pointer w-full px-4 ">
      {adsList.length > 0 &&
        adsList.map((ads, idx) => {
          return <HomeComponents item={ads} key={idx} />;
        })}
    </div>
  );
}
