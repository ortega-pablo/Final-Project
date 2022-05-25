import { useSelect } from '@mui/base'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllAsk } from '../../redux/actions'

export const MisPreguntas = ({asks, userid}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const allAsk = useSelector(state=> state.allAsk)
console.log(userid)
useEffect(()=>{
    dispatch(getAllAsk())
}, [dispatch])

 const askForUser = allAsk?.filter( p => p.userId === userid)
console.log(askForUser)
  return (
      <>
    <div>MisPreguntas</div>
    {
        askForUser?.map(p => {
            return (
                <>
                
                <h2>PRODUCTO: </h2>


                <h3>Pregunta:{p.content}</h3>
                <h4>Respuesta: {p.answer?.content}</h4>    
                </>

            )
        })
    }
      </>
  )
}
