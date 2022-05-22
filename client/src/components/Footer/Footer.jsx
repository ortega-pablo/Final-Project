import * as React from 'react';
import {Box, Typography, Container, Link} from '@mui/material';


function Copyright() {
  return (
    <Typography variant="body1" color="text.disabled">
      {'Copyright © '}
      <Link color="inherit" href="/about">
        EXMINE
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
          backgroundColor: 'ambar6.main',
          color: '#E8E9F2'
        }}
    >
        <Container maxWidth="sm">
          <Typography variant="body1" color="text.disabled" >
            Todos los derechos reservados
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
    </footer>
  );
}
