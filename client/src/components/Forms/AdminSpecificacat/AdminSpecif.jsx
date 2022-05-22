import { Button, TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpecifications, putRemoveOneSpecificationOneProduct } from '../../../redux/actions'

export const AdminSpecif = () => {
  const dispatch = useDispatch()
  const allSpecication = useSelector( state => state.allSpecifications)
  useEffect(()=>{
    dispatch(getAllSpecifications())
  }, [dispatch])


  async function handleDeleteSpeciToProd(e){
    e.prevevenDefault()
    await dispatch(putRemoveOneSpecificationOneProduct(7 , e.target.value))
}

  return (

    <>
    <div>AdminSpecif</div>
    { allSpecication?.map( s => {
      return (
        <TableRow>
        <TableCell>
        {/* <ListItemAvatar>
      <SubdirectoryArrowRightIcon />
    </ListItemAvatar>   */}
    <b>Especificación: </b>
        </TableCell>
        <TableCell>{s?.name}</TableCell>
        <TableCell>{s?.ProductSpecification?.value}</TableCell>

        <Button
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
