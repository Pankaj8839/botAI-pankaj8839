import styles from "./ChatCard.module.css";
import imageEven from "../../assets/avtar.png";
import imageOdd from "../../assets/avtar1.png";
const ChatCard = ({type,question,time,readonly=false}) => {

 
    return (
        <div className={styles.card + (readonly ? ` ${styles.readonly}` : "")}>
         <img src={type==="question" ? imageEven:imageOdd} alt="robot" />
         <div className={styles.textContainer}>
          <h3>{type==="question" ? "You":"Soul AI"}</h3>
          <p className={styles.question}>{question}</p>
          <p className={styles.date}>{time}</p>
         </div>
        </div>

    );
};

export default ChatCard;