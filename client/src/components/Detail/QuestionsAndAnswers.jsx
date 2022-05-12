import React from "react";
import { Box, Button } from "@mui/material";
import { TextField } from "@mui/material";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

export  const QuestionsAndAnswers = () => {
  return (
    <>
      <div>QuestionsAndAnswers</div>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained">Enviar</Button>
        
        {/* <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        <div>
            <div>
            <span>Que medidas tiene?</span>
            </div>
            <SubdirectoryArrowRightIcon/>
            <span> hola, 50 x 60 x 89</span>
        </div>
      </Box>
    </>
  );
};

export default QuestionsAndAnswers