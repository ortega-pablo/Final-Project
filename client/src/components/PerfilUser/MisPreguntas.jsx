import { useSelect } from '@mui/base'
import { ListItemAvatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllAsk, getProducts } from '../../redux/actions'
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";


export const MisPreguntas = ({asks, userid}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.products)
    console.log(allProducts)
    // const allAsk = useSelector(state=> state.allAsk)

useEffect(()=>{
    dispatch(getAllAsk())
    dispatch(getProducts())
}, [dispatch])

//  const askForUser = allAsk?.filter( p => p.userId === userid)
console.log(asks)



  return (
      <>
    <div>MisPreguntas</div>

    
    {
        asks?.map(p => {
            {let idProd =p.product?.id
            var prodQue = allProducts.find(p => p.id === idProd)
            
            }
            return (
                <>
                <Link  to={`/detail/${prodQue?.id}`  }>
                <h3>PRODUCTO: {prodQue?.name} </h3>
                </Link>

                <img src={prodQue?.images[0]?.urlFile} width="75" alt="" />
                <img src={prodQue?.images[1]?.urlFile} width="75" alt="" />
                <h2>$ {prodQue.price} </h2>

                { prodQue?.productInventory?.quantity === 0 ? 
                <h3>¡Sin stock! </h3>  :
                <h2>Stock actual: {prodQue?.productInventory?.quantity}</h2> 

                }

              


                <h3>Pregunta:{p.content}</h3>

                <ListItemAvatar>
                  <SubdirectoryArrowRightIcon />
                <h4>Respuesta: {p.answer?.content}</h4>    
                </ListItemAvatar>
                </>

            )
        })
    }
      </>
  )
}
