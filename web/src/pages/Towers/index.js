import * as S from "./styled";
import { useState, useEffect } from "react";
import api from "../../services/api";
import AddTower from "../AddTower";

const Towers = ()=>{
    const [towers, setTowers] = useState([]);
    const [showAddTower, setShowAddTower] = useState(false);
    useEffect(()=>{
        api.get("/locais").then(response=>{
            setTowers(response.data);
        })
    }, [showAddTower]);

    return (
        <S.Container >
            <S.Title> Torres </S.Title>

            <S.Button onClick={()=>setShowAddTower(true)}>Nova Torre</S.Button>

            <S.Content onClick={()=>setShowAddTower(false)}>
                <table>
                    <thead>
                        <tr>
                            <th>NOME</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            towers.length > 0 &&
                            towers.map(tower=>{
                                return (
                                    <tr>
                                        <td>{tower.name}</td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </S.Content>
            {
                showAddTower &&
                <AddTower setShowAddTower={setShowAddTower} setTowers={setTowers}/>
            }
        </S.Container>
    );
}

export default Towers;