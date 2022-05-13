import styled from "styled-components";

export const Container = styled.div`
    margin: 10px;
    background-color: #fff;
    width: 100% ;
`;

export const Title = styled.div`
    margin: 10px;
    font-weight: bold ;
    font-size: 16pt ;
`;

export const Content = styled.div`
    margin: 10px;

    table{
        width: 100% ;
        margin-top: 20px ;

        thead{
            background-color: #777;
            color: #fff ;
        }

        td, th{
            padding: 3px ;
        }

        .success{
            background-color: green;
            color: #fff ;
            font-weight: bold ;
            text-align: center ;
        }

        .danger{
            background-color: red ;
            color: #fff ;
            font-weight: bold ;
            text-align: center ;
        }
    }
    
`;