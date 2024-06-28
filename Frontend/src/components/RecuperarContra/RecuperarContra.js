import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Grid, TextField, Typography, Link, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Icono from "../../Imagenes/logomv.png";
import Styles from "../Login/login.module.css";
import axios from "axios";

const qs = require('qs');

const Recovery = () => {
    const navigate = useNavigate();
    const avatarStyle = { backgroundColor: '#1B6DC1' };
    const [mail, setMail] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        let data = qs.stringify({
            'email': mail 
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/api/users/recovery',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            alert(JSON.stringify(response.data));
            navigate("/login")
          })
          .catch((error) => {
            console.log(error);
          });
          
    };

    return (
        <Grid marginBlock="auto" align="center" container spacing={2}>
            <Grid className={Styles.box2} align="center" xs={8} md={6} order={{ xs: 2, md: 1 }} direction="column">
                <div elevation={20} className={Styles.paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        <Typography variant="h5" gutterBottom color="white">Recuperar Contraseña</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            fullWidth 
                            type="email" 
                            margin="normal" 
                            placeholder="Ingrese su correo electronico" 
                            label="Correo Electronico" 
                            inputProps={{ style: { color: "white" } }} 
                            focused 
                            required 
                            value={mail} 
                            onChange={e => setMail(e.target.value)}
                        />
                        <br />
                        <br />
                        <Button align="center" type="submit" variant="contained" color="primary">Recuperar Contraseña</Button>
                    </form>
                    <br />
                    <br />
                    <Typography color="white">Enviaremos en breve un mail al correo electronico asociado a este usuario para que pueda reiniciar su contraseña
                    </Typography>
                    <br />
                    <Typography color="white">¿No tiene su cuenta aun?
                        <br />
                        <Link href="/register">
                            Registrarse
                        </Link>
                    </Typography>
                </div>
            </Grid>
            <Grid className={Styles.box1} align="left" xs={4} md={4} order={{ xs: 2, md: 1 }} direction="column">
                <div>
                    <br />
                    <div className={Styles.boxImg}>
                        <img className={Styles.imgSize} src={Icono} alt="IconoSection1" />
                    </div>
                    <div className={Styles.textoAthena}>
                        <h1>Bienvenido a MovieVerse</h1>
                        <p>Descubre el mejor sitio web de películas y series. Crea listas personalizadas de tus películas y series favoritas, las que has visto y las que tienes pendientes. Explora las tendencias, estrenos y mucho más. ¡Únete a MovieVerse y encuentra tu próximo gran entretenimiento!</p>
                    </div>
                </div>
                <div className={Styles.footer}></div>
            </Grid>
        </Grid>
    );
}

export default Recovery;
