import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscount, getAllDiscount, putDiscount } from "../../../redux/actions";
import { CreateDiscout } from "./CreateDiscout"
import { UpdateDiscount } from "./UpdateDiscount";
import {TypographyMenu} from "../../../personalizadTheme"

export const AdminDiscount = () => {
  const dispatch = useDispatch();
  const allDiscounts = useSelector((state) => state.discounts);
  const [state, setState] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [idUpdate, setIdUdate] = useState("");
  useEffect(()=>{
    dispatch(getAllDiscount())
  },[state])

  async function changeState(e) {
    // e.preventDefault()
    if(e.target.checked) {
      await dispatch(putDiscount(e.target.value, { active: true }));
    } else {
      await dispatch(putDiscount(e.target.value, { active: false }));

    }
  }



  //----funcion para editar un descuento
  function handleEditDiscount(e){
    e.preventDefault()
    setUpdating(true)
    setIdUdate(e.target.value)
  }

  //----funcion para eliminar un descuento de la BD
   async function handleDeleteDiscount(e){
     e.preventDefault()
       await dispatch(deleteDiscount(e.target.value))
      //  await dispatch(getAllDiscount())
      window.location.reload()
       setState(e.target.value)
   }

  return (
    <>
    <Box component={Paper} sx={{m:5, p:2}}>
      {   updating && 
  <UpdateDiscount
  allDiscounts={allDiscounts}
  idUpdate={idUpdate}
  setUpdating={setUpdating}
  />

}
</Box>
<Box component={Paper}>
      {allDiscounts.map((d) => {
        return (
          <TableContainer >
            <TableBody>

          <TableRow>
            <TableCell>{d.name}</TableCell>
            <TableCell>{d.description}</TableCell>
            <TableCell>{d.discountPercent} %</TableCell>
            <TableCell>
            <FormControlLabel
              control={
                <Switch
                  // checked={loading}
                  //  onChange={() => setLoading(!loading)}//
                  onChange={(e) => changeState(e)}
                  name="loading"
                  color="verdeLima"
                  value={d.id}
                  defaultChecked={d.active}
                />
              }
              label="Activo"
            />
            </TableCell>
            
              <TableCell>
              <Button
              value={d.id}
                onClick={(e) => handleEditDiscount(e)}
              name="edit"
              variant="contained"
              color="darkGrey"
              size="small"
            >
              <TypographyMenu>Editar</TypographyMenu> 
            </Button>
              </TableCell>
              <TableCell>
              <Button
              value={d.id}
              onClick={(e) => handleDeleteDiscount(e)}
              name="delete"
              variant="contained"
              color="darkGrey"
              size="small"
            >
             <TypographyMenu>Eliminar</TypographyMenu>  
            </Button>
              </TableCell>
            


            
          </TableRow>
            </TableBody>
          </TableContainer>
        );
      })}
      </Box>


    
    </>
  );
};
