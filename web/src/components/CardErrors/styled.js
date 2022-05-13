import styled from "styled-components";

export const Container = styled.div`
    position: fixed ;
    z-index: 2 ;
    top: 2vh;
    right: 5vh;

    min-width: 20%;
    height: 90vh;
    padding: 10px ;

    background-color: #fff ;

    border-radius: 10px ;
    box-shadow: 5px 5px 5px #000 ;

`


export const Title = styled.div`
    display: flex ;
    justify-content: center ;
    span{
        margin: 3px 10px ;
        font-weight: bold ;
    }
`

export const ErrorItem = styled.div`
    background-color: #f00 ;
    padding: 10px ;
    color: #fff ;
    font-weight: bold ;
    border-radius: 5px ;

    text-align: center ;
    margin-top: 5px ;

`

export const Content = styled.div`
    margin-top: 20px ;

`