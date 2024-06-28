import React, { useState, useEffect } from 'react';
import '../Tabla/Tabla.css'; 
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const qs = require('qs');

const Tabla = ({ titulo, data , user , tipolista}) => {
  const [rows, setRows] = useState(data); 
  const [detailsList, setDetailsList] = useState([]); // Estado para almacenar los detalles obtenidos
  const navigate = useNavigate(); 

  // useEffect para actualizar rows cuando data cambie
  useEffect(() => {
    setRows(data);
  }, [data]);

  
  const logMediaTypes = async () => {
    if (!rows || rows.length === 0) {
      return;
    }
    const lista = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.media_type === "movie") {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${row.id}`, {
            params: {
              api_key: 'c1959a2ceb233c37478df284ffc8c2a8' 
            }
          });
          const movieDetails = response.data;
          lista.push({ ...movieDetails, media_type: 'movie' });
        } catch (error) {
          console.error(`Error al obtener detalles de la película con ID ${row.id}:`, error);
        }
      } else if (row.media_type === "tv") {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/tv/${row.id}`, {
            params: {
              api_key: 'c1959a2ceb233c37478df284ffc8c2a8' 
            }
          });
          const tvDetails = response.data;
          lista.push({ ...tvDetails, media_type: 'tv' });
        } catch (error) {
          console.error(`Error al obtener detalles de la serie con ID ${row.id}:`, error);
        }
      }
    }
    setDetailsList(lista); // Actualizar el estado con los detalles obtenidos
  };

  // useEffect para ejecutar logMediaTypes cuando el componente carga
  useEffect(() => {
    if (rows && rows.length > 0) {
      logMediaTypes();
    } else {
      setDetailsList([]); 
    }
  }, [rows]); // Ejecutar el efecto cuando rows cambie

  const handleDeleteRow = (detail) => {
    const id = detail.id;
    
    let data = qs.stringify({
      'email': user[0],
      'id': id,
      'media_type': detail.media_type 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:4000/api/users/${tipolista}/delete`, 
      headers: { 
        'x-access-token': user[2], 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      const updatedRows = rows.filter(row => row.id !== id);
      setRows(updatedRows);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleClick = (id, mediaType) => {
    if (mediaType === 'movie') {
      navigate(`/paginapelicula/${id}`);
    } else if (mediaType === 'tv') {
      navigate(`/paginaserie/${id}`);
    }
  };

  return (
    <>
      <br />
      <div align="center">
        <h1 className="Title">{titulo}</h1>
        <br />
      </div>
      <br />
      <div align="center" className="boxTabla">
        <table className="Table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detailsList.map((detail, index) => (
              <tr key={index}>
                <td>
                  <Button
                    variant="text"
                    onClick={() => handleClick(detail.id, detail.media_type)}
                    sx={{ color: 'white' }} 
                  >
                    {detail.title || detail.name}
                  </Button>
                </td>
                <td align="center">
                  <Button
                    className="marginTop2"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteRow(detail)}
                    variant="outlined"
                    color="error"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Tabla;
