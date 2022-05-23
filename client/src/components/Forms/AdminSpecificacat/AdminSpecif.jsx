import { Button, TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSpecification, getAllSpecifications, putRemoveOneSpecificationOneProduct } from '../../../redux/actions'
import { AddSpecification } from '../AddSpecification/AddSpecification'
import { UploadNameSpecifi } from './UploadNameSpecifi'

export const AdminSpecif = () => {
  const dispatch = useDispatch()
  const allSpecication = useSelector( state => state.allSpecifications)
  useEffect(()=>{
    dispatch(getAllSpecifications())
  }, [dispatch])


  const [uploading, setUploading] = useState(false)
  const [idSpecif , setIdSpecif] = useState("")

      async function handleDeleteSpeci(e){
      //  e.prevevenDefault()
        await dispatch(deleteSpecification( e.target.value))
        await   dispatch(getAllSpecifications())
      }  

      function handleUploadName(e){
        e.preventDefault()
        setUploading(!uploading)
        setIdSpecif(e.target.value)
        console.log(uploading)
        console.log(idSpecif)
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
       onClick={(e) => handleDeleteSpeci(e)}
        >
          Eliminar
        </Button>
        <Button
        value={s.id}
       onClick={(e) => handleUploadName(e)}
         >
          Editar
        </Button>
      </TableRow>
      )
    })

    }
<AddSpecification/>

        {   uploading &&
        <UploadNameSpecifi
        uploading={uploading}
        idSpecif={idSpecif}
        setUploading={setUploading}
        allSpecication={allSpecication}
/>

        }
    </>
  )
}
