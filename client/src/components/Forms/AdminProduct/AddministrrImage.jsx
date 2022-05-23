import React from 'react'
import { AddImageToProduct } from '../AddImageToProduct'

export const AddministrrImage = ({newProdId, newProduct}) => {
  return (
    <>
    <div>Aca se administra las images de un producto en particular</div>
    <AddImageToProduct
        newProdId={newProdId}
        newProduct={newProduct}/>
    </>

  )
}
