import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">Lama chat</span>
      <div className="user">
        <img src="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663311109_35-mykaleidoscope-ru-p-litso-veselogo-cheloveka-vkontakte-37.jpg" alt="" />
        <span>Jhon</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar
