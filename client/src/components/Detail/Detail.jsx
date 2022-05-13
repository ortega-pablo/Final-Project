import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams ,useNavigate  } from "react-router-dom"
import { getProducts, getDetail } from '../../redux/actions';
import CarouselDetail from "./CarouselDetail"
import TableDetail from './TableDetail';
import QuestionsAndAnswers from "./QuestionsAndAnswers"







export const Detail = () => {
const dispatch = useDispatch();
//deberia ser un state.detail
const product = useSelector( state=> state.productDetail)

 let id = useParams()


useEffect(()=>{
    //tendria que ser un getDitail(id) desde las action
    dispatch(getDetail(id)) 
    // return (()=>{
    //     dispatch(clearDetail())
    // })
}, [dispatch])

  return (
      <div>
            <div>Detail</div>
            {
                product &&
                    <CarouselDetail
                        product={product}/>
            }
            {   
                product &&
                    product.id ?
                        <div>
                            hola
                        </div> 
                : <div>Cargando...</div>
            }
            {
                product  &&
                    <TableDetail
                        product={product}/>
            }
            <h3>Preguntas y respuestas</h3>
            <QuestionsAndAnswers/>
      </div>
  )
}
