import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { CssBaseline } from '@mui/material';

// NO BORRAR CSS BASELINE, Parece un tag perdido, pero si la sacamos rompe

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
        bottom: 0,
        width: 1,
        textAlign: 'center',
      }}
    >
    <CssBaseline/>
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
  );
}
