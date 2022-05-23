import { Box } from "@material-ui/core";
import {
  Button,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSpecification,
  getAllSpecifications,
  putRemoveOneSpecificationOneProduct,
} from "../../../redux/actions";
import { AddSpecification } from "../AddSpecification/AddSpecification";

export const AdminSpecif = () => {
  const dispatch = useDispatch();
  const allSpecication = useSelector((state) => state.allSpecifications);
  useEffect(() => {
    dispatch(getAllSpecifications());
  }, [dispatch]);

  async function handleDeleteSpeci(e) {
    //  e.prevevenDefault()
    await dispatch(deleteSpecification(e.target.value));
    await dispatch(getAllSpecifications());
  }

  return (
    <Box  >
      {allSpecication?.map((s) => {
        return (
          <TableContainer component={Paper} align="center" >
            <TableRow>
              <TableCell>
                {/* <ListItemAvatar>
      <SubdirectoryArrowRightIcon />
    </ListItemAvatar>   */}
                <b>Especificación: </b>
              </TableCell>
              <TableCell>{s?.name}</TableCell>
              <TableCell>{s?.ProductSpecification?.value}</TableCell>

              <Button
                value={s.id}
                onClick={(e) => handleDeleteSpeci(e)}
                // name="delete"
                // startIcon={<EditIcon />}
              >
                Eliminar
              </Button>
            </TableRow>
          </TableContainer>
        );
      })}
    </Box>
  );
};
