import api from "../../services/api";
import * as S from "./styled";

const AddTower = (props)=>{

    function save(evt){
        evt.preventDefault();
        let name = document.getElementById("name").value;
        let tower = {
            name
        }
  
        api.post("/local", tower).then(()=>{
            props.setShowAddTower(false);
        }).catch(()=>{
            alert("Erro ao cadastrar");
        })
    }

    return(
        <S.Container>
            <S.Title> Nova Torre </S.Title>

            <S.Form onSubmit={save} method="post">
                <S.FormGroup>
                    <label to="name">Nome</label>
                    <input required id="name" name="name" type="text" placeholder="Nome"/> 
                </S.FormGroup>                

                <S.FormGroup>
                    <button type="submit">Salvar</button>
                </S.FormGroup>
            </S.Form>
        </S.Container>
    )
}

export default AddTower;