import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../../Imagenes/logomv.png";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Styles from "../NavBar/Navbar.module.css";
import { Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia"

export default function ButtonAppBarLoged({link}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);;
  const setUser = link[1];
  const user2 = link[0];
  const cerrarSesion = () => {
    setUser([]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box className={Styles.mobileBar} sx={{ flexGrow: 1 }}>
      <AppBar className={Styles.mobileBar} position="static">
        <Toolbar className={Styles.mobileBar} >
          <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          > 
            <MenuItem onClick={handleClose} ><Link to="/inicio" className={Styles.linkMobile}>INICIO</Link></MenuItem>
            <MenuItem onClick={handleClose} ><Link to="/peliculas" className={Styles.linkMobile}>PELICULAS</Link></MenuItem>
            <MenuItem onClick={handleClose} ><Link to="/series" className={Styles.linkMobile}>SERIES</Link></MenuItem>
            <MenuItem onClick={handleClose} ><Link to="/peliculasVistas" className={Styles.linkMobile}>VISTAS</Link></MenuItem>
            <MenuItem onClick={handleClose} ><Link to="/peliculasPorVer" className={Styles.linkMobile}>POR VER</Link></MenuItem>
            <MenuItem onClick={handleClose} ><Link to="/peliculasFavoritas" className={Styles.linkMobile}>FAVORITAS</Link></MenuItem>
            <MenuItem onClick={handleClose} ><Link to="/micuenta" className={Styles.linkMobile}>MI CUENTA</Link></MenuItem>
            <MenuItem onClick={cerrarSesion}>CERRAR SESION</MenuItem>
          </Menu>          
          <img className={Styles.logoMobile} src={Logo} alt="logo" />
          <div className={Styles.BoxMobile}> 
          <Typography className={Styles.buttontext2}>
            {user2[1]}
          </Typography>       
          <LiaUserCircleSolid className={Styles.iconito2}/>
          </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}