import { Box } from "@material-ui/core";
import {
  Button,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypographyMenu } from "../../../personalizadTheme";
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
    <Box  sx={{width:"100%"}}>
      {   uploading &&
        <UploadNameSpecifi
        uploading={uploading}
        idSpecif={idSpecif}
        setUploading={setUploading}
        allSpecication={allSpecication}
        />

        }
      <TableContainer component={Paper} align="center" >
      {allSpecication?.map((s) => {
        return (
            <TableRow>
              <TableCell>
                <Typography color="darkGrey.main">Especificación: </Typography>
              </TableCell>
              <TableCell>{s?.name}</TableCell>
              <TableCell>{s?.ProductSpecification?.value}</TableCell>
              <TableCell>
              <Button
                value={s.id}
                onClick={(e) => handleDeleteSpeci(e)}
                variant="contained"
                color="darkGrey"
                size="small"
                >
               <TypographyMenu>Eliminar</TypographyMenu>  
              </Button>
              </TableCell>
              <TableCell>
              <Button
        value={s.id}
       onClick={(e) => handleUploadName(e)}
       variant="contained"
                color="darkGrey"
                size="small"
         >
          <TypographyMenu>Editar</TypographyMenu>
        </Button>
              </TableCell>
            </TableRow>
        );
      })}
      </TableContainer>
      
    </Box>
  );
};
