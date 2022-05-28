import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllAsksAllProducts,
  getAllUsers,
  getAsksOneUserOneProduct,
  getDetailOneUsers,
  getUserIdByToken,
} from "../../redux/actions";
import { PreguntasHilo } from "./PreguntasHilo";
import { ResponderPregunta } from "./ResponderPregunta";
import { VerHilo } from "./VerHilo";

export const Preguntas = () => {
  const dispatch = useDispatch();
  const allAsks = useSelector((state) => state.allAsksAllProducts);
  const allUsers = useSelector((state) => state.getAllUsers);
  console.log(allUsers);
  console.log(allAsks);
  const us = allUsers.map( u => u.asks)

  // const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;

  useEffect(() => {
    dispatch(getAllAsksAllProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  const [sinResponder, setSinResponder] = useState(false);
  const [historial, setHistorial] = useState(false);
  // const [render, setRender] = useState("")

  function clickHistorial(e) {
    e.preventDefault();
    setHistorial(!historial);
  }

  return (
    <>
      <div>Preguntas</div>
      <Button onClick={() => setSinResponder(!sinResponder)}>
        Mostrar preguntas sin respoder
      </Button>

      <h2>Preguntas sin responder:</h2>

      {sinResponder ? (
        <>
          {allAsks?.map((prod) => {
            return (
              prod.asks.find((a) => a.answer === null) && (
                <>
                  <Link to={`/detail/${prod?.id}`}>
                    <Typography component="h1" variant="h5">
                      {prod.name}
                    </Typography>
                  </Link>

                
                  {prod?.asks?.map((preg) => {
                    const userPreg = allUsers.find((u) => u.id == preg.userId);
                    console.log(userPreg)
                    const p = allAsks.filter((pro) => pro.id === prod.id);
                    const r = p[0].asks.filter((q) => q.userId === preg.userId);
                    // const r = p?.filter( s=> s?.userId=== preg.userId)
                    console.log(p);
                    console.log(r);

                    return (
                      !preg.answer && (
                        <>
                        <Link to={`prueba2/${preg.userId}/${prod.id}/${preg.id}`}>
                            <Typography>
                            <b>{userPreg.userName}</b> ha preguntado:{" "}
                          </Typography>
                        </Link>
                          <Typography component="h2" variant="h5">
                            {preg.content}
                          </Typography>

                          {preg?.answer ? (
                            <Typography component="h2" variant="h5">
                              Tu respuesta: {preg?.answer?.content}
                            </Typography>
                          ) : (
                            <Typography component="h2" variant="h5">
                              "Respuesta pendiente"
                            </Typography>
                          )}
                          <hr />

                          <Button onClick={(e) => clickHistorial(e)}>
                            Ver historial
                          </Button>

                          {historial && (
                            <>
                              <TableContainer component={Paper} align="center">
                                <Table>
                                  <TableHead>
                                    <TableCell>Pregunta</TableCell>
                                    <TableCell>Respuesta</TableCell>
                                  </TableHead>
                                  <TableBody>
                                    {r.map((p) => {
                                      return (
                                        <TableRow>
                                          <TableCell>
                                            <Typography>
                                              {p?.content}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Typography>
                                              {p?.answer?.content}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </>
                          )}

                          <ResponderPregunta askId={preg.id} />
                        </>
                      )
                    );
                  })}
                  <hr />
                  <hr />
                </>
              )
            );
          })}
        </>
      ) : (
        <h3>¿Hoy has consultado tu bandeja de preguntas?</h3>
      )}

              {/* <VerHilo
                  productId={prod.id} 
                  userId={preg.userId} /> */}

      {/* <Button onClick={() => setHistorial(!historial)}>
        Mostrar historial de preguntas
      </Button>
      <h2>Historial de preguntas:</h2> */}

      {/* {historial && (
        <>
          {allAsks?.map((prod) => {
            return (
              <>
                <Link to={`/detail/${prod?.id}`}>
                  <Typography component="h1" variant="h5">
                    {prod.name}
                  </Typography>
                </Link>
                {prod?.asks?.map((preg) => {
                  const userPreg = allUsers.find((u) => u.id == preg.userId);

                  const p = allAsks.filter((pro) => pro.id === prod.id);
                  const r = p[0].asks.filter((q) => q.userId === preg.userId);
                  // const r = p?.filter( s=> s?.userId=== preg.userId)

                  return (
                    preg.answer && (
                      <>
                        <hr />
                        <Typography>
                          <b>{userPreg.userName}</b> ha preguntado:
                        </Typography>
                      
                        { (
                                                 
                          <>                                                     

                            <Button onClick={(e) => clickHistorial(e)}>
                              Ver historial
                            </Button>

                            {historial && (
                              
                              <>
                                <TableContainer
                                  component={Paper}
                                  align="center"
                                >
                                  <Table>
                                    <TableHead>
                                      <TableCell>Pregunta</TableCell>
                                      <TableCell>Respuesta</TableCell>
                                    </TableHead>
                                    <TableBody>
                                      {us.map( async (p) => {
                                    
                                        return (
                                          <TableRow>
                                            <TableCell>
                                              <Typography>
                                                {p?.content}
                                              </Typography>
                                            </TableCell>
                                            <TableCell>
                                              <Typography>
                                                {p?.answer?.content}
                                              </Typography>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </>
                            )}

                            <ResponderPregunta />
                          </>
                        )}
                      </>
                    )
                  );
                })}
                <hr />
                <hr />
              </>
            );
          })}
        </>
      )} */}
    </>
  );
};
