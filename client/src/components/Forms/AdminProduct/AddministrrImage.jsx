import React from 'react'
import { AddImageToProduct } from '../AddImageToProduct'

export const AddministrrImage = ({newProdId, newProduct}) => {
  return (
    <>
    <AddImageToProduct
        newProdId={newProdId}
        newProduct={newProduct}/>
    </>

  )
}
