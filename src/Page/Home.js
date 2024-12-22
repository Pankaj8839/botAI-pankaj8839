import CardQuse from "../component/Card/CardQuse";
import styles from "./Home.module.css";
import Button from "../component/Button/Button";
import { useEffect, useRef, useState } from "react";
import ChatCard from "../component/Card/ChatCard";
import data from "../data.json";
import Modal from 'react-modal';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const [askQuestion,setAskQuestion]=useState("");

    const [questionAnswerArray,setQuestionAnswerArray]=useState([]);

    const [currentTime, setCurrentTime] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valueStar, setValueStar] = useState(0);
    const [feedback, setFeedback] = useState("");
    
    const native=useNavigate();
    const endOfMessagesRef = useRef(null);

    const question=[
        "Hi, what is the weather",
        "Hi, what is my location",
        "Hi, what is the temperature",
        "Hi, how are you"
    ]
    const customStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #ccc',
          backgroundColor: '#FAF7FF',
        },
      };
    const handleQuestionClick=(index)=>{
        setAskQuestion(question[index]);
    }

    const handleSave=()=>{
        if(questionAnswerArray.length===0){ 
            alert("Please ask something");
            return;
        }
        setIsModalOpen(true);
    }
    const handlefinalSubmit = () => {
      if(feedback===""){
          alert("please provide your feedback");
          return;
      }
      if(valueStar===0){
          alert("please provide your rating");
          return;
      }
      let payload={
          quesArrary:questionAnswerArray,
          rating:valueStar,
          feedback:feedback,
      }
    
      let loaclStorageDataAI=localStorage.getItem("dataAI") || "[]";
      let dataAI=JSON.parse(loaclStorageDataAI);
      let newdata=[...dataAI,payload];
      localStorage.setItem("dataAI",JSON.stringify(newdata));
      native("/pastchat");

      }        
    

    const handleAskQuestion=()=>{
        if(!askQuestion){
            alert("Please ask something");
            return;
        }
        const answerArray=data.filter((item)=>item.question.toLowerCase().includes(askQuestion.toLowerCase()));
        const answer = answerArray.length > 0 ? answerArray[0].response : `As an AI Language Model, I don’t have the details`;
        const object={question:askQuestion,answer:answer,time:currentTime};
        const newArray=[...questionAnswerArray,object];
        setQuestionAnswerArray(newArray);
        setAskQuestion(""); 
     
    }
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                })
            );
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
    

    useEffect(()=>{
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    },[questionAnswerArray])

 

    return (
        <div className={styles.home}>
            <div className={styles.container}>
             <h1>Bot AI</h1>
             {questionAnswerArray.length===0 ?  (<>
             <div className={styles.centreContainer}>
               <h2>How Can I Help You Today?</h2>
               <img src={require("../assets/robot.png")} alt="robot" />
             </div>
             <div className={styles.chatContainer}>
              {question.map((que,index)=><CardQuse key={index} question={que} index={index} onClick={handleQuestionClick} />)}
              <div ref={endOfMessagesRef}></div>
            </div>
            </> ): (
                <div className={styles.answerContainer}>
                        {
                            questionAnswerArray.map((item,index)=>{
                                return (
                                    <>
                                    <ChatCard key={index+0.5} type={"question"} question={item.question} time={item.time} />
                                    <ChatCard key={index} type={"answer"} question={item.answer} time={item.time} />
                                    </>
                                )
                            })
                        }
                  <div ref={endOfMessagesRef}></div>
                </div>
            )
            }
             
           <div className={styles.buttonContainer}>
                <input type="text" placeholder="Ask me anything" value={askQuestion} onChange={(e)=>setAskQuestion(e.target.value)}/>
                <Button onClick={()=>handleAskQuestion()}>Ask</Button>
                <Button onClick={() =>  handleSave()}>Save</Button>
            </div>
            </div>

            <div>
   
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}    style={customStyles} contentLabel="Example Modal">
         <div  className={styles.modalContainer}>
            <div className={styles.modalHeaderContainer}>
              <img src={require("../assets/idea.png")} alt="idea" className={styles.idea}/>
              <p>Provide Additional Feedback</p>
              <img src={require("../assets/close.png")} alt="idea" onClick={()=>setIsModalOpen(false)}  className={styles.close}/>
            </div>
             <textarea placeholder="Enter your feedback" value={feedback} onChange={(e)=>setFeedback(e.target.value)} />
             <div className={styles.modalbuttonContainer}>
             <Rating
        name="simple-controlled"
        value={valueStar}
        onChange={(event, newValue) => {
          setValueStar(newValue);
        }}
      />
                <Button onClick={()=>handlefinalSubmit()}>Submit</Button>
                </div>
         </div>
      </Modal>
    </div>

           
        </div>
    )
}

export default Home