import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { PiGooglePhotosLogoFill } from "react-icons/pi";

import { Album } from "@/types";

interface NavbarProps {
  length: number;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: Album[];
  handleSearchDisplay: (item: Album) => void;
}

function Navbar(props: NavbarProps) {
  const { length, handleSearch, search, handleSearchDisplay } = props;

  const [suggestionDisplay, setSuggestionDisplay] = useState(false);

  useEffect(() => {
    if (search.length > 0) setSuggestionDisplay(true);
  }, [search]);

  return (
    <header
      className="w-full h-1/10-screen 
        bg-album-container 
        py-0 px-9 
        flex justify-between items-center"
    >
      <div className="flex justify-left items-center">
        <div>
          <div>
            <PiGooglePhotosLogoFill width={50} height={50} fontSize={40} />
          </div>
        </div>
        <div>
          <span className="text-black text-2xl pl-1.5 font-album-title">
            Album
          </span>
        </div>
      </div>
      <div className="flex justify-right items-center p-0 xs:pr-10">
        <div className="mr-2.5 relative">
          <input
            type="text"
            id="inputValue"
            onChange={(e) => handleSearch(e)}
            placeholder="Search..."
          />
          {search.length > 0 && suggestionDisplay && (
            <div
              id="suggestionbox"
              className="searchfilter bg-white 
                absolute top-2.25 -right-px 
                max-h-52 w-64 
                border-0 
                outline-none 
                rounded 
                text-base 
                border border-solid border-navbar-color border-t-0 rounded-none rounded-l-xl
                z-1
                overflow-y-scroll
                font-album-title"
            >
              <ul className="list-none">
                {search.map((item, index) => (
                  <li
                    className="p-1.5 cursor-pointer"
                    key={index}
                    onClick={() => handleSearchDisplay(item)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <div
            className="absolute left-4 bottom-6 
              h-6 w-6 
              text-sm text-black 
              rounded-1/2 border-album-count 
              text-center font-album-title"
          >
            {length}
          </div>
          <div>
            <IoNotifications
              color="black"
              fontSize={35}
              id="bell"
              className="text-2xl"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
