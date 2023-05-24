import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user"/>
      </div>
      <div className="userChat">
        <img
          src="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663311109_35-mykaleidoscope-ru-p-litso-veselogo-cheloveka-vkontakte-37.jpg"
          alt=""
        />
        <div className="userChatInfo">
          <span>Jane </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
