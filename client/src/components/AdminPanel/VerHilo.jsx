import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAsksOneUserOneProduct } from "../../redux/actions";
import { ResponderPregunta } from "./ResponderPregunta";

export const VerHilo = ({ userId, productId }) => {
  const dispatch = useDispatch();
  const pregunta = useSelector((state) => state.getAsksOneUserOnePruduct);

  let { user, prod, preg } = useParams();

  useEffect(() => {
    dispatch(getAsksOneUserOneProduct(user, prod));
  }, [dispatch]);

  console.log(pregunta);
  return (
    <div>
          {
                           <div>
                              <TableContainer component={Paper} align="center">
                                <Table>
                                  <TableHead>
                                    <TableCell>Pregunta</TableCell>
                                    <TableCell>Respuesta</TableCell>
                                  </TableHead>
                                  <TableBody>
                                    {pregunta.map((p) => {
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
                              </div>
                          }

                          <ResponderPregunta askId={preg} />
                      
    </div>
  );
};
