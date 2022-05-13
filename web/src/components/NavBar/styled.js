import styled from "styled-components";

export const Container = styled.div`
    width: 50px ;
    bottom: 0 ;
    background-color: black ;

    display: flex ;
    flex-direction: column ;
    align-items: center ;
`

export const NavItem = styled.div`
    width: 48px ;
    height: 48px ;

    display: flex ;
    align-items: center ;
    justify-content: center ;

    img{
        width: 25px ;
    }
`

export const SideNav = styled.div`
    position: fixed ;
`