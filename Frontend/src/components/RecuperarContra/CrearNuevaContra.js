import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Grid, TextField, Typography, Link, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Icono from "../../Imagenes/logomv.png";
import Styles from "../Login/login.module.css";
import axios from "axios";

const qs = require('qs');

const NuevaContraseña = () => {
    const navigate = useNavigate();
    const avatarStyle = { backgroundColor: '#1B6DC1' }
    const [contraseña, setContraseña] = useState("");
    const [contraseñaConfirm, setContraseñaConfirm] = useState("");
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        const emailParam = urlParams.get('email');

        if (tokenParam && emailParam) {
            setToken(tokenParam);
            setEmail(emailParam);

        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contraseña === contraseñaConfirm) {
            let data = qs.stringify({
                'email': email,
                'password': contraseña 
              });
              
              let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://localhost:4000/api/users/update',
                headers: { 
                  'x-access-token': token, 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
              };
              
              axios.request(config)
              .then((response) => {
                alert(JSON.stringify(response.data));
              })
              .catch((error) => {
                console.log(error);
              });
            
            navigate("/login");
        } else {
            alert("Las contraseñas no coinciden")
        }
    }

    return (
        <Grid marginBlock="auto" align="center" container spacing={2}>
            <Grid className={Styles.box2} align="center" xs={8} md={6} order={{ xs: 2, md: 1 }} direction="column">
                <div elevation={20} className={Styles.paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        <Typography variant="h5" gutterBottom color="white">Crear nueva contraseña</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="Ingresar Contraseña" inputProps={{ style: { color: "white" } }} focused type="password" placeholder="Ingresar contraseña" margin="normal" required value={contraseña} onChange={e => setContraseña(e.target.value)} />
                        <TextField fullWidth label="Confirmar contraseña" inputProps={{ style: { color: "white" } }} focused type="password" placeholder="Confirmar contraseña" margin="normal" required value={contraseñaConfirm} onChange={e => setContraseñaConfirm(e.target.value)} />
                        <br />
                        <br />
                        <Button align="center" type="submit" variant="contained" color="primary">Confirmar</Button>
                    </form>

                    <br />
                    <Typography color="white"> ¿No tiene su cuenta aún?
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
                <div className={Styles.footer}>
                </div>
            </Grid>
        </Grid>
    );
}

export default NuevaContraseña;
