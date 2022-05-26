import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, } from "@mui/material";
import CartModal from "../Cart/CartModal";

export default function MultiActionAreaCard({
  name,
  price,
  brand,
  thumbnail,
  images,
  id
}) {
  return (
    <Card elevation={3} sx={{ alignItems:"center", width: 200, hover: "true"}}>
      <CardActionArea href={"/detail/" + id} sx={[
    {maxHeight:'360px',
    minHeight:'360px',
    backgroundColor: "#D1C6B7",
      },
      
    /*
    #D1C2B0
    #D1C6B7
    main: "#DFDCD3",
    main: "#DEA03C",
    main: "#B6893E",
    main: "#8F7241",
    main: "#685C44",
    main: "#473F2E",
  */
    {
      '&:hover': {
        transform: "scale(1.05)",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.6)",
        transitionDuration: "1s",
        
      },
    }
  ]}>        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{mb:'auto'}}>
            {name}
          </Typography>
          <CardMedia
            component="img"
            height="140"
            image={images[0]?.urlFile}
            alt="green iguana"
          />
          <Typography gutterBottom variant="h6" component="div" sx={{mb:'auto'}}>Precio: {"$"}{price}</Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{mb:'auto'}}>Marca: {brand}</Typography>
        </CardContent>
      </CardActionArea>
      <CartModal id={id}/>
    </Card>
  );
}
