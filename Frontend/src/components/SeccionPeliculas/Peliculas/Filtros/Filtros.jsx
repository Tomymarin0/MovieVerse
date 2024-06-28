import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, MenuItem } from "@mui/material";
import Styles from "../Peliculas.module.css";
import axios from "axios";

const Filtros = ({ setFiltros, filtrarPeliculas, getMovieData, setFiltering }) => {
  const [open, setOpen] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroDirector, setFiltroDirector] = useState("");
  const [filtroActor, setFiltroActor] = useState("");
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroIdioma, setFiltroIdioma] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtrosChanged, setFiltrosChanged] = useState(false);
  const [generos, setGeneros] = useState([]);
  const [idiomas, setIdiomas] = useState([]); 

  useEffect(() => {
    obtenerGeneros();
    obtenerIdiomas();
  }, []);

  async function obtenerGeneros() {
    try {
      const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
      const url = `https://api.themoviedb.org/3/genre/movie/list?language=es-ES&api_key=${apiKey}`;
      const resp = await axios.get(url);
      setGeneros(resp.data.genres);
    } catch (error) {
      console.error("Error al obtener los géneros de películas:", error);
    }
  }

// Función para obtener la lista de idiomas de películas desde TMDb
async function obtenerIdiomas() {
  try {
    const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
    const url = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`;
    const resp = await axios.get(url);
    const idiomasData = resp.data;

    // Ordenar los idiomas alfabéticamente por nombre en inglés
    idiomasData.sort((a, b) => a.english_name.localeCompare(b.english_name));

    setIdiomas(idiomasData);
  } catch (error) {
    console.error("Error al obtener los idiomas de películas:", error);
  }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltros({ titulo: filtroNombre, director: filtroDirector, actor: filtroActor, anio: filtroAnio, idioma: filtroIdioma, genero: filtroGenero });
    setFiltrosChanged(true);
    setFiltering(true);
    setOpen(false);
  };

  const handleLimpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroDirector("");
    setFiltroActor("");
    setFiltroAnio("");
    setFiltroIdioma("");
    setFiltroGenero("");
    setFiltros({ titulo: "", director: "", actor: "", anio: "", idioma: "", genero: "" });
    setOpen(false);
    setFiltering(false);
    getMovieData();
  };

  useEffect(() => {
    if (filtrosChanged) {
      filtrarPeliculas();
      setFiltrosChanged(false);
    }
  }, [filtrosChanged, filtrarPeliculas]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div className={Styles.filterButton}>
      <Button onClick={handleClickOpen} variant="contained" color="primary">Filtrar</Button>
      <br/><br/>
      <Button onClick={handleLimpiarFiltros} variant="contained" color="primary">Limpiar filtros</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: "black", borderWidth: 3, borderRadius: 0, borderColor: "#1B6DC1", borderStyle: "solid" } }}>
        <DialogTitle color="white">Filtros</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }} onSubmit={handleSubmit}>
            <div className={Styles.filterBox}>
              <div className={Styles.individualBox}>
                <TextField style={{ width: 250 }} label="Título" inputProps={{ style: { color: "white" } }} focused margin="normal" placeholder="Buscar por Título" value={filtroNombre} onChange={(e) => setFiltroNombre(e.target.value)} />
              </div>
              <div className={Styles.individualBox}>
                <TextField style={{ width: 250 }} label="Director" inputProps={{ style: { color: "white" } }} focused margin="normal" placeholder="Director" value={filtroDirector} onChange={(e) => setFiltroDirector(e.target.value)} />
              </div>
              <div className={Styles.individualBox}>
                <TextField style={{ width: 250 }} label="Actor/Actriz" inputProps={{ style: { color: "white" } }} focused margin="normal" placeholder="Actor/Actriz" value={filtroActor} onChange={(e) => setFiltroActor(e.target.value)} />
              </div>
              <div className={Styles.individualBox}>
                <TextField style={{ width: 250 }} label="Año" inputProps={{ style: { color: "white" } }} focused margin="normal" placeholder="Año" value={filtroAnio} onChange={(e) => setFiltroAnio(e.target.value)} />
              </div>
              <div className={Styles.individualBox}>
                <TextField
                  style={{ width: 250 }}
                  select
                  label="Idioma"
                  InputLabelProps={{ style: { color: "#1B6DC1" } }}
                  SelectProps={{
                    style: { color: "white" }
                  }}
                  focused
                  margin="normal"
                  placeholder="Idioma"
                  inputProps={{ style: { color: "gray" } }}
                  value={filtroIdioma}
                  onChange={(e) => setFiltroIdioma(e.target.value)}
                >
                  <MenuItem value="">Todos los idiomas</MenuItem>
                  {idiomas.map((idioma) => (
                    <MenuItem key={idioma.iso_639_1} value={idioma.iso_639_1}>{idioma.english_name}</MenuItem>
                  ))}
                </TextField>
              </div>

              <div className={Styles.individualBox}>
                <TextField
                  style={{ width: 250 }}
                  select
                  label="Género"
                  InputLabelProps={{ style: { color: "#1B6DC1" } }}
                  SelectProps={{ style: { color: "white" } }}
                  focused
                  margin="normal"
                  placeholder="Género"
                  inputProps={{ style: { color: "gray" } }}
                  value={filtroGenero}
                  onChange={(e) => setFiltroGenero(e.target.value)}
                >
                  <MenuItem value="">Todos los géneros</MenuItem>
                  {generos.map((genero) => (
                    <MenuItem key={genero.id} value={genero.id}>{genero.name}</MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Filtros;
