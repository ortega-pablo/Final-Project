import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  FormControl,
  TextField,
  Button,
  Collapse
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { postNewAnswer, getUserIdByToken } from '../../redux/actions/index'
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Box } from "@mui/system";


const validationSchemaForAnswer = yup.object({
    content: yup
    .string('Escribe tu respuesta...')
    .max(500, "El maximo de caracteres es 500")
    .required('No puedes mandar el campo vacio.')
  })


export const AnswerComponent = ({userId, askId, handleReRender}) =>{
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const formikForAnswer = useFormik({
        initialValues: {
          content: '',
        },
        validationSchema: validationSchemaForAnswer,
        onSubmit: async (values) => {
          const userId = await dispatch(getUserIdByToken(idToken));
           await dispatch(postNewAnswer(values, askId, userId));
           handleReRender(values.content);
           values.content = '';
        }
      })

    return (
            <Box>
                <Button onClick={() => setOpen(!open)} variant="contained" color="ambar3">Responder</Button>
                <Collapse in={open}>
                    <Box component="form" onSubmit={ formikForAnswer.handleSubmit}  noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="content"
                        label="Escribi tu respuesta..."
                        name="content"
                        value={formikForAnswer.values.content}
                        onChange={formikForAnswer.handleChange}
                        error={formikForAnswer.touched.content && Boolean(formikForAnswer.errors.content)}
                        helperText={formikForAnswer.touched.content && formikForAnswer.errors.content}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2, maxWidth: "100px" }}
                        variant="contained"
                        color="ambar3"
                        >
                        Enviar respuesta
                        </Button>
                    </Box>
                </Collapse>
            </Box>
    )
}
