import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpecifications } from '../../../redux/actions';


const GetAllSpecificationsToAdmin = () => {
  const dispatch = useDispatch();
  const specifications = useSelector((state) => state.allSpecifications)
  useEffect(()=>{
    dispatch(getAllSpecifications())
  },[dispatch])

  return (
    <Box sx={{ mt: 5, width: "70%" }}>
      <TableContainer component={Paper} align="center">
        <Table>
          <TableHead>
            <TableCell>
              Especificaciones
            </TableCell>
          </TableHead>
          <TableBody>
            {
              specifications?.map((s)=>{
                return(
                  <TableRow>
                    <TableCell>
                      <Typography>
                        {s.name}
                      </Typography>
                    </TableCell>
                  </TableRow>

                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default GetAllSpecificationsToAdmin