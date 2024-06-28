import React from "react";
import Styles from "./Navbar.module.css";
import Logo from "../../Imagenes/logomv.png";
import { Link } from "react-router-dom";
import ButtonAppBar from "./ButtonAppBar";


function NavBar() {
  return (
    <div>
      <div className={Styles.colorNavbar}>
        <div className={Styles.buttonNavbar}>
        </div>
      </div>
      <div className={Styles.containerNavbar}>
        <ButtonAppBar/>
        <img className={Styles.logo} src={Logo} alt="logo" />
        <Link to="/login" className={Styles.link}>
          <h1 className={Styles.navBarButtons}>INICIAR SESION</h1>
        </Link>
        <Link to="/register" className={Styles.link}>
          <h1 className={Styles.navBarButtons}>REGISTRARSE</h1>
        </Link>
      </div>
      <div className={Styles.colorNavbar2}></div>
    </div>
  );
}

export default NavBar;
