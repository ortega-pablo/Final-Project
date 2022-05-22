import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteSubCategory, getSubCategories } from "../../../redux/actions";

export const UpadateSubCat = ({ allSubCategories }) => {
   const dispatch = useDispatch()


 async function handleDeleteSubCat(e){
      e.preventDefault()
    await    dispatch(deleteSubCategory(e.target.value))
    await   dispatch(getSubCategories())

  }

  return (
    <>
      <div>UpadateSubCat</div>
      {allSubCategories.map( sc => {
          return (
                  <TableRow>
        <TableCell>{sc.name}</TableCell>
        <TableCell>{sc.description}</TableCell>
        <TableCell>{sc.categories[0].name}</TableCell>
        <Button
          value={sc.id}
        //   onClick={(e) => handleUpdateCat(e)}
          name="delete"
        //   startIcon={<EditIcon />}
        >
          Editar
        </Button>
        <Button
          value={sc.id}
          onClick={(e) => handleDeleteSubCat(e)}
          name="delete"
        //   startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
      </TableRow> 
          )
      }  )
      }
     

    </>
  );
};
