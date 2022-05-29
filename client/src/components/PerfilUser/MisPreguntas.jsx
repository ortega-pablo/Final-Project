import { useSelect } from "@mui/base";
import { ListItem, ListItemAvatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllAsk,
  getAsksForAllProductsOneUser,
  getProducts,
  getUserIdByToken,
} from "../../redux/actions";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { NuevaPregunta } from "./NuevaPregunta";

export const MisPreguntas = ({ asks, userid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products);
  const [render, setRender] = useState("");
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;


  // const allAsk = useSelector(state=> state.allAsk)

  useEffect(() => {
    dispatch(getProducts());

    dispatch(getUserIdByToken(idToken))
      .then((r) => r)
      .then((r) => dispatch(getAsksForAllProductsOneUser(r)));
  }, [dispatch]);

  const allAskForAllProducts = useSelector((state) => state.userAskAllProducs);
  //  const askForUser = allAsk?.filter( p => p.userId === userid)

  return (
    <>
      <div>MisPreguntas :__</div>
      {allAskForAllProducts?.map((p) => {
        const prod = allProducts.find((pr) => pr.id === p.id);

        return (
          <>
            <Link to={`/detail/${p?.id}`}>
              <Typography component="h1" variant="h5">
                {p?.name}
              </Typography>
            </Link>
            <img src={prod?.images[0]?.urlFile} width="75" alt="" />
            <img src={prod?.images[1]?.urlFile} width="75" alt="" />
            <h2>$ {p?.price} </h2>
            { prod?.discounts?.map( d => {
                return (
                  <>
                  {d.active && 
                  <h3> {d.name} : - {d.discountPercent} % </h3>
                  }
                
                  </>
                  
                )
            })

            }

            {prod?.productInventory?.quantity === 0 ? (
              <Typography>¡Sin stock! </Typography>
            ) : (
              <Typography>
                Stock actual: {prod?.productInventory?.quantity}
              </Typography>
            )}

            {p?.asks?.map((preg) => {
              // var fechaStart = new Date(preg.createdAt);
              // let fechaEnd = Date.now()
              // let elapsed = fechaEnd.getTime() - fechaStart.getTime()
              // // console.log(elapsed)
              // console.log(Date.now())
              return (
                <>
                  <Typography component="h3" variant="h5">
                    Pregunta: {preg?.content}
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

            <NuevaPregunta idProduc={p.id} />
          </>
        );
      })}
    </>
  );
};

// {
//   asks?.map(p => {
//       {let idProd =p.product?.id
//       var prodQue = allProducts.find(p => p.id === idProd)

//       }
//       return (
//           <>
//           <Link  to={`/detail/${prodQue?.id}`  }>
//           <h3>PRODUCTO: {prodQue?.name} </h3>
//           </Link>

// <img src={prodQue?.images[0]?.urlFile} width="75" alt="" />
// <img src={prodQue?.images[1]?.urlFile} width="75" alt="" />
// <h2>$ {prodQue?.price} </h2>

// { prodQue?.productInventory?.quantity === 0 ?
// <h3>¡Sin stock! </h3>  :
// <h2>Stock actual: {prodQue?.productInventory?.quantity}</h2>

// }

//           <h3>Pregunta:{p.content}</h3>

//           <ListItemAvatar>
//             <SubdirectoryArrowRightIcon />
//           <h4>Respuesta: {p.answer?.content}</h4>
//           </ListItemAvatar>
//           </>

//       )
//   })
// }
