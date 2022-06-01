import { useSelect } from "@mui/base";
import { Box, Link, ListItem, ListItemAvatar, Typography } from "@mui/material";
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
     <Typography sx={{mt:"15px" , mb:"15px"}} variant="h3" >Panel de preguntas</Typography>
      {allAskForAllProducts?.map((p) => {
        const prod = allProducts.find((pr) => pr.id === p.id);

        return (
          <>
            <Box  sx={{display:"flex", justifyContent:"space-between", width:"65%"}}  >
                <Typography sx={{maxWidth:"20%"}} variant="h5">
              <Link underline="none" variant="subtitle2" href={"/detail/"+p?.id} >
                  {p?.name}
              </Link>
                </Typography>
              <img src={prod?.images[0]?.urlFile} width="75" alt="" />
              <img src={prod?.images[1]?.urlFile} width="75" alt="" />
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
                <Typography>
                  Stock actual: {prod?.productInventory?.quantity}
                </Typography>
              )}
            </Box>
                <Box   sx={{width:"55%"}}>
            {p?.asks?.map((preg) => {
              // var fechaStart = new Date(preg.createdAt);
              // let fechaEnd = Date.now()
              // let elapsed = fechaEnd.getTime() - fechaStart.getTime()
              // // console.log(elapsed)
              // console.log(Date.now())
           
                let day1 = new Date(preg.createdAt);
                let day2 = new Date();
                console.log(day1)
                console.log(day2)
                let difference = day2.getTime()-day1.getTime();
              console.log(difference)
   

              return (
                <>
                  <Typography component="h3" variant="h5">
                    Pregunta: {preg?.content}
                  </Typography>

                      {difference < 3.54e+6 ?    
                   <Typography component="h6" variant="h6">
                    Hace {  Math.round(difference / 60000)   } minutos
                  </Typography> :   (  difference >= 3.54e+6 && difference < 8.64e+7  )   ?
                   <Typography component="h6" variant="h6">
                    Hace {  Math.round(difference / 3.6e+6)   } horas
                  </Typography> :  
                   <Typography component="h6" variant="h6">
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

                  <hr />
                </>
              );
            })}
              </Box>
            <NuevaPregunta idProduc={p.id} />
          </>
        );
      })}
    </>
  );
};
