import styles from "./SideBar.module.css";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
    return (
        <div className={styles.sidebar}>
           <div className={styles.headerSidebar} onClick={()=>navigate("/")}>
             <img src={require("../assets/logo.png")} alt="logo" className={styles.logo}/>
             <h2>New Chat</h2>
             <img src={require("../assets/tool.png")} alt="close" />
           </div>
           <button className={styles.button} onClick={()=>navigate("/pastchat")}>Past Conversations</button>   
        </div>
    );
};

export default Sidebar;