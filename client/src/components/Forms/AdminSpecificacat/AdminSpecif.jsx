import { Box } from "@material-ui/core";
import {
  Button,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSpecification,
  getAllSpecifications,
  putRemoveOneSpecificationOneProduct,
} from "../../../redux/actions";
import { AddSpecification } from "../AddSpecification/AddSpecification";
import { UploadNameSpecifi } from "./UploadNameSpecifi";

export const AdminSpecif = () => {
  const dispatch = useDispatch();
  const allSpecication = useSelector((state) => state.allSpecifications);
  const [uploading, setUploading] = useState(false)
  const [idSpecif , setIdSpecif] = useState("")
  useEffect(() => {
    dispatch(getAllSpecifications());
  }, [dispatch]);

  async function handleDeleteSpeci(e) {
    //  e.prevevenDefault()
    await dispatch(deleteSpecification(e.target.value));
    await dispatch(getAllSpecifications());
  }
  function handleUploadName(e){
    e.preventDefault()
    setUploading(!uploading)
    setIdSpecif(e.target.value)
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
              <Button
        value={s.id}
       onClick={(e) => handleUploadName(e)}
         >
          Editar
        </Button>
            </TableRow>
          </TableContainer>
        );
      })}
      {   uploading &&
        <UploadNameSpecifi
        uploading={uploading}
        idSpecif={idSpecif}
        setUploading={setUploading}
        allSpecication={allSpecication}
        />

        }
    </Box>
  );
};
