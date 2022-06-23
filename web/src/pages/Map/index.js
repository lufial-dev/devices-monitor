import { withGoogleMap, GoogleMap} from 'react-google-maps';
import { useState, useEffect } from "react";
import * as S from "./styled";
import Markers from '../../components/Markers';
import AddMarker from '../AddMarker';



const Map = ()=>{
    const [refreshMap, setRefreshMap] = useState(false);
    const [showAddMark, setShowAddMark] = useState(false);
    const [latLng, setLatLng] = useState({});
   

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: -7.846260, lng: -38.747091 } }
        defaultZoom = { 11 }
        onDblClick = {addMarker}
        onClick = {()=>setShowAddMark(false)}
        clickableIcons = {true}
      >
        <Markers setRefreshMap={setRefreshMap} refreshMap={refreshMap}/>
   
      </GoogleMap >
   ));

   function addMarker(e){
        setLatLng(e.latLng);
        setShowAddMark(true)
    }

   useEffect(()=>{
 
   }, [refreshMap])
    
   
  return(
      <S.Container>
        <GoogleMapExample
          containerElement={ <S.Container/> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
        {
            showAddMark &&
            <AddMarker latLng={latLng} setShowAddMark={setShowAddMark}/>
        }
      </S.Container>
   );
}
export default Map;