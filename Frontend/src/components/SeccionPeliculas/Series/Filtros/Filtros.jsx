import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, MenuItem } from "@mui/material";
import Styles from "../Series.module.css"; 
import axios from "axios";

const Filtros = ({ setFiltros, filtrarSeries, getSerieData, setFiltering }) => {
  const [open, setOpen] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtrosChanged, setFiltrosChanged] = useState(false);
  const [generos, setGeneros] = useState([]);


  useEffect(() => {
    obtenerGeneros();

  }, []);

  async function obtenerGeneros() {
    try {
      const apiKey = "c1959a2ceb233c37478df284ffc8c2a8";
      const url = `https://api.themoviedb.org/3/genre/tv/list?language=es-ES&api_key=${apiKey}`; 
      const resp = await axios.get(url);
      setGeneros(resp.data.genres);
    } catch (error) {
      console.error("Error al obtener los géneros de series:", error);
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltros({ titulo: filtroNombre, anio: filtroAnio, genero: filtroGenero });
    setFiltrosChanged(true);
    setFiltering(true);
    setOpen(false);
  };

  const handleLimpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroAnio("");
    setFiltroGenero("");
    setFiltros({ titulo: "", anio: "", genero: "" });
    setOpen(false);
    setFiltering(false);
    getSerieData();
  };

  useEffect(() => {
    if (filtrosChanged) {
      filtrarSeries();
      setFiltrosChanged(false);
    }
  }, [filtrosChanged, filtrarSeries]);

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
                <TextField style={{ width: 250 }} label="Año" inputProps={{ style: { color: "white" } }} focused margin="normal" placeholder="Año" value={filtroAnio} onChange={(e) => setFiltroAnio(e.target.value)} />
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
