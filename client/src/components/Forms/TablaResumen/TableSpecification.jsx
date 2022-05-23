import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct, getProducts } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";



export const TableSpecification = ({
  newProdId,
  newProduct

}) => {
  //console.log(specifications);
  // console.log(inputSpec)

  // const categoria = allCategories?.find((cat) => cat.id === category);
  // console.log(allCategories)
  // const subCategoria = categoria?.find( subC=> subC.id === subCategory)
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.products);
  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);


  //---Lo estoy trayendo por props en lugar de redux
  // const newProduct = products.find((p) => p.id === newProdId);
 

//-----FUNCIONES PARA ELIMINAR PRODUCTO RECIEN CREADO
async function handleDeleteProduct(e){
  e.preventDefault();

  await dispatch(deleteProduct(e.target.value));
  await dispatch(getProducts());
 }


  return (
    <>
      <h3>Aca va la tabla</h3>
      <div>TableSpecification</div>
      <TableContainer
        sx={{
          ml: "auto",
          mr: "auto",
          mt: "2%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table sx={{ minWidth: 650, width: "80%" }} aria-label="simple table">
          <TableBody>
            {newProduct?.name && (
              <TableRow>
                <TableCell>
                  <b>
                    <h2>Nombre</h2>
                  </b>
                </TableCell>
                <TableCell>
                  <h3>{newProduct.name}</h3>
                </TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <Button  value={newProduct.id} onClick={ e => handleDeleteProduct(e)}   name="delete" startIcon={<DeleteIcon />}> Eliminar producto creado</Button >
              </TableRow>
            )}
            {newProduct?.id && (
              <TableRow>
                <TableCell>
                  <b>Id</b>
                </TableCell>
                <TableCell>{newProduct.id}</TableCell>
              </TableRow>
            )}
            {newProduct?.brand && (
              <TableRow>
                <TableCell>
                  <b>Marca</b>
                </TableCell>
                <TableCell>{newProduct.brand}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.price && (
              <TableRow>
                <TableCell>
                  <b>Precio</b>
                </TableCell>
                <TableCell>
                  <b>$</b> {newProduct.price}
                </TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.sku && (
              <TableRow>
                <TableCell>
                  <b>Código</b>
                </TableCell>
                <TableCell>{newProduct.sku}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.description && (
              <TableRow>
                <TableCell>
                  <b>Descripción</b>
                </TableCell>
                <TableCell>{newProduct.description}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.netWeight && (
              <TableRow>
                <TableCell>
                  <b>Peso neto</b>
                </TableCell>
                <TableCell>{newProduct.netWeight} gr</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.grossWeight && (
              <TableRow>
                <TableCell>
                  <b>Peso bruto</b>
                </TableCell>
                <TableCell>{newProduct.grossWeight} gr</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {/* {productDetail[0].specifications.map((s) => {
          return (
            <TableRow>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s["value:"].value}</TableCell>
            </TableRow>
          );
        })} */}
            {newProduct?.warranty && (
              <TableRow>
                <TableCell>
                  <b>Garantía</b>
                </TableCell>
                <TableCell>{newProduct.warranty}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.productDimensions && (
              <TableRow>
                <TableCell>
                  <b>Dimensiones del producto</b>
                </TableCell>
                <TableCell>{newProduct.productDimensions}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.packageDimensions && (
              <TableRow>
                <TableCell>
                  <b>Dimensiones del package</b>
                </TableCell>
                <TableCell>{newProduct.packageDimensions}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.productInventory?.quantity && (
              <TableRow>
                <TableCell>
                  <b>Stock</b>
                </TableCell>
                <TableCell>{newProduct.productInventory.quantity}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.categories[0]?.name && (
              <TableRow>
                <TableCell>
                  <b>Categoría</b>
                </TableCell>
                <TableCell>{newProduct.categories[0]?.name}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            )}
            {newProduct?.subCategories[0]?.name && (
              <TableRow>
                <TableCell>
                  <b>Sub categoría</b>
                </TableCell>
                <TableCell>{newProduct.subCategories[0].name}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            )}
            {/* {newProduct?.specifications &&
              newProduct.specifications.map((spec => spec.ProductSpecification).map( sp => {
                return (
                  <TableRow>
                    <TableCell>
                      <b>{sp.name}</b>
                    </TableCell>
                    <TableCell>{sp.value}</TableCell>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableRow>
                );

              })
              
              )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
