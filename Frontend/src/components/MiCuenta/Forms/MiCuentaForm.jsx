import React, { useState } from "react";
import { Avatar, Grid, Typography, TextField, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../login.module.css";

const qs = require('qs');

const MiCuentaForm = ({user, setUser}) => {
  const navigate = useNavigate();

  const avatarStyle = { backgroundColor: "#1B6DC1" };
  const [contraseña, setContraseña] = useState("")
  const [contraseñaConfirm, setContraseñaConfirm] = useState("")
  const handleSubmit = (e) =>{
      e.preventDefault()
      if(contraseña===contraseñaConfirm){
        let data = qs.stringify({
          'email': user[0],
          'password': contraseña 
        });
        
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: 'http://localhost:4000/api/users/update',
          headers: { 
            'x-access-token': user[2], 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
        alert("La contraseña fue cambiada con exito")
        navigate("/inicio")

      } else {
        return alert("Las contraseñas no coinciden")
      }
        
      

  } 

  return (
    <Grid container justifyContent="center" display="block">
      <div elevation={20} className={Styles.paperStyle}>
        <form onSubmit={handleSubmit}> 
        <Grid align='center'>
            <Avatar style={avatarStyle}><LockIcon/></Avatar>                       
            <Typography variant="h5" gutterBottom color="white">Mi Cuenta</Typography>
        </Grid>
              <TextField type="text" fullWidth label="Usuario"  InputProps={{readOnly: true, style: { color: "white" }}} focused margin="normal" placeholder={user[1]} />
              <TextField type="email" fullWidth label="Correo Electronico" inputProps={{readOnly: true, style: { color: "white" }}} focused margin="normal" placeholder={user[0]} />
              <br/>
              <br/>
              <Typography color="white"> ¿Queres Cambiar tu contraseña?</Typography>
              <TextField fullWidth label="Ingresar Contraseña" inputProps={{ style: { color: "white" } }} focused type="password" placeholder="Ingresar contraseña" margin="normal" required  value={contraseña} onChange={e => setContraseña(e.target.value)}/>
              <TextField fullWidth label="Confirmar contraseña" inputProps={{ style: { color: "white" } }} focused type="password" placeholder="Confirmar contraseña" margin="normal" required  value={contraseñaConfirm} onChange={e => setContraseñaConfirm(e.target.value)}/>
        <Button align="center" type="submit" variant="contained" color="primary">Confirmar</Button><br/>

      </form>
      </div>
    </Grid>
  );
};

export default MiCuentaForm;
