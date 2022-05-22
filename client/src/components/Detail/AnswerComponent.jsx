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
import { postNewAnswer} from '../../redux/actions/index'
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Box } from "@mui/system";


const validationSchemaForAnswer = yup.object({
    content: yup
    .string('Escribe tu respuesta...')
    .required('No puedes mandar el campo vacio.')
  })


export const AnswerComponent = ({userId, askId, handleReRender}) =>{
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const formikForAnswer = useFormik({
        initialValues: {
          content: '',
        },
        validationSchema: validationSchemaForAnswer,
        onSubmit: async (values) => {
           await dispatch(postNewAnswer(values, askId, 2));
           handleReRender(values.content);
           values.content = '';
        }
      })

    return (
            <Box>
                <Button onClick={() => setOpen(!open) } >Responder</Button>
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
                        variant="contained"
                        sx={{ mt: 3, mb: 2, maxWidth: "100px" }}
                        >
                        Enviar respuesta
                        </Button>
                    </Box>
                </Collapse>
            </Box>
    )
}
