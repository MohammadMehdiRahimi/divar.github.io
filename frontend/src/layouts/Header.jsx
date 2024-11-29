import SimpleComponent from "components/ModalComponents/simpleComponent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalComponents from "components/ModalComponents/modalComponents";

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sendCode, setSendCode] = useState(false);
  const { userIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  /* -------------------------------- functions ------------------------------- */
  function createAdsHandle() {
    userIn ? navigate("/ads/create") : setModalIsOpen(true);
  }

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
        <form className="max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          ></label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-xs h-10 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-[#353535] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-none focus:ring-0"
              placeholder="جستجو در همه آگهی ها "
              required
            />
            <div className="absolute inset-y-0 end-1  flex items-center px-6 cursor-pointer">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </form>
      </div>

      {/*  ------------------------------ left section ------------------------------  */}

      <div className="flex col-span-5 px-4 justify-between items-center">
        {!userIn && (
          <div
            className="flex items-center gap-3 dark:text-white cursor-pointer"
            onClick={() => setModalIsOpen(true)}
          >
            <img className="w-5" src="profile.svg" alt="" />
            <p>دیوار من</p>
          </div>
        )}
        <SimpleComponent text="Fa" icon="earth.svg" />
        <SimpleComponent text="چت" icon="chat.svg" />
        <SimpleComponent text="پشتیبانی" icon="support.svg" />

        {/*  -------------------------------- add ads ------------------------------- */}

        <div className=" *:transition-all *:text-sm *:px-3 *:py-2 *:items-center *:rounded-md">
          <button
            className="flex bg-red-500 hover:bg-red-700   focus:outline-none   w-26  justify-between transition-all "
            type="button"
            onClick={createAdsHandle}
          >
            <p>ثبت آگهی</p>
          </button>
        </div>
      </div>
      <ModalComponents
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        sendCode={sendCode}
        setSendCode={setSendCode}
      />
    </header>
  );
}

export default Header;
