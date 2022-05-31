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
{
  function difference(date1, date2) {  
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
     const day = 1000*60*60;
     console.log(date2utc)
    return(date2utc - date1utc)/day


  }
  
  var date1 = new Date(),
        date2 = new Date(preg.createdAt),
        time_difference = difference(date1,date2)
        console.log(time_difference)
        console.log(date1)
        console.log(date2)

}





              return (
                <>
                  <Typography component="h3" variant="h5">
                    Pregunta: {preg?.content}
                  </Typography>
                  <Typography component="h4" variant="h6">
                    Hace {time_difference * -1} dias
                  </Typography>
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
