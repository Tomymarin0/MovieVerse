import React, { useState } from "react";
import { Avatar, Link, Grid, Typography, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Styles from "../../Login/login.module.css";
import axios from "axios";
const qs = require('qs');

const SignUpForm = ({ setRegister }) => {
  const avatarStyle = { backgroundColor: "#1B6DC1" };
  const [usuario, setUsuario] = useState("");
  const [mail, setMail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseñaConfirm, setContraseñaConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contraseña.length <= 5) {
      return alert("La contraseña debe tener mínimo 6 caracteres");
    }
    if (contraseña === contraseñaConfirm) {
      let data = qs.stringify({
        'name': usuario,
        'email': mail,
        'password': contraseña 
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/api/users/registration',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          setRegister([usuario, mail]);
          alert("Registrado con éxito, ya puede Iniciar Sesion");
          window.location.href = "/login"; 
        })
        .catch((error) => {
          if (error.response) {

            alert(error.response.data.message);
          } else if (error.request) {

            alert("No se recibió respuesta del servidor");
          } else {

            alert("Error al realizar la solicitud");
          }
          console.log(error);
        });
    } else {
      return alert("Las contraseñas no coinciden");
    }
  }

  return (
    <Grid container justifyContent="center" display="block">
      <div elevation={20} className={Styles.paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddIcon />
            </Avatar>
            <Typography color="white" variant="h5" gutterBottom>
              Registrarse
            </Typography>
            <Typography color="white" variant="caption" gutterBottom>
              Por favor, complete el formulario para crear una cuenta.
            </Typography><br /><br />
          </Grid>
          <Grid align="center">
            <Grid item xs={12} direction="column">
              <TextField type="text" fullWidth label="Ingresar Usuario" inputProps={{ style: { color: "white" } }} focused margin="normal" placeholder="Ingresar Usuario" required value={usuario} onChange={e => setUsuario(e.target.value)} />
              <TextField type="email" fullWidth label="Ingresar Correo Electronico" inputProps={{ style: { color: "white" } }} focused margin="normal" placeholder="Ingresar Correo Electronico" required value={mail} onChange={e => setMail(e.target.value)} />
              <TextField fullWidth label="Ingresar Contraseña" inputProps={{ style: { color: "white" } }} focused type="password" placeholder="Ingresar contraseña" margin="normal" required value={contraseña} onChange={e => setContraseña(e.target.value)} />
              <TextField fullWidth label="Confirmar contraseña" inputProps={{ style: { color: "white" } }} focused type="password" placeholder="Confirmar contraseña" margin="normal" required value={contraseñaConfirm} onChange={e => setContraseñaConfirm(e.target.value)} />
            </Grid>
          </Grid><br />
          <Grid align="center">
            <Button align="center" type="submit" variant="contained" color="primary">
              Registrarse
            </Button><br />
            <br />
            <Typography color="white" variant="caption" style={{ marginTop: '40px' }}>
              ¿Ya tenes una cuenta? <Link href="/login">Iniciar sesión</Link>
            </Typography>
          </Grid>
        </form>
      </div>
    </Grid>
  );
};

export default SignUpForm;
