
import React from "react";
import styles from "./Layout.module.css";
import Sidebar from "./SideBar";

function Layout({ children }) {
  return (
    <>
       
      <div className={styles.layout}>
       <Sidebar />
      <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}

export default Layout;