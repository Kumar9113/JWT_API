import Home from './componets/Home';
import Login from './componets/Login';
import Signup from './componets/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
        </Routes>

      </BrowserRouter>
     
    </div>
  );
}

export default App;