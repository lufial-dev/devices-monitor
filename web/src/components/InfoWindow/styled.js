import styled from "styled-components";

export const Container = styled.div`
    width: 300px ;
    background-color: #fff ;
    display: flex ;
    align-items: center ;
    flex-direction: column ;

    position: fixed ;
    top: calc(50vh - 205px );
    left: calc(50vw - 120px ) ;

    border-radius: 10px ;
    box-shadow: 4px 4px 4px;

    @media(min-width: 800px) {
        margin-left: ${props=> props.posX}px;
        margin-top: ${props=>props.posY}px;
    }
   
    
`

export const Description = styled.div`
    margin-top: 20px ;
    width: 95% ;

    .success{
        color: #fff;
        background-color: green ;
    }

    .danger{
        color: #fff;
        background-color: red ;
    }
`
export const Close = styled.div`
    padding: 8px 20px ;
    border: 1px solid #ccc ;
    margin: 10px ;
    border-radius: 8px ;
    color: #fff;
    background-color: #ff9900 ;
    cursor: pointer ;
`

export const DescriptionLine = styled.div`
    padding: 8px 20px ;
    border: 1px solid #ccc ;
    margin-top: 5px ;
    border-radius: 8px ;

`

export const Title = styled.div`
    width: 100%;
    text-align: center ;
    margin-top: 10px ;
    font-size: 12pt ;
    font-weight: bold ;
`