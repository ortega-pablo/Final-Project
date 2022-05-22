import {
  Button,
  FormControlLabel,
  Switch,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscount, getAllDiscount, putDiscount } from "../../../redux/actions";
import { CreateDiscout } from "./CreateDiscout"
import { UpdateDiscount } from "./UpdateDiscount";

export const AdminDiscount = () => {
  const dispatch = useDispatch();
  const allDiscounts = useSelector((state) => state.discounts);
  const [state, setState] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [idUpdate, setIdUdate] = useState("");

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
       await dispatch(getAllDiscount())
   }

  return (
    <>
      <div>Listado de todos los descuentos:</div>
      {allDiscounts.map((d) => {
        return (
          <TableRow>
            <TableCell>{d.name}</TableCell>
            <TableCell>{d.description}</TableCell>
            <TableCell>{d.discountPercent} %</TableCell>
            <FormControlLabel
              control={
                <Switch
                  // checked={loading}
                  //  onChange={() => setLoading(!loading)}//
                  onChange={(e) => changeState(e)}
                  name="loading"
                  color="primary"
                  value={d.id}
                  defaultChecked={d.active}
                />
              }
              label="Activo"
            />

            <Button
              value={d.id}
                onClick={(e) => handleEditDiscount(e)}
              name="delete"
              //   startIcon={<EditIcon />}
            >
              Editar
            </Button>


            <Button
              value={d.id}
              onClick={(e) => handleDeleteDiscount(e)}
              name="delete"
              //   startIcon={<DeleteIcon />}
            >
              Eliminar
            </Button>
          </TableRow>
        );
      })}
{   updating && 
  <UpdateDiscount
  allDiscounts={allDiscounts}
  idUpdate={idUpdate}
  setUpdating={setUpdating}
  />

}

      <h3>Agregar nuevo descuento:</h3>
   <CreateDiscout
   allDiscounts={allDiscounts}/>
    </>


  );
};