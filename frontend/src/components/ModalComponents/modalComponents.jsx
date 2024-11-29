import React, { useState, useEffect } from "react";
import api from "config/axios.config";
import Joi from "joi";
import { useDispatch } from "react-redux";
import { setUserIn, setUserId } from "reduxs/slices/user.slice";
export default function ModalComponents({
  modalIsOpen,
  setModalIsOpen,
  setSendCode,
  sendCode,
}) {
  /* -------------------------- states and varriables ------------------------- */
  const [timer, setTimer] = useState(121);
  const [mobile, setMobile] = useState(null);
  const [confirmCode, setConfirmCode] = useState();
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [countDown, setCountDown] = useState();
  const dispatch = useDispatch();
  /* -------------------------------- Functions ------------------------------- */
  const sendCodeHandler = async (event) => {
    setErrorMessage();
    setErrorOccured();
    setTimer(121);
    const mobileSchema = Joi.string()
      .pattern(/^(09\d{9}|9\d{9})$/)
      .required();
    const { error } = mobileSchema.validate(mobile);

    if (error) {
      setErrorOccured(true);
      setErrorMessage("شماره موبایل نامتعبر است.");
      return;
    }
    const mobileForSendCode = formatMobile(mobile);
    if (event.target.innerText == "تغییر شماره موبایل") {
      setMobile();
      setErrorOccured();
      setErrorMessage();
      setSendCode(false);
    } else if (event.target.innerText == "ارسال کد") {
      try {
        const { data } = await api.post("/auth/send-otp", {
          mobile: mobileForSendCode,
        });
        if (data.success) {
          setSendCode(true);
        }
      } catch (error) {
        setErrorOccured(true);
        setErrorMessage(error.response.data.data.message);
      }
    } else if (event.target.innerText == "تایید") {
      try {
        const { data } = await api.post("/auth/check-otp", {
          mobile: mobileForSendCode,
          code: confirmCode,
        });
        if (data.success) {
          localStorage.setItem(
            "Authorization",
            `Bearer ${data.data.body.token}`
          );
          dispatch(setUserIn(true));
          dispatch(setUserId(data.data.body.id));
          setModalIsOpen(false);
          setSendCode(false);
        }
      } catch (error) {
        dispatch(setUserIn(false));
        setErrorOccured(true);
        setErrorMessage(error.response.data.data.message);
      }
    } else if (event.target.name == "reSend") {
      setTimer(121);
      try {
        const { data } = await api.post("/auth/send-otp", {
          mobile: mobileForSendCode,
        });
        if (data.success) {
          setSendCode(true);
        }
      } catch (error) {
        setErrorOccured(true);
        setErrorMessage(error.response.data.data.message);
      }
    }
  };
  const engToPersian = (number) => {
    return number.toString().replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const formatMobile = (mobile) => {
    let persianToEng = mobile.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    persianToEng.startsWith("0")
      ? (persianToEng = persianToEng.substring(1))
      : null;

    return `98${persianToEng}`;
  };
  /* -------------------------------- useEffect ------------------------------- */
  useEffect(() => {
    if (timer > 120 && sendCode) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setCountDown(interval);
    } else {
      clearInterval(countDown);
    }
    return () => {
      clearInterval(countDown);
    };
  }, [sendCode]);

  /* --------------------------------- returns -------------------------------- */
  return (
    <>
      {modalIsOpen && (
        <div
          className="w-full absolute top-0 right-0  h-full transition-all flex justify-center items-center text-white z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="bg-[#242424] w-1/3 h-4/6 flex justify-between flex-col  items-center rounded-xl p-3 bg-red ">
            <section className=" border-b-2 w-full  p-4 text-lg text-slate-300 font-bold border-b-slate-600 flex justify-between ">
              <h2>ورود به حساب کاربری</h2>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                X
              </p>
            </section>
            {!sendCode ? (
              <>
                <section className="flex flex-col px-1 ">
                  <h3 className="my-5 text-lg font-bold">
                    شماره موبایل خودرا وارد کنید
                  </h3>
                  <p className="leading-8 text-slate-300 text-sm">
                    برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد
                    نمایید. کد تایید به این شماره پیامک خواهد شد.
                  </p>
                  <div className="relative my-3 ">
                    <input
                      type="tel"
                      name="number"
                      id="number"
                      dir="rtl"
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="شماره موبایل"
                      className=" border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white bg-transparent focus:border-red-700 focus:ring-red-700"
                      required
                    />
                    <span className="absolute top-2 left-3 bg-[#484848] p-1 text-xs rounded-2xl text-slate-300 ">
                      ۹۸+
                    </span>
                  </div>
                  {errorOccured ? (
                    <p className="text-red-500 mt-3 mr-2 text-xs">
                      {errorMessage}
                    </p>
                  ) : (
                    <div></div>
                  )}
                  <p className="dark:text-gray-400 text-sm mt-5 mb-8  ">
                    <a href="#" target="_blank" className="text-red-500 ">
                      شرایط استفاده از خدمات{" "}
                    </a>{" "}
                    و
                    <a href="#" className="text-red-500 ">
                      {" "}
                      حریم خصوصی{" "}
                    </a>
                    دیوار را می پذیرم.
                  </p>
                </section>
                <section className="flex  p-2 justify-end  border-t-2 w-full border-slate-600 ">
                  <button
                    className=" bg-red-500 p-3 mt-1 rounded-lg  text-slate-700 font-bold "
                    onClick={sendCodeHandler}
                  >
                    ارسال کد
                  </button>
                </section>
              </>
            ) : (
              <div className="flex flex-col w-full h-full justify-around">
                <section className="flex flex-col p-3  ">
                  <h3 className="text-lg font-bold mb-3 ">
                    کد تایید را وارد کنید
                  </h3>
                  <p className="leading-8 text-slate-300 text-sm flex gap-1">
                    <span>کد پیامک شده به شماره </span>
                    <span>{engToPersian(mobile)}</span>
                    <span>وارد کنید.</span>
                  </p>
                  <div className="my-3 flex flex-col gap-3 ">
                    <input
                      type="tel"
                      name="number"
                      id="number"
                      dir="rtl"
                      onChange={(e) => setConfirmCode(e.target.value)}
                      placeholder=" کد تایید 6 رقمی"
                      className=" border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white bg-transparent focus:border-red-700 focus:ring-red-700"
                      required
                    />
                    <div className="flex justify-between w-full ">
                      {errorOccured ? (
                        <p className="text-red-500 mt-3 mr-2 text-xs">
                          {errorMessage}
                        </p>
                      ) : (
                        <div></div>
                      )}
                      <button
                        className="self-end bg-[#3f3f3f] text-xs my-2 p-1 px-2 cursor-pointer rounded-xl text-slate-400 "
                        onClick={sendCodeHandler}
                      >
                        تغییر شماره موبایل
                      </button>
                    </div>
                  </div>
                </section>
                <section className="grid grid-cols-3  justify-end  border-t-2 w-full border-slate-600 pt-3 rtl ">
                  <div></div>
                  <div className="flex justify-between items-center col-span-2">
                    {timer > 0 ? (
                      <button className=" text-slate-400 cursor-pointer">
                        درخواست مجدد{" "}
                        <span className="mr-3">{engToPersian(timer)}</span>
                      </button>
                    ) : (
                      <button
                        name="reSend"
                        className="  border-2 border-red-400 dark:text-red-400 p-3 text-xs mt-1 rounded-lg  text-slate-700 font-bold "
                        onClick={sendCodeHandler}
                      >
                        درخواست کد
                      </button>
                    )}
                    <button
                      className=" bg-red-500 p-3 mt-1 rounded-lg w-[70px] text-slate-700 font-bold "
                      onClick={sendCodeHandler}
                    >
                      تایید
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
