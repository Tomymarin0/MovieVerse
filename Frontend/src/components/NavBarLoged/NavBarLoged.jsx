import React from "react";
import Styles from "../NavBar/Navbar.module.css";
import Logo from "../../Imagenes/logomv.png";
import { LiaUserCircleSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ButtonAppBarLoged from "./ButtonAppBarLoged";


function NavBarLoged({user, setUser}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cerrarSesion = () => {
    setUser([]);
  };




  return (
    <div>
      <div className={Styles.colorNavbar}>
        <div className={Styles.buttonNavbar}>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={Styles.button}
      >
        <Typography className={Styles.buttontext} color="white">
          {user[1]}
        </Typography>
      </Button>
      <LiaUserCircleSolid className={Styles.iconito}/>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} ><Link to="/micuenta" className={Styles.linkMobile}>MI CUENTA</Link></MenuItem>
        <MenuItem onClick={cerrarSesion}>CERRAR SESION</MenuItem>
      </Menu>

        </div>
      </div>
      <div className={Styles.containerNavbar}>
        <ButtonAppBarLoged link={[user, setUser]}/>
        <Link to="/inicio" className={Styles.logo}>
          <img  className={Styles.logo} src={Logo} alt="logo" />
        </Link>
        <Link to="/peliculas" className={Styles.link}>
          <h1 className={Styles.navBarButtons}>PELICULAS</h1>
        </Link>
        <Link to="/series" className={Styles.link}>
          <h1 className={Styles.navBarButtons}>SERIES</h1>
        </Link>
        <Link to="/peliculasvistas" className={Styles.link}>
          <h1 className={Styles.navBarButtons}>VISTAS</h1>
        </Link>
        <Link to="/peliculasporver" className={Styles.link}>
          <h1 className={Styles.navBarButtons}>POR VER</h1>
        </Link>
        <Link to="/peliculasfavoritas" className={Styles.link}>
          <h1 className={Styles.navBarButtons}>FAVORITAS</h1>
        </Link>
      </div>
      <div className={Styles.colorNavbar2}></div>
    </div>
  );
}

export default NavBarLoged;