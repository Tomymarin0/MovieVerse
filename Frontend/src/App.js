import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import SeccionPeliculas from "./components/SeccionPeliculas/SeccionPeliculas";
import PaginaPelicula from "./components/SeccionPeliculas/PaginaPelicula/PaginaPelicula";
import PaginaSerie from "./components/SeccionPeliculas/PaginaSerie/PaginaSerie";
import NotFound from "./components/404/Error404";
import Login from "./components/Login/login";
import Signup from "./components/SignUp/SignUp";
import PeliculasVistas from "./components/Listas/PeliculasVistas/PeliculasVistas";
import PeliculasPorVer from "./components/Listas/PeliculasPorVer/PeliculasPorVer";
import PeliculasFavoritas from "./components/Listas/PeliculasFavoritas/PeliculasFavoritas";
import Series from "./components/SeccionPeliculas/Series/Series";
import Recovery from "./components/RecuperarContra/RecuperarContra";
import NuevaContraseña from "./components/RecuperarContra/CrearNuevaContra";
import Footer from "./components/Footer/Footer";
import Inicio from "./components/Inicio/Inicio";
import MiCuenta from "./components/MiCuenta/MiCuenta";
import React, { useState, useEffect} from "react";
import NavBarLoged from "./components/NavBarLoged/NavBarLoged";


function App() {
  const [user, setUserState] = useState([]);
  const [newUser, setRegister] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const setUser = (user) => {
    setUserState(user);
    if (user.length > 0) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  const logearNuevo = (() => {
    if (user.length === 0 && newUser.length > 0) {
      user.push(newUser[0]);
      user.push(newUser[1]);
      return user;
    }
  })();


  return (
    <div>
      <Routes>
        <Route path="/" element={ 
          !user.length > 0
          ? <><NavBar /><Login setUser={setUser} /></>
          : <><NavBarLoged user={user} setUser={setUser}/><Inicio/></>
        } />
        <Route path="/login" element={ 
          !user.length > 0
          ? <><NavBar /><Login setUser={setUser} /></>
          : <><NavBarLoged user={user} setUser={setUser}/><Inicio/></>
        } />
        <Route path="/register" element={
          !newUser.length > 0
          ?<><NavBar /><Signup newUser={newUser} setRegister={setRegister}/></>
          :<><NavBarLoged user={logearNuevo} setUser={setUser}/><Inicio/></>
        } />
        <Route path="/peliculas" element={ 
          !user.length > 0
          ? <><NavBar /><Login setUser={setUser} /></> 
          : <><NavBarLoged user={user} setUser={setUser}/><SeccionPeliculas/></> 
        } />
        <Route path="/series" element={ 
          !user.length > 0
          ? <><NavBar /><Login setUser={setUser} /></> 
          : <><NavBarLoged user={user} setUser={setUser}/><Series/></> 
        } />
        <Route path="/paginapelicula/:id" element={ 
          !user.length > 0
          ? <><NavBar /><Login setUser={setUser} /></> 
          : <><NavBarLoged user={user} setUser={setUser}/><PaginaPelicula user={user} setUser={setUser}/></> 
        }/>
        <Route path="/paginaserie/:id" element={ 
          !user.length > 0
          ? <><NavBar /><Login setUser={setUser} /></> 
          : <><NavBarLoged user={user} setUser={setUser}/><PaginaSerie  user={user} setUser={setUser}/></> 
        }/>
        <Route path="/peliculasvistas" element={ 
          !user.length > 0 
          ? <><NavBar /><Login setUser={setUser} /></>
          : <><NavBarLoged user={user} setUser={setUser}/><PeliculasVistas user={user} setUser={setUser}/></>
        }/>
        <Route path="/peliculasporver" element={ 
          !user.length > 0 
          ? <><NavBar /><Login setUser={setUser} /></>
          : <><NavBarLoged user={user} setUser={setUser}/><PeliculasPorVer user={user} setUser={setUser}/></>
        }/>
        <Route path="/peliculasfavoritas" element={ 
          !user.length > 0 
          ? <><NavBar /><Login setUser={setUser} /></>
          : <><NavBarLoged user={user} setUser={setUser}/><PeliculasFavoritas user={user} setUser={setUser}/></>
        }/>
        <Route path="/micuenta" element={ 
          !user.length > 0 
          ? <><NavBar /><Login setUser={setUser} /></>
          : <><NavBarLoged user={user} setUser={setUser}/><MiCuenta user={user} setUser={setUser}/></>
        }/>
        <Route path="/inicio" element={ 
          !user.length > 0 
          ? <><NavBar /><Login setUser={setUser} /></>
          : <><NavBarLoged user={user} setUser={setUser}/><Inicio/></>
        }/>
        <Route path="/nuevacontraseña" element={<><NavBar /><NuevaContraseña /></>}/>

        <Route path="/recovery" element={<><NavBar /><Recovery /></>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;