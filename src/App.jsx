import './css/App.css';
import TopNav from './components/TopNav.jsx';
import Scorrimento from './components/Scorrimento.jsx';
import Login from './components/Login.jsx';
import MyTable from './components/MyTable.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav.jsx';
import Dettaglio from './components/Dettaglio.jsx';
import IndexCard from './components/IndexCard.jsx';
import InserisciPazienti from './components/InserisciPazienti.jsx';
import InserisciReferto from './components/InserisciReferto.jsx';


function App(){

  return (
    <>
      <BrowserRouter>
        <TopNav/>
          <Routes>  
            <Route index element={<div className='index-container'><Scorrimento/><IndexCard className='index-card'/><BottomNav/></div>}></Route>
            <Route path='/pazienti' element={<MyTable props={'pazienti'}/>}></Route>
            <Route path='/visite' element={<MyTable props={'visite'}/>}></Route>
            <Route path='/contattare' element={<MyTable props={'contattare'}/>}></Route>
            <Route path='/dettaglio/:cf' element={<Dettaglio />}></Route>
            <Route path='/login' element={<><Login/><BottomNav/></>}></Route>
            <Route path='/inserisci-pazienti' element={<><InserisciPazienti/><BottomNav/></>}></Route>
            <Route path='/inserisci-referto' element={<><InserisciReferto/><BottomNav/></>}></Route>
            
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App



