import * as S from "./styled";

const InfoWindow = (props)=>{
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

            <S.Close onClick={()=>props.setInfoWindow(null)}>
                Fechar
            </S.Close>
        </S.Container>
    )
}

export default InfoWindow;