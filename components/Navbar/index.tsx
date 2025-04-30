import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { PiGooglePhotosLogoFill } from "react-icons/pi";

import { Album } from "@/types";
import style from "./Navbar.module.css";

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
    <header className={style.header}>
      <div className={style.left}>
        <div className={style.imgIcon}>
          <div>
            <PiGooglePhotosLogoFill width={50} height={50} fontSize={40} />
          </div>
        </div>
        <div className={style.heading}>
          <span>Album</span>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.searchbar}>
          <input
            type="text"
            id="inputValue"
            onChange={(e) => handleSearch(e)}
            placeholder="Search..."
          />
          {search.length > 0 && suggestionDisplay && (
            <div id="suggestionbox" className={style.searchfilter}>
              <ul className={style.ul}>
                {search.map((item, index) => (
                  <li
                    className={style.searchindividual}
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
        <div className={style.notificationIcon}>
          <div className={style.count}>{length}</div>
          <div>
            <IoNotifications color="black" fontSize={35} id={style.bell} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
