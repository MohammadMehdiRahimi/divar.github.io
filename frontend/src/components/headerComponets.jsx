import React from "react";
import { useState } from "react";


export default function HeaderComponets({ text, icon, isModal = false }) {
      
  if (isModal) {
    return (
      <div className="*:transition-all *:text-xs *:px-3 *:py-2 *:items-center *:rounded-md">
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          class="flex dark:hover:bg-gray-700 dark:text-white  focus:outline-none   rounded-md  items-center   w-26  justify-between  "
          type="button"
        >
          <img src={icon} className="ml-3" />
          <p>{text}</p>
        </button>
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-lg max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-[#292929] w-full">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-4">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  ورود به حساب کاربری
                </h3>
                <button
                  type="button"
                  class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div class="p-4 md:p-5 flex flex-col gap-6">
                <span className="block font-bold pb-4  dark:text-white text-[16px]">
                  شماره موبایل خود را وارد نمایید
                </span>
                <span className="text-gray-400 text-sm leading-8">
                  برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد
                  نمایید. کد تایید به این شماره پیامک خواهد شد.
                </span>
                <form class="space-y-4 flex flex-col  gap-5" action="#">
                  <div className="border-b border-b-gray-500 ">
                    <div className="relative ">
                      <input
                        type="text"
                        name="number"
                        id="number"
                        placeholder="شماره موبایل"
                        class=" border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white bg-transparent focus:border-red-700 focus:ring-red-700"
                        required
                      />
                      <span className="absolute top-2 left-3 bg-[#484848] py-1 px-2 rounded-2xl text-white ">
                        ۹۸+
                      </span>
                    </div>
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
                    class="w-20 bg-red-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10 mr-auto "
                  >
                    تایید
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="*:transition-all *:text-xs *:px-3 *:py-2 *:items-center *:rounded-md">
        <div className="flex items-center gap-3  dark:text-white cursor-pointer dark:hover:bg-gray-700  ">
          <span>{text}</span>
          <img src={icon} className="w-6" />
        </div>
      </div>
    );
  }
}
