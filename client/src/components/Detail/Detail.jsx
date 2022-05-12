import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams ,useNavigate  } from "react-router-dom"
import { getProducts } from '../../redux/actions';
import CarouselDetail from "./CarouselDetail"
import TableDetail from './TableDetail';
import QuestionsAndAnswers from "./QuestionsAndAnswers"

export const Detail = () => {
const dispatch = useDispatch();
//deberia ser un state.detail
const products = useSelector( state=> state.products)

// let id = useParams()


useEffect(()=>{
    //tendria que ser un getDitail(id) desde las action
    dispatch(getProducts()) 
    // return (()=>{
    //     dispatch(clearDetail())
    // })
}, [dispatch])
    


  return (
      <div>

            
            <div>Detail</div>
            {
                products.length &&
                    <CarouselDetail
                        products={products}/>
            }
            {   
                products.length &&
                    products[0].id ?
                        <div>
                            hola
                        </div> 
                : <div>Cargando...</div>
            }
            {
                products.length &&
                    <TableDetail
                        products={products}/>
            }
            <h3>Preguntas y respuestas</h3>
            <QuestionsAndAnswers/>
      </div>
  )
}
