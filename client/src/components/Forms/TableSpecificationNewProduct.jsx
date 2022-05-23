import { Button, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { putRemoveOneSpecificationOneProduct } from '../../redux/actions'

export const TableSpecificationNewProduct = ({newProduct}) => {
    const dispatch = useDispatch()
    // console.log(newProduct)


    async function handleDeleteSpeciToProd(e){
        e.prevevenDefault()
        await dispatch(putRemoveOneSpecificationOneProduct(7 , e.target.value))
    }


  return (

    <>

    {
        newProduct?.specifications.map( s =>{
            return (
                <TableRow>
                <TableCell>
                {/* <ListItemAvatar>
              <SubdirectoryArrowRightIcon />
            </ListItemAvatar>   */}
            <b>Especificación: </b>
                </TableCell>
                <TableCell>{s?.name}</TableCell>
                <TableCell>{s?.ProductSpecification.value}</TableCell>

                <Button
                variant="contained"
                color="ambar4"
                value={s.id}
                onClick={(e) => handleDeleteSpeciToProd(e)}
                // name="delete"
                // startIcon={<EditIcon />}
                >
                  Eliminar
                </Button>
              </TableRow>
            )
        })
    }
    </>
  )
}
