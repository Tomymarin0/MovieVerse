import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabla from '../Tabla/Tabla';

const qs = require('qs');

const PeliculasPorVer = ({ user }) => {
  const [data, setData] = useState([]);
  const titulo = "Peliculas y Series Por Ver";

  useEffect(() => {
    const fetchData = async () => {
      let data = qs.stringify({
        'email': user[0] 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/api/users/porver/get',
        headers: { 
          'x-access-token': user[2], 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    };

    fetchData();
  }, [user]); // Dependencia de useEffect para que se vuelva a ejecutar cuando cambie 'user'

  return (
    <>
      <Tabla titulo={titulo} data={data.favoritas} user={user} tipolista={"porver"}/>
    </>
  );
};

export default PeliculasPorVer;
