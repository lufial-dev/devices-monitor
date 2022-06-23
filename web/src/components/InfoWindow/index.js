import { useEffect, useState } from "react";
import * as S from "./styled";

const InfoWindow = (props)=>{
    const [timePing, setTimePing] = useState(0);

    function ping(){
        document.getElementById("button-ping").style.backgroundColor = "#ccc";
        document.getElementById("button-ping").textContent = "Aguarde...";
        let now = Date.now();
        fetch(`http://${props.radio.ipAddress}`).catch((error)=>{
            setTimePing(`${Date.now() - now}ms`);
            document.getElementById("button-ping").style.backgroundColor = "#0055ff";
            document.getElementById("button-ping").textContent = "Ping";
        })
    }

    useEffect(()=>{
        if(props.radio.status === "UP")
            ping()
    }, [])

    return (
        <S.Container posX={props.posX} posY={props.posY}>
            <S.Title>
                {props.radio.name}
            </S.Title>

            <S.Description>
                <S.DescriptionLine><strong>IP: </strong><span>{props.radio.ipAddress}</span></S.DescriptionLine>
                <S.DescriptionLine><strong>TORRE: </strong><span>{props.radio.local}</span></S.DescriptionLine>
                <S.DescriptionLine className={`${props.radio.status==="UP" ? "success" : "danger"}`}><strong>STATUS: </strong><span>{props.radio.status}</span></S.DescriptionLine>
            </S.Description>
            
           
            { props.radio.status === "UP" &&
                <S.Ping>
                    <S.DescriptionLine>
                        <S.DescriptionLine className="time">
                            <strong>Time:</strong> <span>{timePing}</span>
                        </S.DescriptionLine>
                        <button id="button-ping" tipe="button" onClick={ping}>
                            Ping
                        </button>
                    </S.DescriptionLine>
                    
                </S.Ping>
            }

            <S.Close onClick={()=>props.setInfoWindow(null)}>
                Fechar
            </S.Close>

            
        </S.Container>
    )
}

export default InfoWindow;