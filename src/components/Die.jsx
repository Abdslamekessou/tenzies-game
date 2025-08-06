
import '../App.css'

export default function Die(props){
    return(
                <button  className={props.isHeld ? 'Held-btn' : ''} onClick={props.Hold}
                aria-label={`Die With Value ${props.value} , ${props.isHeld ? "held" : "not held"}`
                } 
                aria-pressed ={props.isHeld}
                >{props.value}</button>
    )
}