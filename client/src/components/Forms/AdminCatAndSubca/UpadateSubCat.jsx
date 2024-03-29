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
import Swal from "sweetalert2";
import { deleteSubCategory, getSubCategories } from "../../../redux/actions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TypographyMenu } from "../../../personalizadTheme";

export const UpadateSubCat = ({ allSubCategories }) => {
  const dispatch = useDispatch();

  async function handleDeleteSubCat(e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro de eliminar esta sub categoría?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimnar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteSubCategory(e.target.value));
    await dispatch(getSubCategories());
        Swal.fire("Eliminada!", "Esta sub categoría ha sido eliminada.", "success");
      }
    });
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column',alignItems:'center', m:3, width:"100%"}}>
      <Typography variant="h5" sx={{m:3}} color="lightGrey.main">Actualizar subcategorias</Typography>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="darkGrey.main" variant="h6">Nombre</Typography>
              </TableCell>
              <TableCell>
                <Typography color="darkGrey.main" variant="h6">Descripcion</Typography>
              </TableCell>
              <TableCell>
                <Typography color="darkGrey.main" variant="h6">Categorias</Typography>
              </TableCell>
              <TableCell>
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
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    color="darkGrey"
                    size="small"
                  >
                   <TypographyMenu>Eliminar</TypographyMenu> 
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
    </Box>
  );
};
