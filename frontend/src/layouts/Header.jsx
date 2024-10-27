import { Link } from "react-router-dom";

function Header() {
  return (
    //header class
    <header className="grid w-11/12 grid-cols-12 justify-between items-center border-b-2 p-3  mb-5 mx-auto">
      <div className="flex col-span-1 justify-between items-center p-1">
        <Link to="/">
          <img
            src="divar.svg"
            className=" w-10 border-l-2 border-gray-300 pl-2"
          />
        </Link>
        <span className="flex items-center text-gray-700 h-12 cursor-pointer">
          <img src="location.svg" />
          <p className="mr-1 font-[0.9rem]">تهران</p>
        </span>
      </div>
      <div className="col-span-1"></div>

      {/* ---------------------------- searchbox section ---------------------------  */}
      <div className="col-span-4 ">
        <form class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          ></label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="جستجو در همه آگهی ها ..."
              required
            />
            <button
              type="submit"
              class="text-black absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              جستجو
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-3"></div>
      <div className="flex col-span-3 justify-between  ">
        <Link to="/auth">
          <span className="flex items-center  text-gray-700 h-12 justify-between w-24 ">
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
        </Link>
        <Link
          to="/dashboard"
          className="bg-[#a62626] text-white  h-12 w-20 align-middle rounded-md mr-12 flex items-center justify-center"
        >
          <span> ثبت آگهی</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
