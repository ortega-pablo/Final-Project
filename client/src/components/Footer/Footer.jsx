import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { textAlign } from '@mui/system';


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
    <footer>
    <Box
      sx={{
        mt:"auto",
        position:"end",
        width: "100%",
        textAlign: "center",
      }}
    >
    <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          m: 0,
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
    </footer>
  );
}
