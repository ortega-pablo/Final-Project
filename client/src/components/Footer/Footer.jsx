// import React from "react";
// import { Link } from "react-router-dom";
// import styles from './Footer.module.css';
// import { Container } from "@mui/material";
// import 

// export const Footer = () => {
//     return(
//         <div className={styles.footContainer}> 
//             <h6>Empresa copada</h6>
//             <p>Copyright © 2022 Empresa copada, Todos los derechos reservados.</p>
//             <p> Sobre Nosotros</p>
//         </div>
//     )
// }
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="#E8E9F2">
      {'Copyright © '}
      <Link color="inherit" href="/about">
        Empresa copada
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        
      }}
    >
    <CssBaseline />
    <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#494545',
          color: '#E8E9F2'
        }}
    >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Todos los derechos reservados
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
