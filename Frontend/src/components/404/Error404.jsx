import React from 'react';
import styled from 'styled-components';

// Estilos para el contenedor principal
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// Estilos para el mensaje de error
const ErrorMessage = styled.h1`
  font-size: 24px;
  color: #f00; /* Color rojo */
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorMessage>404 - Página no encontrada</ErrorMessage>
    </NotFoundContainer>
  );
};

export default NotFound;