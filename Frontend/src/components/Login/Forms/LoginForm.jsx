import React, { useState } from "react";
import { Avatar, Link, Grid, Typography, TextField, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Styles from "../login.module.css";
import axios from "axios";

const qs = require('qs');

const LoginForm = ({ setUser }) => {
  const avatarStyle = { backgroundColor: '#1B6DC1' };
  const [Email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = qs.stringify({
      'email': Email,
      'password': contraseña
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/api/users/login/',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      const token = response.data.loginUser.token;
      const name = response.data.loginUser.user.name;
      const email = response.data.loginUser.user.email;

      setUser([email, name, token]);
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      alert("Error during login: " + (error.response ? error.response.data.message : error.message));
    }
  }

  return (
    <Grid container justifyContent="center" display="block">
      <div elevation={20} className={Styles.paperStyle}>
        <form onSubmit={handleSubmit}> 
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockIcon /></Avatar>                       
            <Typography variant="h5" gutterBottom color="white">Iniciar Sesion</Typography>
          </Grid>
          <TextField label="Email" type="email" fullWidth margin="normal" inputProps={{ style: { color: "white" } }} focused placeholder="Email" required value={Email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Contraseña" type="password" fullWidth margin="normal" inputProps={{ style: { color: "white" } }} focused placeholder="Contraseña" required value={contraseña} onChange={e => setContraseña(e.target.value)} />
          <br/>
          <br/>
          <Button align="center" type="submit" variant="contained" color="primary">Iniciar Sesion</Button><br /> <br/>
          <Typography color="white"> ¿No puede acceder a tu cuenta?
            <br/>
            <Link href="/recovery" >
              Olvide contraseña
            </Link>
          </Typography>
          <Typography color="white"> ¿No tiene su cuenta aun?
            <br/>
            <Link href="/register">
              Registrarse
            </Link>
          </Typography>
        </form>
      </div>
    </Grid>
  );
};

export default LoginForm;
