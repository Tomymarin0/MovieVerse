import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Styles from "./Series.module.css"; 
import Filtros from "./Filtros/Filtros";
import axios from "axios";

function Series() {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
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
    const savedFiltros = JSON.parse(localStorage.getItem("series_filtros"));
    const savedSeries = JSON.parse(localStorage.getItem("series"));
    const savedPage = JSON.parse(localStorage.getItem("series_page"));
    const savedTotalPages = JSON.parse(localStorage.getItem("series_totalPages"));

    if (savedFiltros && savedSeries) {
      setFiltros(savedFiltros);
      setSeries(savedSeries);
      setPage(savedPage);
      setTotalPages(savedTotalPages);
      setFiltering(true);
    } else {
      getSerieData();
    }
  }, []);

  useEffect(() => {
    if (filtering) {
      filtrarSeries();
    } else {
      getSerieData();
    }
  }, [page, filtering]);

  async function getSerieData() {
    try {
      const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
      const url = `https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&page=${page}&api_key=${apiKey}`;
      const resp = await axios.get(url);
      const newSeries = resp.data.results;

      if (page === 1) {
        setSeries(newSeries.slice(0, 18));
        setTotalPages(resp.data.total_pages);
      } else {
        setSeries((prevSeries) => [...prevSeries, ...newSeries.slice(0, 18)]);
      }
    } catch (error) {
      console.error("Error al obtener datos de series:", error);
    }
  }

  const toggleFiltering = (value) => {
    setFiltering(value);
    setPage(1);
  };

  async function filtrarSeries() {
    try {
      const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
      let url;
      let params = {
        api_key: apiKey,
        language: "en-US",
        page: 1,  // Siempre filtrar desde la primera página
        sort_by: "popularity.desc"
      };

      if (filtros.titulo) {
        url = `https://api.themoviedb.org/3/search/tv`;
        params.query = filtros.titulo;
      } else {
        url = `https://api.themoviedb.org/3/discover/tv`;

        if (filtros.anio) {
          params.first_air_date_year = filtros.anio;
        }

        if (filtros.genero) {
          params.with_genres = filtros.genero;
        }
      }

      const resp = await axios.get(url, { params });
      const seriesFiltradas = resp.data.results;

      if (seriesFiltradas.length > 0) {
        setSeries(seriesFiltradas.slice(0, 18));
        setTotalPages(resp.data.total_pages);
        localStorage.setItem("series", JSON.stringify(seriesFiltradas.slice(0, 18)));
        localStorage.setItem("series_totalPages", JSON.stringify(resp.data.total_pages));
      } else {
        alert("No se encontraron coincidencias");
        setSeries([]);
        setTotalPages(null);
        getSerieData();
      }
    } catch (error) {
      console.error("Error al filtrar series:", error);
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
    localStorage.setItem("series_filtros", JSON.stringify(filters));
    setPage(1); // Restablecer la página a 1 cuando se aplica un filtro
    filtrarSeries();
  };

  const handleClick = (serieId) => {
    localStorage.setItem("series_filtros", JSON.stringify(filtros));
    localStorage.setItem("series", JSON.stringify(series));
    localStorage.setItem("series_page", JSON.stringify(page));
    localStorage.setItem("series_totalPages", JSON.stringify(totalPages));
    navigate(`/paginaserie/${serieId}`);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <br />
      <Filtros
        setFiltros={setFiltros}
        filtrarSeries={handleFilterSubmit}
        getSerieData={getSerieData}
        setFiltering={setFiltering}
      />
      <br />
      <div className={Styles.containerCards}>
        {series.map((serie, index) => (
          <div key={index} className={Styles.stylesCard}>
            <div className={Styles.divPoster}>
              {serie.poster_path && (
                <img
                  className={Styles.poster}
                  src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                  alt="Portada de la serie"
                />
              )}
            </div>
            <div className={Styles.divTitle}>
              {serie.name && (
                <h1 className={Styles.cardTitle}> {serie.name}</h1>
              )}
            </div>
            <div className={Styles.ButtonDiv}>
              <br />
              <Button
                onClick={() => handleClick(serie.id)}
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

export default Series;
