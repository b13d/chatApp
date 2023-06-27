import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { motion } from "framer-motion";

const Sidebar = () => {
  const variants = {};

  return (
    <motion.div
      // animate={{ x: -300 }}
      // transition={{ duration: 2 }}
      className="sidebar max-sm:w-[25%]"
    >
      <Navbar />
      <Search />
      <Chats />
    </motion.div>
  );
};

export default Sidebar;
