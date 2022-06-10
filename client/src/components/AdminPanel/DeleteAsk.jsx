import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteAsk, getAllAsksAllProducts, getAsksForAllProductsOneUser, getUserIdByToken } from '../../redux/actions'
import Swal from "sweetalert2";
import { TypographyMenu } from '../../personalizadTheme';


export const DeleteAsk = ({askId, setRender}) => {
    const dispatch = useDispatch()
    const userid = JSON.parse(window.localStorage.getItem("token"))?.token;



async function clickDeleteAsk (e){
e.preventDefault()
Swal.fire({
  title: `¿Está seguro de eliminar la pregunta?`,
  // text: "Esta acción no se puede deshacer!",
  icon: "warning",
  background: "#DFDCD3",
  showCancelButton: true,
  confirmButtonColor: "#B6893E",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, eliminar!",
}).then(async (result) => {
  if (result.isConfirmed) {
    await dispatch(deleteAsk(e.target.value))
    await dispatch(getAllAsksAllProducts())
    dispatch(getUserIdByToken(userid))
          .then((r) => r)
          .then((r) => dispatch(getAsksForAllProductsOneUser(r)))
  

  
} })



}

  return (
    <>
    <Button value={askId} onClick={(e)=> clickDeleteAsk(e)} variant="contained" color="darkGrey">
      <TypographyMenu>Eliminar pregunta</TypographyMenu>
      </Button>
    </>
  )
}
