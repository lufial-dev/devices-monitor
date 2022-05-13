import styled from "styled-components";

export const Container = styled.div`
    width: 400px ;
    background-color: #fff ;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #888888;

    position: absolute ;
    top: 80px;
    left: calc(50% - 200px) ;
    padding: 10px;
`;

export const Title = styled.div`
    width: 100% ;
    text-align: center ;
    text-decoration: bold ;
    font-weight: bold ;
    font-size: 14pt ;
    
`;

export const Form = styled.form`
    
    
`;

export const FormGroup = styled.div`
    margin: 20px 40px ;
    display: flex ;
    flex-direction: column ;

    input, select{
        padding: 8px ;
    }

    button{
        padding: 10px ;
        background-color: #ff9900 ;
        border: none ;

        cursor: pointer;

    }
`;