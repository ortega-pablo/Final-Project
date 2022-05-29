import { InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useStepContext } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAsksForAllProductsOneUser } from '../../redux/actions';

export const VerHistorialPreguntasUsuario = ({userId, pregs}) => {
const dispatch = useDispatch()
// const preg = useSelector( state => state.userAskAllProducs)
console.log(pregs)
console.log(userId)
// useEffect(()=>{
//     dispatch(getAllUsers())
//     dispatch(getAsksForAllProductsOneUser(userId))

// }, [dispatch])
  

   
  return (
      <>
    <div>VerHistorialPreguntasUsuario {userId}</div>

    {  
                           <div>
                              <TableContainer component={Paper} align="center">
                                <Table>
                                  <TableHead>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Pregunta</TableCell>
                                    <TableCell>Respuesta</TableCell>

                                  </TableHead> 
                                  <TableBody>
                                    {pregs.map((p) => {

                                      return (
                                        <TableRow >
                                          <TableCell>
                                            <Typography>
                                              {p?.name}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                              {p?.asks?.map( pr => {
                                                  return (
                                                      <>
                                                      <Typography  >   {pr.content}
                                                         </Typography>
                                                      </>
                                                  ) 
                                              } )} 
                                          </TableCell>
                                          <TableCell>
                                              {p?.asks?.map( preg => {
                                                  return ( 
                                                      <>
                                                      <Typography>  {preg[0]?.answer?.content}
                                                         </Typography>
                                                      </>
                                                  ) 
                                              } )}
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              </div>
                          }

      </>
  )
}
