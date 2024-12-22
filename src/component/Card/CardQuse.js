import style from "./CardQuse.module.css";
const CardQuse = ({question,onClick,index}) => {
    return (
        <div className={style.cardQuse} onClick={()=>onClick(index)}>
         <p className={style.question}>{question}</p>
         <p className={style.text}>Get immediate AI generated response</p>
        </div>
    );
};

export default CardQuse;