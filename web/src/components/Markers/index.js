import pin_green from "../../static/img/custom_pin_green.png";
import pin_red from "../../static/img/custom_pin.png";
import { Marker} from 'react-google-maps';
import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import * as MarkersActions from "../../store/actions/markers";
import { connect } from "react-redux";
import api from "../../services/api";
import InfoWindow from "../InfoWindow";
// {markers, setMarkers, refreshMap, setRefreshMap}

const Markers = (props)=>{
    const [refresh, setRefresh] = useState(false);
    const [infoWindow, setInfoWindow] = useState();
    const [altered, setAltered] = useState(false);
    const [downs, setDowns] = useState([]);
    const [nodes, setNodes] = useState([])
    useEffect(()=>{
            
            let radios = [];
            api.get('/')
            .then(response => {
                radios = response.data.hosts;
                setAltered(response.data.altered)
                let i = 0;
                let list = radios.map(radio=>{
                    if(radio.status === "DOWN" && !downs.includes(radio.local))
                        setDowns([...downs, radio.local]);            
                    return <><Marker 
                            key={radio.id}
                            icon={radio.status === "UP" ? pin_green : pin_red} 
                            position={{ lat: parseFloat(radio.lat), lng: parseFloat(radio.lng)  }} 
                            title={radio.name}
                        >   
                            {
                                infoWindow == radio.id &&
                                    <InfoWindow posX={parseInt(document.querySelector(`[title="${radio.name}"]`).offsetLeft)} posY={parseInt(document.querySelector(`[title="${radio.name}"]`).offsetTop)}
                                        radio={radio}
                                        setInfoWindow = {setInfoWindow}
                                    /> 
                            }   
                                      
                        </Marker>

                    </>

                })
                                     

               props.setMarkers(list);  
            
            setTimeout(()=>{
                radios.map(radio=>{
                    let node = document.querySelector(`[title="${radio.name}"]`);
                    node.onclick = ()=>{
                        setInfoWindow(radio.id);
                        console.log(radio.name)
                    }
                    
                })
            }, 10000)

           
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoWindow]);

    useEffect(()=>{
        setTimeout(()=>{
            if(altered){
                props.setRefreshMap(!props.refreshMap);
                props.setDowns(downs);
            }
            setRefresh(!refresh);
        }, 120000);

    }, [refresh])

    return(
        <>
            {
                props.markers &&
                    props.markers.map(marker=>{
                        return marker;
                    }) 
            }
        </>
    );
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        MarkersActions,
        dispatch
    );

export const mapStateToProps = state => ({ 
        markers : state.markers,
    });
export default connect(mapStateToProps, mapDispatchToProps)(Markers);