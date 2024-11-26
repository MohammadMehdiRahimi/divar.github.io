import HomeComponents from "components/HomeComponents/Home.components";

export default function HomePage() {
  const listAds = [
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    ,
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    ,
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    ,
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    ,
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
    ,
    {
      title: "چراغ جلو عقب بنز S500 s350 W221",
      desc: `توضیحات
یک جفت چراغ جلو بنز S500–S350
2013
دیلایت دار
سالم و مرتب فابریک
یک جفت خطر عقب فول ال اى دى٢٠١٣ مطابق با تصاویر
فقط تماس


`,
      province: "تهران",
      img: "ads/1.jpg",
      prices: "توافقی",
      category: "car",
      location: "دردشت",
      isUp: true,
      time: "1 ساعت پیش",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3  grid-cols-1  gap-2 h-fit *:cursor-pointer w-full px-4 ">
      {listAds.map((item, index) => (
        <HomeComponents key={index} item={item} />
      ))}
    </div>
  );
}
