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
    const [infoWindow, setInfoWindow] = useState(null);
    const [altered, setAltered] = useState(false);
    const [downs, setDowns] = useState([]);
    const [radios, setRadios] = useState([]);

    useEffect(()=>{
        api.get('/')
            .then(response => {
                let radios = response.data.hosts;
                setRadios(radios);
                setAltered(response.data.altered);
            })
    }, [])

    useEffect(()=>{
            if(radios.length > 0){
                let i = 0;
                let list = radios.map(radio=>{
                    if(radio.status === "DOWN" && !downs.includes(radio.local))
                        setDowns([...downs, radio.local]);            
                    return <><Marker 
                            key={radio.id}
                            icon={radio.status === "UP" ? pin_green : pin_red} 
                            position={{ lat: parseFloat(radio.lat), lng: parseFloat(radio.lng)  }} 
                            title={radio.name}
                            onclick = {()=>alert("clicou")}
                        >   
                            {
                                infoWindow == radio.id &&
                                <InfoWindow posX={document.querySelector(`[title="${radio.name}"]`) ? parseInt(document.querySelector(`[title="${radio.name}"]`).offsetLeft) : 0 } posY={document.querySelector(`[title="${radio.name}"]`) ? parseInt(document.querySelector(`[title="${radio.name}"]`).offsetTop) : 0 }
                                    radio={radio}
                                    setInfoWindow = {setInfoWindow}
                                /> 
                            }   
                                      
                        </Marker>

                    </>

                });
                
                props.setMarkers(list);  
            }
                                     

                         
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoWindow]);

    useEffect(()=>{
        
        
        alert("1")
        setTimeout(()=>{
            if(altered){
                props.setRefreshMap(!props.refreshMap);
                props.setDowns(downs);
            }
            setRefresh(!refresh);
        }, 120000);

    }, [refresh]);

    useEffect(()=>{
        setTimeout(()=>{
            radios.map(radio=>{
                let node = document.querySelector(`[title="${radio.name}"]`);
                node.addEventListener("click", ()=>{
                    setInfoWindow(radio.id);
                });

                node.addEventListener("touchstart", ()=>{
                    setInfoWindow(radio.id);
                });
            })
        }, 15000);
        
    }, [radios])

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