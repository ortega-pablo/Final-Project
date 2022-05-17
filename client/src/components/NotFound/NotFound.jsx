import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box, Link } from "@material-ui/core";
import { Footer } from "../Footer/Footer";

export function NotFound() {
  return (
    <>
      <Box>
        <Card sx={{ maxWidth: 345, m: "auto", mt: 35, mb:34.2 ,opacity: 0.6 }}>
          <CardActionArea href="/">
            <Typography gutterBottom variant="h5" component="div">
              Pagina no encontrada
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image='https://www.trecebits.com/wp-content/uploads/2020/11/Error-404.jpg'
              alt="green iguana"
            />
            <CardContent></CardContent>
          </CardActionArea>
          <CardActions>
            <Link href="/">
              <Button size="small" color="primary">
                Ir al home
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
      <Footer/>
    </>
  );
}
