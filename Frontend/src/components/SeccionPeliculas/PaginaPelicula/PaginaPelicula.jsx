import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Styles from "./PaginaPelicula.module.css";
import { Grid, Button, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/material";

const qs = require('qs');

function PaginaPelicula({user, setUser}) {
  const { id } = useParams();

  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
    const peliculaUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;

    const fetchPelicula = async () => {
      try {
        // Obtener información básica de la película
        const [peliculaResp, creditsResp] = await Promise.all([
          axios.get(peliculaUrl),
          axios.get(creditsUrl)
        ]);

        const peliculaData = peliculaResp.data;
        const creditsData = creditsResp.data;

        // Encontrar al director dentro de los créditos
        const director = creditsData.crew.find(person => person.job === "Director");

        // Actualizar el estado de la película con el nombre del director y el tipo de medio
        setPelicula({
          ...peliculaData,
          director: director ? director.name : "No disponible",
          media_type: "movie" 
        });

      } catch (error) {
        console.error("Error al obtener la información de la película:", error);
      }
    };

    fetchPelicula();
  }, [id]);


  const handleClickPorVer = (text) => {
    if (pelicula) {
      let data = qs.stringify({
        'email': user[0],
        'id': pelicula.id,
        'media_type': pelicula.media_type 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/api/users/porver',
        headers: { 
          'x-access-token': user[2], 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios.request(config)
      .then(() => {
        alert(text);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    }
    return ;
  };


  const handleClickFavoritas = (text) => {
    if (pelicula) {
      let data = qs.stringify({
        'email': user[0],
        'id': pelicula.id,
        'media_type': pelicula.media_type 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/api/users/favoritas',
        headers: { 
          'x-access-token': user[2], 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios.request(config)
      .then(() => {
        alert(text);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    }
    return ;
  };

  const handleClickVistas = (text) => {
    if (pelicula) {
      let data = qs.stringify({
        'email': user[0],
        'id': pelicula.id,
        'media_type': pelicula.media_type 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/api/users/vistas',
        headers: { 
          'x-access-token':  user[2], 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios.request(config)
      .then(() => {
        alert(text);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    }
    return ;
  };

  // Verificar el tamaño de la pantalla
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <>
      <Grid align="center" container spacing={0}>
        {/* Usar xs={12} cuando la pantalla es chica */}
        <Grid item xs={isSmallScreen ? 12 : 6} direction="column">
          {pelicula ? (
            <div>
              {pelicula.backdrops && pelicula.backdrops.length > 0 && pelicula.backdrops.some(backdrop => backdrop.aspect_ratio > 1.0) ? (
                <img className={Styles.imagen} src={`https://image.tmdb.org/t/p/w500/${pelicula.backdrops.find(backdrop => backdrop.aspect_ratio > 1.0).file_path}`} alt="Portada Pelicula"/>
              ) : (
                <img className={Styles.imagen} src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt="Portada Pelicula"/>
              )}
            </div>
          ) : (
            <p>No se encontró información para el ID proporcionado.</p>
          )}
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6}>
          {pelicula ? (
            <div>
              <h1 className={Styles.Title}>Título: {pelicula.title}</h1>
              <p className={Styles.Cuerpo}>Género: {pelicula.genres.map(genre => genre.name).join(", ")}</p>
              <p className={Styles.Cuerpo}>
                Director: {pelicula.director}
              </p>
              <p className={Styles.Cuerpo}>
                Año: {pelicula.release_date && pelicula.release_date.substring(0, 4)}
              </p>
              <p className={Styles.Cuerpo}>Duración: {pelicula.runtime} minutos</p>
              <p className={Styles.Cuerpo}>Idioma original: {pelicula.original_language}</p>
              <p className={Styles.Cuerpo}>Descripción: {pelicula.overview}</p>
            </div>
          ) : (
            <p>No se encontró información para el ID proporcionado.</p>
          )}

        </Grid>
        <Grid item xs={12} direction="column">
          <Stack align="center" direction="row" className={Styles.cajaBotones}>
            <Button type="submit" variant="contained" color="primary" className={Styles.marginTop2} onClick={() => handleClickPorVer("Se agrego a la lista de POR VER")}>
              Agregar a Por Ver
            </Button>
            <Button type="submit" variant="contained" color="primary" className={Styles.marginTop2} onClick={() => handleClickFavoritas("Se agrego a la lista de FAVORITAS")}>
              Agregar a Favoritas
            </Button>
            <Button type="submit" variant="contained" color="primary" className={Styles.marginTop2} onClick={() => handleClickVistas("Se agrego a la lista de VISTAS")}>
              Agregar a Vistas
            </Button>   
          </Stack>  
        </Grid>  

      </Grid>
      
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  );
}

export default PaginaPelicula;
