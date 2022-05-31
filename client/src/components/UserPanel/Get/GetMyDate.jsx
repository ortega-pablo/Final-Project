import { Button, Collapse, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminEditButton from '../../AdminPanel/UserPanel/AdminEditButton'
import UserEditButton from '../../AdminPanel/UserPanel/UserEditButton'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MailIcon from "@mui/icons-material/Mail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { useDispatch, useSelector } from 'react-redux';
import { getDetailOneUsers, getUserIdByToken } from '../../../redux/actions';

const GetMyData = () => {
    const dispatch = useDispatch()
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const [render, setRender] = useState(0);
    useEffect(() => {
      dispatch(getUserIdByToken(idToken))
        .then((r) => r)
        .then((r) => dispatch(getDetailOneUsers(r)));
      }, [render]);
      
    const user = useSelector((state) => state.getDetailOneUser);
    
    
    const [open, setOpen] = React.useState(false);




  return (
      <>
         
      <TableRow sx={{ width: "100%" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
         
            <Table aria-label="purchases">
              <TableBody>

              <TableRow>
                  <TableCell sx={{ width: "15%" }} />

                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "left",
                    }}
                  >
                    <MailIcon />
                    <Typography variant="h6">Usuario:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography>{user.userName}</Typography>
                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "left",
                    }}
                  >
                    <MailIcon />
                    <Typography variant="h6">Nombre:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography>{user.firstName}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "left",
                    }}
                  >
                    <MailIcon />
                    <Typography variant="h6">Apellido:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography>{user.lastName}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "left",
                    }}
                  >
                    <MailIcon />
                    <Typography variant="h6">E-mail:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography>{user.email}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "spacer-araund",
                    }}
                  >
                    <ContactPhoneIcon />
                    <Typography variant="h6">Teléfono:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography
                      sx={{
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {user.phone}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    sx={{
                      width: "20%",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="h6">Usuario desde:</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "80%" }}>
                    <Typography>{user?.createdAt?.slice(0, 10)}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
     
        </TableCell>
      
      </TableRow>


      </>
  )
}

export default GetMyData