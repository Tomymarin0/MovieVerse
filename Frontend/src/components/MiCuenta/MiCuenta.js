import React from 'react';
import { Grid} from '@mui/material';
import Icono from "../../Imagenes/logomv.png";
import Styles from"../Login/login.module.css"
import MiCuentaForm from './Forms/MiCuentaForm';


const MiCuenta=({user, setUser}) =>{


    return (
        <Grid marginBlock="auto" align="center" container spacing={2}>
            <Grid className={Styles.box2} align="center" xs={7} md={6} order={{ xs: 2, md: 1 }} direction="column">
                <MiCuentaForm user={user} setUser={setUser}/>
            </Grid>
            <Grid className={Styles.box1} align="left" xs={4} md={4} order={{ xs: 2, md: 1 }} direction="column">
                <div>
                    <br/>
                    <div className={Styles.boxImg}>
                        <img className={Styles.imgSize} src= {Icono} alt ="IconoSection1"/>
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

export default MiCuenta;