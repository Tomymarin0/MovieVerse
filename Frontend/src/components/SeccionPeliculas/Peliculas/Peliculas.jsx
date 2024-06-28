import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Styles from "./Peliculas.module.css";
import Filtros from "./Filtros/Filtros";
import axios from "axios";

function Peliculas() {
  const navigate = useNavigate();
  const [peliculas, setPeliculas] = useState([]);
  const [filtros, setFiltros] = useState({
    titulo: "",
    genero: "",
    actor: "",
    director: "",
    idioma: "",
    anio: ""
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    const savedFiltros = JSON.parse(localStorage.getItem("filtros"));
    const savedPeliculas = JSON.parse(localStorage.getItem("peliculas"));
    const savedPage = JSON.parse(localStorage.getItem("page"));
    const savedTotalPages = JSON.parse(localStorage.getItem("totalPages"));

    if (savedFiltros && savedPeliculas) {
      setFiltros(savedFiltros);
      setPeliculas(savedPeliculas);
      setPage(savedPage);
      setTotalPages(savedTotalPages);
      setFiltering(true);
    } else {
      getMovieData();
    }
  }, []);

  useEffect(() => {
    if (filtering) {
      filtrarPeliculas();
    } else {
      getMovieData();
    }
  }, [page, filtering]);

  async function getMovieData() {
    try {
      const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`;
      const resp = await axios.get(url);
      const newMovies = resp.data.results;

      if (page === 1) {
        setPeliculas(newMovies.slice(0, 18));
        setTotalPages(resp.data.total_pages);
      } else {
        setPeliculas((prevMovies) => [...prevMovies, ...newMovies.slice(0, 18)]);
      }
    } catch (error) {
      console.error("Error al obtener datos de películas:", error);
    }
  }

  const toggleFiltering = (value) => {
    setFiltering(value);
    setPage(1);
  };

  async function filtrarPeliculas() {
    try {
      const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
      let url;
      let params = {
        api_key: apiKey,
        language: "en-US",
        include_adult: false,
        include_video: false,
        page: 1,  
        sort_by: "popularity.desc"
      };

      if (filtros.titulo) {
        url = `https://api.themoviedb.org/3/search/movie`;
        params.query = filtros.titulo;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie`;

        if (filtros.director) {
          const directorUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(filtros.director)}`;
          const directorResp = await axios.get(directorUrl);
          const directorId = directorResp.data.results.length > 0 ? directorResp.data.results[0].id : null;
          if (directorId) {
            params.with_crew = directorId;
          }
        }

        if (filtros.actor) {
          const actorUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(filtros.actor)}`;
          const actorResp = await axios.get(actorUrl);
          const actorId = actorResp.data.results.length > 0 ? actorResp.data.results[0].id : null;
          if (actorId) {
            params.with_cast = actorId;
          }
        }

        if (filtros.genero) {
          params.with_genres = filtros.genero;
        }

        if (filtros.anio) {
          params.primary_release_year = filtros.anio;
        }

        if (filtros.idioma) {
          params.language = filtros.idioma;
        }
      }

      const resp = await axios.get(url, { params });
      const peliculasFiltradas = resp.data.results;

      setPeliculas(peliculasFiltradas.slice(0, 18));
      setTotalPages(resp.data.total_pages);
      localStorage.setItem("peliculas", JSON.stringify(peliculasFiltradas.slice(0, 18)));
      localStorage.setItem("totalPages", JSON.stringify(resp.data.total_pages));

      if (peliculasFiltradas.length === 0) {
        alert("No se encontraron coincidencias");
        setFiltering(false);
        getMovieData();
      }

    } catch (error) {
      console.error("Error al filtrar películas:", error);
    }
  }

  const handleFilterSubmit = () => {
    toggleFiltering(true);
    const filters = {
      titulo: filtros.titulo,
      director: filtros.director,
      actor: filtros.actor,
      anio: filtros.anio,
      idioma: filtros.idioma,
      genero: filtros.genero !== "" ? filtros.genero : null
    };
    setFiltros(filters);
    localStorage.setItem("filtros", JSON.stringify(filters));
    setPeliculas([]);  
    setTotalPages(null);  
    setPage(1);  
    filtrarPeliculas();
  };

  const handleClick = (movieId) => {
    localStorage.setItem("filtros", JSON.stringify(filtros));
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    localStorage.setItem("page", JSON.stringify(page));
    localStorage.setItem("totalPages", JSON.stringify(totalPages));
    navigate(`/paginapelicula/${movieId}`);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <br />
      <Filtros
        setFiltros={setFiltros}
        filtrarPeliculas={handleFilterSubmit}
        getMovieData={getMovieData}
        setFiltering={setFiltering}
      />
      <br />
      <div className={Styles.containerCards}>
        {peliculas.map((pelicula, index) => (
          <div key={index} className={Styles.stylesCard}>
            <div className={Styles.divPoster}>
              {pelicula.poster_path && (
                <img
                  className={Styles.poster}
                  src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                  alt="Portada de la película"
                />
              )}
            </div>
            <div className={Styles.divTitle}>
              {pelicula.title && (
                <h1 className={Styles.cardTitle}> {pelicula.title}</h1>
              )}
            </div>
            <div className={Styles.ButtonDiv}>
              <br />
              <Button
                onClick={() => handleClick(pelicula.id)}
                variant="contained"
                color="primary"
              >
                Ver Más
              </Button>{" "}
            </div>
          </div>
        ))}
      </div>
      {!filtering && totalPages && page < totalPages && (
        <div className={Styles.loadMoreButton}>
          <Button
            onClick={handleLoadMore}
            variant="contained"
            color="primary"
          >
            Cargar más
          </Button>
        </div>
      )}
    </>
  );
}

export default Peliculas;
