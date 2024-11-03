import { useState, useEffect } from "react";
import api from "config/axios.config.js";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "reduxs/slices/user.slice";
export default function HeaderComponets({ text, icon, isModal = false }) {
  /* --------------------------------- states --------------------------------- */

  const [mobile, setMobile] = useState("");
  const [getCode, setGetCode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [errorOccured, setErrorOccured] = useState(false);
  const dispatch = useDispatch();
  const { userIn } = useSelector((state) => state.user);
  const [timer, setTimer] = useState(120);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* --------------------------------- Effect --------------------------------- */
  useEffect(() => {}, [errorOccured, getCode]);
  useEffect(() => {
    let countdown;
    if (getCode) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [getCode]);

  /* -------------------------------- functions -------------------------------- */
  async function submitHandler(event) {
    event.preventDefault();
    let formatMobile = mobile.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    if (formatMobile.startsWith("0")) {
      formatMobile = formatMobile.substring(1);
    }
    formatMobile = `98${formatMobile}`;
    setMobile(formatMobile);
    try {
      const { data } = await api.post("/auth/send-otp", {
        mobile: formatMobile,
      });

      console.log(data);
      setGetCode(true);
    } catch (error) {
      console.log(error);
      setErrorOccured(true);
    }
  }

  async function verifyOtpHandler(event) {
    event.preventDefault();
    try {
      const { data } = await api.post("/auth/check-otp", {
        mobile,
        code: otpCode,
      });
      if (data?.success) {
        dispatch(setUser(true));
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrorOccured(true);
      console.log("Error verifying OTP", error);
    }
  }

  function toggleModal() {
    setIsModalOpen(!userIn && !isModalOpen);
  }

  if (isModal && isModalOpen && !userIn) {
    return (
      <div
        className="*:transition-all *:text-xs *:px-3 *:py-2 *:items-center *:rounded-md  "
        id="modal"
      >
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-full"
        >
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-[#292929] w-full ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  ورود به حساب کاربری
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 flex flex-col gap-6">
                {!getCode ? (
                  <>
                    <span className="block font-bold pb-4  dark:text-white text-[16px]">
                      شماره موبایل خود را وارد نمایید
                    </span>
                    <span className="text-gray-400 text-sm leading-8">
                      برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را
                      وارد نمایید. کد تایید به این شماره پیامک خواهد شد.
                    </span>
                    <form
                      className="space-y-4 flex flex-col  gap-5"
                      action="post"
                      onSubmit={submitHandler}
                    >
                      <div className="border-b border-b-gray-500 ">
                        <div className="relative ">
                          <input
                            onChange={(e) => setMobile(e.target.value)}
                            type="tel"
                            name="number"
                            id="number"
                            dir="rtl"
                            placeholder="شماره موبایل"
                            className=" border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white bg-transparent focus:border-red-700 focus:ring-red-700"
                            required
                          />
                          <span className="absolute top-2 left-3 bg-[#484848] py-1 px-2 rounded-2xl text-white ">
                            ۹۸+
                          </span>
                        </div>
                        {errorOccured ? (
                          <p className="text-red-600 mt-3 mr-2">
                            مشکلی رخ داده است لطفا لحظاتی دیگر مراجعه نمایید.
                          </p>
                        ) : (
                          ""
                        )}
                        <p className="dark:text-gray-400 text-sm mt-5 mb-8  ">
                          <a
                            href="#"
                            target="_blank"
                            className="text-red-700 font-bold"
                          >
                            شرایط استفاده از خدمات{" "}
                          </a>{" "}
                          و
                          <a href="#" className="text-red-700 font-bold">
                            {" "}
                            حریم خصوصی{" "}
                          </a>
                          دیوار را می پذیرم.
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="w-20 bg-red-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10 mr-auto "
                      >
                        تایید
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <span className="block font-bold pb-4  dark:text-white text-[16px]">
                      کد تایید را وارد نمایید
                    </span>
                    <form
                      className="space-y-4 flex flex-col  gap-8"
                      action="post"
                      onSubmit={verifyOtpHandler}
                    >
                      <div className="border-b border-b-gray-500  flex flex-col  gap-5 ">
                        <div className="relative ">
                          <input
                            onChange={(e) => setOtpCode(e.target.value)}
                            type="text"
                            name="otp"
                            id="otp"
                            dir="rtl"
                            placeholder="کد تایید"
                            className=" border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white bg-transparent focus:border-red-700 focus:ring-red-700"
                            required
                          />
                        </div>
                        <div className="flex items-center justify-between mb-6 relative">
                          {errorOccured ? (
                            <p className="text-red-600 mt-3 mr-2">
                              مشکلی رخ داده است لطفا لحظاتی دیگر مراجعه نمایید.
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between w-full">
                        {timer >= 0 && getCode && (
                          <p className="dark:text-white  flex gap-2 items-center cursor-pointer">
                            {timer > 0 ? (
                              <span className="font-medium text-xs">
                                {timer}
                              </span>
                            ) : (
                              <span className="border p-2 rounded-lg border-red-600 text-red-600">
                                درخواست مجدد
                              </span>
                            )}
                          </p>
                        )}
                        <button
                          type="submit"
                          className="w-20 bg-red-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                        >
                          تایید
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="*:transition-all *:text-xs *:px-3 *:py-2 *:items-center *:rounded-md"
        onClick={toggleModal}
      >
        <div className="flex items-center gap-3  dark:text-white cursor-pointer dark:hover:bg-gray-700  ">
          <span>{text}</span>
          <img src={icon} className="w-6" />
        </div>
      </div>
    );
  }
}
