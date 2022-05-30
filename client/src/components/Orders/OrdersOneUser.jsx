import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersOneUser } from '../../redux/actions'

export const OrdersOneUser = ({userId}) => {
    const dispatch = useDispatch()
    const allOrderOneUser = useSelector(state=> state.allOrderOneUser)
    useEffect(()=>{
        dispatch(getAllOrdersOneUser(2))
    }, [dispatch])
    console.log(allOrderOneUser)
  return (
      <>
    <div>OrdersOneUser</div>

            {allOrderOneUser?.map((o) => {
                   var fecha = new Date( o.createdAt); 
                var fecha_utc = new Date(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate(),  fecha.getUTCHours()-3, fecha.getUTCMinutes(), fecha.getUTCSeconds());
                
              return (
<>


<TableContainer component={Paper}>

    <Table>
    <TableBody>

                    <TableRow>
                  <TableCell>Numero de orden: {o.id}</TableCell>
                              
                </TableRow>
                    <TableRow>
                  <TableCell>Estado: {o.state}</TableCell>
                              
                </TableRow>
                
                <TableRow>
                  <TableCell>Domicilio: {o.address}</TableCell>
                              
                </TableRow>
                <TableRow>
                  <TableCell>Total: {o.total}</TableCell>
                              
                </TableRow>
                <TableRow>
                  <TableCell>Creada: {o.createdAt}</TableCell>
                  <TableCell>Creada: {fecha_utc.toLocaleString()} Hora Arg</TableCell>

                </TableRow>



    </TableBody>
    </Table>
</TableContainer>



    <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="ambar5">
                Cantidad
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="ambar5">
                Producto
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="ambar5">
                Precio unitario
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" color="ambar5">
                Sub-Total
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

                { o?.products.map( p=> {
                    return (
                        <TableBody>
                <TableRow>
                  <TableCell>cantidad? ejemplo "3"</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell> $ {p.price}</TableCell>
                  <TableCell>$ {p.price * 3}</TableCell>

                  <Button
                    value={p.id}
                    // onClick={(e) => handleDeleteCat(e)}
                    // name="delete"
                    // startIcon={<EditIcon />}
                    >
                    Eliminar
                  </Button>
                </TableRow>
          </TableBody>

)
})

}
        </Table>
      </TableContainer>
      <hr />
      <hr />
</>
              );
    })}
      <hr />
      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nombre de la sub-categoria: </b>
              </TableCell>
              <TableCell>
                <b>Pertenece a la categoría: </b>
              </TableCell>
            </TableRow>
          </TableHead>



          <TableBody>
          
          {                 allOrderOneUser.map(o => {
                      return (
                        <TableRow>
                          <TableCell>{o.id} </TableCell>
                          <TableCell>{o.id} </TableCell>

                        <Button
                      value={o.id}
                    //   onClick={(e) => handleDeleteSubc(e)}
                      // name="delete"
                      // startIcon={<EditIcon />}
                      >
                      Eliminar
                        </Button>
                          </TableRow>
                      )
          } )
          
          }

              
          </TableBody>
        </Table>
      </TableContainer> */}

      </>
  )
}
