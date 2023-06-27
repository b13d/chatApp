import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <motion.div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </motion.div>
  );
};

export default Sidebar;
