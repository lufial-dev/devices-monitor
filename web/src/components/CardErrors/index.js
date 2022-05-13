import { FaExclamationTriangle } from "react-icons/fa";
import * as S from "./styled";

const CardErrors = (props)=>{
    return(
       
        <>
            {
                props.downs.length > 0 &&
                <S.Container>
                    <S.Title>
                        <FaExclamationTriangle color="#f00" size={25}/>
                        <span>PROBLEMAS</span>
                    </S.Title>

                    <S.Content>
                        {
                            props.downs.map(down=>{
                                return <S.ErrorItem>
                                    {down}
                                </S.ErrorItem>
                            })
                            
                        }
                        
                    </S.Content>
                    
                </S.Container>
            }  
        </> 
    );
}

export default CardErrors;