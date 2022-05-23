import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteSubCategory, getSubCategories } from "../../../redux/actions";

export const UpadateSubCat = ({ allSubCategories }) => {
  const dispatch = useDispatch();

  async function handleDeleteSubCat(e) {
    e.preventDefault();
    await dispatch(deleteSubCategory(e.target.value));
    await dispatch(getSubCategories());
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column',alignItems:'center', m:3}}>
      <Typography variant="h5" sx={{m:3}}>Actualizar subcategorias</Typography>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Nombre</Typography>
              </TableCell>
              <TableCell>
                <Typography>Descripcion</Typography>
              </TableCell>
              <TableCell>
                <Typography>Categorias</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {allSubCategories?.map((sc) => {
            return (
              <TableRow>
                <TableCell>{sc.name}</TableCell>
                <TableCell>{sc.description}</TableCell>
                <TableCell>{sc.categories[0]?.name}</TableCell>
                <TableCell>
                  <Button
                    value={sc.id}
                    onClick={(e) => handleDeleteSubCat(e)}
                    name="delete"
                    //   startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </TableCell>
                {/* <Button
          value={sc.id}
        //   onClick={(e) => handleUpdateCat(e)}
          name="delete"
        //   startIcon={<EditIcon />}
        >
          Editar
        </Button> */}
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
    </Box>
  );
};
