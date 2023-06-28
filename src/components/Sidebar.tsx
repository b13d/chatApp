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
      className="sidebar  max-[850px]:w-[25%] overflow-hidden shadow-[inset_6px_56px_rgba(1,1,1,0.3)]"
    >
      <Navbar />
      <Search />
      <Chats />
    </motion.div>
  );
};

export default Sidebar;
