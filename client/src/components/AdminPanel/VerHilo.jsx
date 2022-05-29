import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAsksOneUserOneProduct } from "../../redux/actions";
import { ResponderPregunta } from "./ResponderPregunta";

export const VerHilo = ({ user, prod, preg }) => {
  const dispatch = useDispatch();
  const pregunta = useSelector((state) => state.getAsksOneUserOnePruduct);

  // let { user, prod, preg } = useParams();





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
                      

{/* {
  <div>

 <Button onClick={ handleOpen }>Agregar al Carrito</Button>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        ssss

            <Button type="submit"> Agregar </Button>
            <Button onClick={() => setOpen(false)}> Cancelar </Button>
       
      
      </Modal>
      </div>
      } */}


    </div>
  );
};
