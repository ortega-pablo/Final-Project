import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import {  getDetailOneUsers, getUserIdByToken, getUsers } from '../../redux/actions';
import { AnswerComponent } from '../Detail/AnswerComponent';
import QuestionsAndAnswers from '../Detail/QuestionsAndAnswers';
import { EditarPerfil } from './EditarPerfil';
import { MisPreguntas } from './MisPreguntas';
import { UltimasCompras } from './UltimasCompras';

export const Perfil =  () => {
    const dispatch = useDispatch();
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const id = dispatch(getUserIdByToken(idToken)).then( r => r)
    let productDetail = useSelector((state) => state.productDetail);
    useEffect(  () => {
      dispatch(getUserIdByToken(idToken))
      .then( r => r)
      .then( r=>  dispatch(getDetailOneUsers(r)))
      
    }, [dispatch]);
    
    const user = useSelector(state => state.getDetailOneUser)
    console.log(user?.firstName)
   

//bt para ver su perfil y modificarlo
//bt con sus preguntas y rtas
//

    return (
      <>
    <h1>MI CUENTA</h1>
        <h3>Editar perfil:</h3>
        <EditarPerfil/>
        <h3>{user?.userName}</h3>
        
        <h4>Mis preguntas</h4>
        <MisPreguntas
          asks={user?.asks}
          userid={user?.id}/>
        <h4>Mis ultimas compras</h4>    
        <UltimasCompras/>


      </>
  )
}
