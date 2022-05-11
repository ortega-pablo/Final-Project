import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Card = ({name, price,brand, thumbnail}) => {
  let navigate = useNavigate()

function handleDetail (e){
  e.preventDefault()
  navigate("/detail")
}


  return (
    <>
    <h2>{name}</h2>
    <h3>$ {price}</h3>
    <h3>{brand}</h3>
    
    <img
      src={thumbnail}
      alt="soy la foto"/>

      <button onClick={(e)=>handleDetail(e)}>Detalle</button>
      <button>Agregar al carrito</button>
      <button>Comprar ahora</button>
    </>
  )
}
