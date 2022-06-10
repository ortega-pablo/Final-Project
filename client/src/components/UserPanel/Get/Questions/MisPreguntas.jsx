import { useSelect } from "@mui/base";
import { Box, Link, ListItem, ListItemAvatar, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import {
  getAsksForAllProductsOneUser,
  getDetailOneUsers,
  getProducts,
  getUserIdByToken,
} from "../../../../redux/actions";
import { NuevaPregunta } from "./NuevaPregunta";
import { DeleteAsk } from "../../../AdminPanel/DeleteAsk";
import { TypographyMenu } from "../../../../personalizadTheme";

export const MisPreguntas = () => {
  const dispatch = useDispatch();

  const userid = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState("");
  useEffect(() => {
    dispatch(getUserIdByToken(userid))
      .then((r) => r)
      .then((r) => dispatch(getDetailOneUsers(r)));
  }, [render]);

  const user = useSelector((state) => state.getDetailOneUser);
  const allProducts = useSelector((state) => state.products);
  const asks = user?.asks;

  // const allAsk = useSelector(state=> state.allAsk)

  useEffect(() => {
    dispatch(getProducts());

    dispatch(getUserIdByToken(userid))
      .then((r) => r)
      .then((r) => dispatch(getAsksForAllProductsOneUser(r)));
  }, [dispatch]);

  const allAskForAllProducts = useSelector((state) => state.userAskAllProducs);
  //  const askForUser = allAsk?.filter( p => p.userId === userid)

  return (
    <>
     <Typography sx={{mt:4 , mb:4}} variant="h3" color="darkgrey.main" >Panel de preguntas</Typography>
      {allAskForAllProducts?.map((p) => {
        const prod = allProducts.find((pr) => pr.id === p.id);

        return (
          <Paper sx={{width:"100%"}}>
            <Box  sx={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center", pt:3}}  > 
              <Link underline="none" href={"/detail/"+p?.id} >
                  <TypographyMenu variant="h4">{p?.name}</TypographyMenu> 
              </Link>
              <img src={prod?.images[0]?.urlFile} width={280} alt={p.name} />
              <h2>$ {p?.price} </h2>
              {prod?.discounts?.map((d) => {
                return (
                  <>
                    {d.active && (
                      <h3>
                        {" "}
                        {d.name} : - {d.discountPercent} %{" "}
                      </h3>
                    )}
                  </>
                );
              })}

              {prod?.productInventory?.quantity === 0 ? (
                <Typography>¡Sin stock! </Typography>
              ) : (
                <Typography color="darkGrey.main">
                  Stock actual:{prod?.productInventory?.quantity}
                </Typography>
              )}
            {p?.asks?.map((preg) => {
              // var fechaStart = new Date(preg.createdAt);
              // let fechaEnd = Date.now()
              // let elapsed = fechaEnd.getTime() - fechaStart.getTime()
              // // console.log(elapsed)
              // console.log(Date.now())
           console.log(preg)
                let day1 = new Date(preg.createdAt);
                let day2 = new Date();
              
                let difference = day2.getTime()-day1.getTime();
              
   

              return (
                <Paper elevation={12} sx={{width:"80%", p:3, mt:2}} >
                  <Typography component="h3" variant="h5">
                  {preg?.content}
                  </Typography>

                      {difference < 3.54e+6 ?    
                   <Typography component="h6" variant="body2" color="darkGrey.main">
                    Hace {  Math.round(difference / 60000)   } minutos
                  </Typography> :   (  difference >= 3.54e+6 && difference < 8.64e+7  )   ?
                   <Typography component="h6" variant="body2" color="darkGrey.main">
                    Hace {  Math.round(difference / 3.6e+6)   } horas
                  </Typography> :  
                   <Typography component="h6" variant="body2" color="darkGrey.main">
                   Hace {  Math.round(difference / 8.64e+7)   } dias
                 </Typography>
                    }

                  <ListItem>
                    <ListItemAvatar>
                      <SubdirectoryArrowRightIcon />
                    </ListItemAvatar>
                    {preg?.answer?.content ? (
                      <Typography component="h3" variant="h5">
                        Respuesta: {preg?.answer?.content}
                      </Typography>
                    ) : (
                      <Typography component="h3" variant="h5">
                        ...Esperando la respuesta
                      </Typography>
                    )}
                  </ListItem>
                  <DeleteAsk askId={preg.id}  setRender={setRender}/>
                  <hr />
                </Paper>
              );
            })}
            <NuevaPregunta idProduc={p.id} />
            </Box>
          </Paper>
        );
      })}
    </>
  );
};
