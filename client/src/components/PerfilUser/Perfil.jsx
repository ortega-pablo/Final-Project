import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getUserIdByToken, getUsers } from '../../redux/actions';
import { UltimasCompras } from './UltimasCompras';

export const Perfil = () => {
    const dispatch = useDispatch();


    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const userId =  dispatch(getUserIdByToken(idToken));
    console.log(userId.username)
    
    return (
      <>
    <h1>Perfil user</h1>
        <h4> hola {userId.idUser}</h4>

        <h5>compras</h5>
            <h5>Ordenes</h5>
            <UltimasCompras/>

      </>
  )
}
