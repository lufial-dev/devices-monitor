import * as S from "./styled";
import { FaBroadcastTower, FaMapMarked, FaSignal } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../static/img/logo.png"; 

const NavBar = ()=>{
    return(
        <S.Container>
            <S.SideNav>
                <S.NavItem>
                    <img src={logo} alt={"Logo Ntel Telecom"}/>
                </S.NavItem>
                <S.NavItem>
                    <Link to="/">
                        <FaMapMarked color="#fff"/>
                    </Link>
                </S.NavItem>

                <S.NavItem>
                    <Link to="/radios">
                        <FaSignal color="#fff"/>
                    </Link>
                </S.NavItem>

                <S.NavItem>
                    <Link to="/torres">
                        <FaBroadcastTower color="#fff"/>
                    </Link>
                </S.NavItem>
            </S.SideNav>

        </S.Container>
    );
}

export default NavBar;