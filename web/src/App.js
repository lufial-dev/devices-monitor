import NavBar from "./components/NavBar";
import {Routes, Route} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Map from "./pages/Map";
import * as S from "./styled";
import { Provider } from 'react-redux';
import store from "./store";
import Devices from "./pages/Devices";
import Towers from "./pages/Towers";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <S.ContainerPages>
          <NavBar/>
          <Routes>                                      
            <Route path={"/"} element={<Map/>}></Route>  
            <Route path={"/radios"} element={<Devices/>}></Route>   
            <Route path={"/torres"} element={<Towers/>}></Route>       
          </Routes>
        </S.ContainerPages>
      </BrowserRouter>
    </Provider>
   
  );
}

export default App;
