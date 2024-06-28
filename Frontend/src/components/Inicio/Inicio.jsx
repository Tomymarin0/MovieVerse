import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Styles from "../SeccionPeliculas/Peliculas/Peliculas.module.css";
import axios from "axios";

function Inicio() {
  const navigate = useNavigate();
  const [peliculas, setPeliculas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    getMovieData();
  }, [page]);

  async function getMovieData() {
    try {
      const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
      const timeWindow = "week"; 
      const url = `https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${apiKey}&page=${page}`;

      const resp = await axios.get(url);
      const newMovies = resp.data.results;

      if (page === 1) {
        setPeliculas(newMovies.slice(0, 18));
        setTotalPages(resp.data.total_pages);
      } else {
        setPeliculas((prevMovies) => [
          ...prevMovies,
          ...newMovies.slice(0, 18)
        ]);
      }
    } catch (error) {
      console.error("Error al obtener datos de películas:", error);
    }
  }

  const handleClick = (movieId, mediaType) => {
    if (mediaType === "movie") {
      navigate(`/paginapelicula/${movieId}`);
    } else if (mediaType === "tv") {
      navigate(`/paginaserie/${movieId}`);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <br />
      <h1 className={Styles.cardTitleSection}>TENDENCIAS</h1>
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
              {pelicula.title ? (
                <h1 className={Styles.cardTitle}> {pelicula.title}</h1>
              ) : (
                <h1 className={Styles.cardTitle}> {pelicula.name}</h1>
              )}
            </div>

            <div className={Styles.ButtonDiv}>
              <br />
              <Button
                onClick={() => handleClick(pelicula.id, pelicula.media_type)}
                variant="contained"
                color="primary"
              >
                Ver Más
              </Button>{" "}
            </div>
          </div>
        ))}
      </div>
      {totalPages && page < totalPages && (
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

export default Inicio;
