import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllSpecifications,  postAddNewSpecification } from "../../../redux/actions";


export const AddSpecification = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ name: "" });

  useEffect(()=>{
    dispatch(getAllSpecifications())
  }, [dispatch])



  function handleInputNewSpec(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

 async function handleClickNewSpec(e) {
    e.preventDefault();
   await dispatch(postAddNewSpecification(input));
   await dispatch(getAllSpecifications())
  }

  return (
    <>
      <div>AddSpecification</div>
      <InputLabel id="demo-simple-select-standard-label">
        Agregar especicación:
      </InputLabel>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onChange={handleInputNewSpec}
        // onChange={handleInput}
      >
        <TextField
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          name="name"
          // helperText={leyendaErrorName}
          // error={errorName}
        />

        <Button onClick={(e) => handleClickNewSpec(e)}>
          Agregar nueva Especificación
        </Button>
      </Box>

      
    </>
  );
};
