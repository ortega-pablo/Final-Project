import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllAsksAllProducts,
  getAllUsers,
  getAsksForAllProductsOneUser,
  getAsksOneUserOneProduct,
  getDetailOneUsers,
  getUserIdByToken,
} from "../../redux/actions";
import { PreguntasHilo } from "./PreguntasHilo";
import { ResponderPregunta } from "./ResponderPregunta";
import { VerHilo } from "./VerHilo";
import { VerHistorialPreguntasUsuario } from "./VerHistorialPreguntasUsuario";

export const Preguntas = () => {
  const dispatch = useDispatch();
  const allAsks = useSelector((state) => state.allAsksAllProducts);
  const allUsers = useSelector((state) => state.getAllUsers);
  console.log(allUsers);
  const [sinResponder, setSinResponder] = useState(false);
  const [historial, setHistorial] = useState(false);
  const [userId, setUserId] = useState(0);
  const pregs = useSelector((state) => state.userAskAllProducs);
 




  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getAllAsksAllProducts());
    dispatch(getAllUsers());
    dispatch(getAsksForAllProductsOneUser(userId));
  }, [dispatch]);

  function handleClickSearch(e) {
    e.preventDefault();
    dispatch(getAsksForAllProductsOneUser(userId));
  }

  function handleGetAsk(e) {
    e.preventDefault();
    setUserId(e.target.value);
  }

  const navigate = useNavigate();

  return (
    <>
      <div>Preguntas</div>
      {/* <Button onClick={() => setSinResponder(!sinResponder)}>
        Mostrar preguntas sin respoder
      </Button> */}

      {
        <>
          {allAsks?.map((prod) => {
            return (
              prod.asks.find((a) => a.answer === null) && (
                <>
                  <Link to={`/detail/${prod?.id}`}>
                    <Typography component="h1" variant="h5">
                      {prod.name}
                    </Typography>
                  </Link>

                  {prod?.asks?.map((preg) => {
                    const userPreg = allUsers.find((u) => u.id == preg.userId);
                    console.log(userPreg);
                    const p = allAsks.filter((pro) => pro.id === prod.id);
                    const r = p[0].asks.filter((q) => q.userId === preg.userId);
                    // const r = p?.filter( s=> s?.userId=== preg.userId)
                    console.log(p);
                    console.log(r);

                    return (
                      !preg.answer && (
                        <>
                          {/* <Link
                            to={`prueba2/${preg?.userId}/${prod?.id}/${preg?.id}`}
                          > */}
                          <Typography>
                            <b>{userPreg?.userName}</b> ha preguntado:{" "}
                          </Typography>
                          {/* </Link> */}
                          <Typography component="h2" variant="h5">
                            {preg?.content}
                          </Typography>

                          {preg?.answer ? (
                            <Typography component="h2" variant="h5">
                              Tu respuesta: {preg?.answer?.content}
                            </Typography>
                          ) : (
                            <Typography component="h2" variant="h5">
                              "Respuesta pendiente"
                            </Typography>
                          )}
                          <hr />

                          {/* <Link
                          
                            to={`prueba2/${preg?.userId}/${prod?.id}/${preg?.id}`}
                            variant="contained"
                            color="ambar3"
                            >
                          
                            <Button>
                              Ver historial entre este usuario y producto
                            </Button>
                            </Link> */}
                            <Button onClick={handleOpen}> Ver historial entre este usuario y producto</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}>
        
    <VerHilo
      user={preg?.userId}
      prod={prod?.id} 
      preg={preg?.id} />

  </Box>
</Modal>


                          <ResponderPregunta askId={preg.id} />
                        </>
                      )
                    );
                  })}
                  <hr />
                  <hr />
                </>
              )
            );
          })}
        </>
      }

      <InputLabel id="demo-simple-select-standard-label">
        Seleccione un usuario
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        //   value={category}
        onChange={handleGetAsk}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allUsers?.map((u, i) => {
          return (
            <MenuItem key={i} value={u.id}>
              {u?.userName}
            </MenuItem>
          );
        })}
      </Select>
      <Button onClick={handleClickSearch}> Buscar</Button>

      {/* <VerHistorialPreguntasUsuario
        userId={userId}
        pregs={pregs}/> */}

      {
        <div>
          <TableContainer component={Paper} align="center">
            <Table>
              <TableHead>
                <TableCell>Producto</TableCell>
                <TableCell>Pregunta</TableCell>
                <TableCell>Respuesta</TableCell>
              </TableHead>
              <TableBody>
                {pregs.map((p) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography>{p?.name}</Typography>
                      </TableCell>
                      <TableCell>
                        {p?.asks?.map((pr) => {
                          return (
                            <>
                              <Typography> {pr.content}</Typography>
                            </>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {p?.asks?.map((pr) => {
                          console.log(pr);
                          return (
                            <>
                              <Typography> {pr?.answer?.content}</Typography>
                            </>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </>
  );
};
