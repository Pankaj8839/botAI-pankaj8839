import ChatCard from "../component/Card/ChatCard";
import styles from "./PastChat.module.css";
import Rating from "@mui/material/Rating";
import Button from "../component/Button/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PastChat = () => {
    const [valueStar, setValueStar] = useState(0);
    
  
    const rawData = JSON.parse(localStorage.getItem("dataAI")) || [];
    const [dataArray, setDataArray] = useState([...rawData].reverse());
    const [renderArray, setRenderArray] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (valueStar === 0) {
            setRenderArray(dataArray);
            return;
        }
        const filteredArray = dataArray.filter((item) => item.rating == valueStar);
        setRenderArray(filteredArray);
    }, [valueStar, dataArray]);

    return (
        <div className={styles.pastchat}>
            <h1>Conversation History</h1>
      
            {
                dataArray.length > 0   && (
                    <>
                    <p>Here are your past conversations with Soul AI</p>
                    <select 
                value={valueStar} 
                onChange={(e) => setValueStar(Number(e.target.value))} 
            >
                <option value={0}>Select Star</option>
                <option value={1}>Star 1</option>
                <option value={2}>Star 2</option> 
                <option value={3}>Star 3</option>
                <option value={4}>Star 4</option>
                <option value={5}>Star 5</option> 
            </select>
            </>
                )
            }
            
           

            {renderArray.length === 0 ? (
                <div className={styles.emptyContainer}>
                    {valueStar!=0 ? <p>No conversations found with this rating.</p> :<>
                        <p>Sorry No Past Conversation found with BotAI</p>
                        <Button onClick={() => navigate("/")}>Go To Home</Button>
                    </>}
                    
                </div>
            ) : (
                renderArray.map((item, index) => (
                    <div key={index} className={styles.container}>
                        <div className={styles.cardContainer}>
                            {item.quesArrary.map((object, ind) => (
                                <div key={ind} className={styles.chatPair}>
                                    <ChatCard
                                        type={"question"}
                                        question={object.question}
                                        readonly={true}
                                        time={object.time}
                                    />
                                    <ChatCard
                                        type={"answer"}
                                        question={object.answer}
                                        readonly={true}
                                        time={object.time}
                                    />
                                </div>
                            ))}
                            <div className={styles.feedbackContainer}>
                                <p> <span>Feedback:</span> {item.feedback}</p>
                                <Rating name="read-only" value={item.rating} readOnly />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PastChat;

