import moment from "moment-timezone";

export const timeDif = (times) => {
  const getTime = () => {
    const localTime = moment(times).tz("Asia/Tehran").format();
    let [date, time] = localTime.split("T");
    time = time.split("+")[0].split(":");
    date = date.split("-");
    return [time, date];
  };
  const [time, date] = getTime();
  const now = new Date();
  const [hours, mins, seconds] = time.map(Number);
  const [Year, Month, Day] = date.map(Number);
  const inputDate = new Date(Year, Month - 1, Day, hours, mins, seconds);
  const dif = now - inputDate;
  const difMins = Math.floor(dif / (1000 * 60));
  const difHours = Math.floor(dif / (1000 * 60 * 60));
  const difDays = Math.floor(dif / (1000 * 60 * 60 * 24));
  if (difDays > 0) {
    return `${numberEngToPersian(difDays)} روز پیش`;
  } else if (difHours > 0) {
    return `${numberEngToPersian(difHours)} ساعت پیش`;
  } else if (difMins > 0) {
    if (difMins < 15) {
      return "ربع ساعت پیش";
    } else if (difMins < 30) {
      return `نیم ساعت پیش`;
    } else if (difMins < 60) {
      return `یک ساعت پیش`;
    }
  } else {
    return `لحظاتی پیش`;
  }
};

export const numberEngToPersian = (number) => {
  return number.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};
export const numberSeprator = (number) => {
  return number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};