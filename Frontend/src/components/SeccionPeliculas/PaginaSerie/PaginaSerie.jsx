import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Styles from "./PaginaSerie.module.css";
import { Grid, Button, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/material";

const qs = require('qs');

function PaginaSerie({user, setUser}) {
  const { id } = useParams();

  const [serie, setSerie] = useState(null);

  useEffect(() => {
    const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=es`;

    const fetchSerie = async () => {
      try {
        const resp = await axios.get(url);
        setSerie(resp.data);
      } catch (error) {
        console.error("Error al obtener la información de la serie:", error);
      }
    };

    fetchSerie();
  }, [id]);

  const handleClickPorVer = (text) => {
    if (serie) {
      let data = qs.stringify({
        'email': user[0],
        'id': serie.id,
        'media_type': 'tv'
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
    if (serie) {
      let data = qs.stringify({
        'email': user[0],
        'id': serie.id,
        'media_type': 'tv'
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/api/users/favoritas',
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

  const handleClickVistas = (text) => {
    if (serie) {
      let data = qs.stringify({
        'email': user[0],
        'id': serie.id,
        'media_type': 'tv'
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
          {serie ? (
            <div>
              {serie.backdrop_path ? (
                <img
                  className={Styles.imagen}
                  src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                  alt="Portada Serie"
                />
              ) : (
                <img
                  className={Styles.imagen}
                  src={`https://image.tmdb.org/t/p/w500/${serie.backdrop_path}`}
                  alt="Portada Serie"
                />
              )}
            </div>
          ) : (
            <p>No se encontró información para el ID proporcionado.</p>
          )}
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6}>
          {serie ? (
            <div>
              <h1 className={Styles.Title}>Título: {serie.name}</h1>
              <p className={Styles.Cuerpo}>
                Género:{" "}
                {serie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className={Styles.Cuerpo}>
                Director:{" "}
                {serie.created_by.length > 0
                  ? serie.created_by.map((creator) => creator.name).join(", ")
                  : "No disponible"}
              </p>
              <p className={Styles.Cuerpo}>
                Año: {serie.first_air_date && serie.first_air_date.substring(0, 4)}
              </p>
              <p className={Styles.Cuerpo}>
                Temporadas: {serie.number_of_seasons}
              </p>
              <p className={Styles.Cuerpo}>
                Episodios: {serie.number_of_episodes}
              </p>
              <p className={Styles.Cuerpo}>
                Idioma original: {serie.original_language}
              </p>
              <p className={Styles.Cuerpo}>Descripción: {serie.overview}</p>
            </div>
          ) : (
            <p>No se encontró información para el ID proporcionado.</p>
          )}
        </Grid>
        <Grid item xs={12} direction="column">
          <Stack align="center" direction="row" className={Styles.cajaBotones}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={Styles.marginTop2}
              onClick={() => handleClickPorVer("Se agregó a la lista de POR VER")}
            >
              Agregar a Por Ver
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={Styles.marginTop2}
              onClick={() => handleClickFavoritas("Se agregó a la lista de FAVORITAS")}
            >
              Agregar a Favoritas
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={Styles.marginTop2}
              onClick={() => handleClickVistas("Se agregó a la lista de VISTAS")}
            >
              Agregar a Vistas
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default PaginaSerie;
