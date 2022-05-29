import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import {  getAsksForAllProductsOneUser, getDetailOneUsers, getProducts, getUserIdByToken, getUsers } from '../../redux/actions';
import { AnswerComponent } from '../Detail/AnswerComponent';
import QuestionsAndAnswers from '../Detail/QuestionsAndAnswers';
import { OrdersOneUser } from '../Orders/OrdersOneUser';
import { EditarPerfil } from './EditarPerfil';
import { MisPreguntas } from './MisPreguntas';
import { UltimasCompras } from './UltimasCompras';

export const Perfil =  () => {
    const dispatch = useDispatch();
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const [render, setRender] = useState(0)
    useEffect(  () => {
      dispatch(getUserIdByToken(idToken))
      .then( r => r)
      .then( r=>  dispatch(getDetailOneUsers(r)))
      
    }, [render]);
    
    const user = useSelector(state => state.getDetailOneUser)
   

//bt para ver su perfil y modificarlo
//bt con sus preguntas y rtas
//

    return (
      <>
    <h1>MI CUENTA</h1>
        <h3>Editar perfil:</h3>
        <EditarPerfil
        setRender={setRender}
        render={render}
        user={user}
        idToken={idToken}/>

        <h3>{user?.userName}</h3>
        
        <h4>Mis preguntas</h4>
        <MisPreguntas
          asks={user?.asks}
          userid={user?.id}/>
        <h4>Mis ultimas compras</h4> 
        <OrdersOneUser
        userId={user?.id}
        />   
        <UltimasCompras/>


      </>
  )
}
