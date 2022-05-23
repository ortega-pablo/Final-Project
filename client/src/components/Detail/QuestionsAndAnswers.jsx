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
  Link
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import {getUserIdByToken, postNewAsk} from '../../redux/actions/index'
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { AnswerComponent } from "./AnswerComponent";
import { useSelector } from "react-redux";

const validationSchema = yup.object({
  content: yup
    .string('Realiza una pregunta...')
    .required('No puedes mandar el campo vacio.'),
});




export const QuestionsAndAnswers = ({ asks, handleReRender }) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const user = useSelector(state => state.userStatus);

  // const userName = JSON.parse(window.localStorage.getItem("token")).firstName;

  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;

 
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const userId = await dispatch(getUserIdByToken(idToken));
      await dispatch(postNewAsk(values, id, userId ));
      handleReRender(values.content);
      values.content = '';
    },
  });


  return (
    <Box
      sx={{
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      {
      user === 'user' ? <Box component="form" onSubmit={formik.handleSubmit}  noValidate sx={{ mt: 1 }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="content"
              label="Escribi tu pregunta..."
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
      </Box> : <></>
      }

      <List  sx={{ maxHeight:"300px", mb: "10px", overflowY: "scroll"}}>
        {asks.map((a) => {
          return ( <>
            <Divider component="li" />
            <li>
              <Typography
                sx={{ mt: "0,5%", ml: "2%" }}
                color="text.secondary"
                display="block"
                variant="caption"
              ></Typography>
            </li>
            <ListItem>
                <ListItemText primary={a.content} secondary={a.user.userName} />                
            </ListItem>
            <Divider component="li" variant="inset" />
              {user ==="admin" && a.answer === null ? <AnswerComponent askId = {a.id} handleReRender = {handleReRender} /> : <></>}
              <li>
                <Typography
                  sx={{ mt: "0,5%", ml: "9%" }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                ></Typography>
              </li>
              <ListItem>
                <ListItemAvatar>
                  <SubdirectoryArrowRightIcon />
                </ListItemAvatar>
                {
                  a.answer !== null ? 
                  (<ListItemText primary={a.answer.content} secondary={a.answer.user.userName} />)
                  : (<ListItemText secondary="Sin respuestas" />)
                }
              </ListItem>
            </>
          );
        })}
      </List>
    </Box>
  );
};

export default QuestionsAndAnswers;
