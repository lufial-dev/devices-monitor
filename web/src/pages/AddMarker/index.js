import api from "../../services/api";
import * as S from "./styled";
import {useState, useEffect} from "react";

const AddMarker = (props)=>{
    let lat = props.latLng.toString().replace("(", "").replace(")", "").split(",")[0];
    let lng = props.latLng.toString().replace("(", "").replace(")", "").split(",")[1];

    const [locais,  setLocais] = useState([]);

    function save(evt){
        evt.preventDefault();
        let name = document.getElementById("name").value;
        let ipAddress = document.getElementById("ipAddress").value;
        let local = document.getElementById("local").value;
        let radio = {
            name,
            ipAddress,
            local,
            lat,
            lng,
            status : "UP"
        }
  
        api.post("/", radio).then(()=>{
            props.setShowAddMark(false);
        }).catch(()=>{
            alert("Erro ao cadastrar");
        })
    }


    useEffect(()=>{
        api.get("/locais").then(respose=>{
            setLocais(respose.data);
        })
    }, [])

    return(
        <S.Container>
            <S.Title> Novo Rádio </S.Title>

            <S.Form onSubmit={save} method="post">
                <S.FormGroup>
                    <label to="name">Nome</label>
                    <input required id="name" name="name" type="text" placeholder="Nome"/> 
                </S.FormGroup>

                <S.FormGroup>
                    <label to="ipAddress">IP</label>
                    <input required id="ipAddress" name="ipAddress" type="text" placeholder="IP"/> 
                </S.FormGroup>

                <S.FormGroup>
                    <label to="local">Localização</label>
                    <select required id="local" name="local" defaultValue={""}>
                        <option value={""} disabled>Selecione uma localização</option>  
                        {
                            locais &&
                            locais.map(local=>{
                                return <option key={local.id} value={local.name}>{local.name}</option>
                            })
                        }  
                    </select> 
                </S.FormGroup>

                <S.FormGroup>
                    <label to="lat">Latitude</label>
                    <input required id="lat" name="lat" type="text" value={lat} disabled placeholder="Latitude"/> 
                </S.FormGroup>

                <S.FormGroup>
                    <label to="lng">Longitude</label>
                    <input required id="lng" name="lng" type="text" value={lng} disabled placeholder="Longitude"/> 
                </S.FormGroup>

                

                <S.FormGroup>
                    <button type="submit">Salvar</button>
                </S.FormGroup>
            </S.Form>
        </S.Container>
    )
}

export default AddMarker;