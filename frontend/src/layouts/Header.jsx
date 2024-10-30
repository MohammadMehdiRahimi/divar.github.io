import HeaderComponets from "components/headerComponets";
import { Link } from "react-router-dom";

function Header() {
  return (
    //header class
    <header className="grid  grid-cols-12 justify-between items-center border-b border-b-gray-500 p-3 px-8  mb-5 mx-auto dark:bg-[#242424]">
      <div className="flex col-span-3 justify-around items-center p-">
        <Link to="/">
          <img src="divar.svg" className=" w-10 " />
        </Link>

        <span className="border h-8 dark:border-slate-600"></span>
        <span className="flex items-center text-gray-700 h-12 cursor-pointer">
          <img src="location.svg" />
          <p className="mr-2 text-sm dark:text-slate-400">تهران</p>
        </span>
        <span className="dark:text-white text-sm">دسته ها</span>


      </div>

      {/* ---------------------------- searchbox section ---------------------------  */}
      <div className="col-span-4 ">
        <form class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          ></label>
          <div class="relative">
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-xs h-10 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-[#353535] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-none focus:ring-0"
              placeholder="جستجو در همه آگهی ها "
              required
            />
            <div class="absolute inset-y-0 end-1  flex items-center px-6 cursor-pointer">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </form>
      </div>

      {/*  ------------------------------ left section ------------------------------  */}

      <div className="flex col-span-5 px-4 justify-between items-center   ">
        <HeaderComponets text="دیوار من" icon="profile.svg" isModal="true" />
        <HeaderComponets text="چت" icon="chat.svg" />
        <HeaderComponets text="پشتیبانی" icon="support.svg" />
        <HeaderComponets text="Fa" icon="earth.svg" />

        {/*  -------------------------------- add ads ------------------------------- */}

        <div className=" *:transition-all *:text-sm *:px-3 *:py-2 *:items-center *:rounded-md">
          <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            class="flex bg-red-500 hover:bg-red-700   focus:outline-none   w-26  justify-between transition-all "
            type="button"
          >
            <p>ثبت آگهی</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
