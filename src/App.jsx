import './css/App.css';
import TopNav from './components/TopNav.jsx';
import Scorrimento from './components/Scorrimento.jsx';
import Login from './components/Login.jsx';
import MyTable from './components/MyTable.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav.jsx';
import Dettaglio from './components/Dettaglio.jsx';


function App(){

  return (
    <>
      <BrowserRouter>
        <TopNav/>
          <Routes>  
            <Route index element={<><Scorrimento/><BottomNav/></>}></Route>
            <Route path='/pazienti' element={<MyTable props={'pazienti'}/>}></Route>
            <Route path='/visite' element={<MyTable props={'visite'}/>}></Route>
            <Route path='/referti' element={<MyTable props={'referti'}/>}></Route>
            <Route path='/contattare' element={<MyTable props={'contattare'}/>}></Route>
            <Route path='/dettaglio/:cf' element={<Dettaglio />}></Route>
            <Route path='/login' element={<><Login/><BottomNav/></>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App



