import { Link } from "react-router-dom";
import style from "./Card.module.css"

export default function Card({id, name, species, gender, image, onClose}) {
   return (
      <div className= {style.container}>
         <button onClick={ ()=> onClose(id)} className ={style.closeButton}>X</button>
         <img  src={image} alt="" />
         <Link to={`/detail/${id}`}>
         <h2>Name: {name}</h2>
         </Link> 
         <h2>Species: {species}</h2>
         <h2>Gender: {gender}</h2>
         
      </div>
   );
}
