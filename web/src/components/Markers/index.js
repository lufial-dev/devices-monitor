import pin_green from "../../static/img/custom_pin_green.png";
import pin_red from "../../static/img/custom_pin.png";
import { Marker, InfoWindow} from 'react-google-maps';
import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import * as MarkersActions from "../../store/actions/markers";
import { connect } from "react-redux";
import api from "../../services/api";
// {markers, setMarkers, refreshMap, setRefreshMap}

const Markers = (props)=>{
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
            let downs = [];
            api.get('/')
            .then(response => {
                let list = response.data.hosts.map(radio=>{
                    if(radio.status === "DOWN" && !downs.includes(radio.local))
                        downs.push(radio.local)
                    return <>
                        <Marker 
                            icon={radio.status === "UP" ? pin_green : pin_red} 
                            position={{ lat: parseFloat(radio.lat), lng: parseFloat(radio.lng)  }} 
                            title={radio.name}
                            onClick={props.onMarkerRightClick}
                        />                    
                    </>

                })
                                     

               props.setMarkers(list);                    

            setTimeout(()=>{
                if(response.data.altered){
                    props.setRefreshMap(!props.refreshMap);
                    props.setDowns(downs);
                }
                setRefresh(!refresh);
            }, 40000);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

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

const onMarkerClick = (evt) => {
    console.log("foi");
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        MarkersActions,
        dispatch
    );

export const mapStateToProps = state => ({ 
        markers : state.markers,
    });
export default connect(mapStateToProps, mapDispatchToProps)(Markers);