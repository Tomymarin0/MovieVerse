import React from "react";
import { Box, Typography, Link } from "@mui/material";


const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: "#1B6DC1",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        fontSize: "1em",
      }}
    >
      <Typography variant="h6" >MovieVerse</Typography>
      <Typography variant="body2">
        © {new Date().getFullYear()} MovieVerse | Todos los derechos reservados
      </Typography>
      <Link href="/" color="inherit" style={{ marginLeft: "10px", marginRight: "10px" }}>
        Política de Privacidad
      </Link>
      <Link href="/" color="inherit">
        Términos y Condiciones
      </Link>
    </Box>
  );
};

export default Footer;
