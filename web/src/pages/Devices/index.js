import * as S from "./styled";
import { useState, useEffect } from "react";
import api from "../../services/api";

const Devices = ()=>{
    const [devices, setDevices] = useState([]);

    useEffect(()=>{
        api.get("/").then(response=>{
            setDevices(response.data.hosts);
        })
    }, []);

    return (
        <S.Container>
            <S.Title> Rádios </S.Title>

            <S.Content>
                <table>
                    <thead>
                        <tr>
                            <th>NOME</th>
                            <th>IP</th>
                            <th>TORRE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            devices.length > 0 &&
                            devices.map(device=>{
                                return (
                                    <tr>
                                        <td>{device.name}</td>
                                        <td>{device.ipAddress}</td>
                                        <td>{device.local}</td>
                                        <td className={device.status === "UP" ? "success" : "danger"}>{device.status}</td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </S.Content>
        </S.Container>
    );
}

export default Devices;