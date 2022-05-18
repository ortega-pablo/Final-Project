import {
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
import { getProducts } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
export const TableSpecification = ({
  newProdId,
  input,
  inputQ,
  productosExistentes,
  subCategory,
  category,
  allCategories,
  specifications,
  inputSpec,
}) => {
  //console.log(specifications);
  // console.log(inputSpec)

  // const categoria = allCategories?.find((cat) => cat.id === category);
  // console.log(allCategories)
  // const subCategoria = categoria?.find( subC=> subC.id === subCategory)
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const newProducts = products.find((p) => p.id === newProdId);
  console.log(products);
  console.log(newProducts);
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
            {newProducts?.name && (
              <TableRow>
                <TableCell>
                  <b>
                    <h2>Nombre</h2>
                  </b>
                </TableCell>
                <TableCell>
                  <h3>{newProducts.name}</h3>
                </TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.id && (
              <TableRow>
                <TableCell>
                  <b>Id</b>
                </TableCell>
                <TableCell>{newProducts.id}</TableCell>
              </TableRow>
            )}
            {newProducts?.brand && (
              <TableRow>
                <TableCell>
                  <b>Marca</b>
                </TableCell>
                <TableCell>{newProducts.brand}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.price && (
              <TableRow>
                <TableCell>
                  <b>Precio</b>
                </TableCell>
                <TableCell>
                  <b>$</b> {newProducts.price}
                </TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.sku && (
              <TableRow>
                <TableCell>
                  <b>Código</b>
                </TableCell>
                <TableCell>{newProducts.sku}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.description && (
              <TableRow>
                <TableCell>
                  <b>Descripción</b>
                </TableCell>
                <TableCell>{newProducts.description}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.netWeight && (
              <TableRow>
                <TableCell>
                  <b>Peso neto</b>
                </TableCell>
                <TableCell>{newProducts.netWeight} gr</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.grossWeight && (
              <TableRow>
                <TableCell>
                  <b>Peso bruto</b>
                </TableCell>
                <TableCell>{newProducts.grossWeight} gr</TableCell>
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
            {newProducts?.warranty && (
              <TableRow>
                <TableCell>
                  <b>Garantía</b>
                </TableCell>
                <TableCell>{newProducts.warranty}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.productDimensions && (
              <TableRow>
                <TableCell>
                  <b>Dimensiones del producto</b>
                </TableCell>
                <TableCell>{newProducts.productDimensions}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.packageDimensions && (
              <TableRow>
                <TableCell>
                  <b>Dimensiones del package</b>
                </TableCell>
                <TableCell>{newProducts.packageDimensions}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.productInventory?.quantity && (
              <TableRow>
                <TableCell>
                  <b>Stock</b>
                </TableCell>
                <TableCell>{newProducts.productInventory.quantity}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.categories[0]?.name && (
              <TableRow>
                <TableCell>
                  <b>Categoría</b>
                </TableCell>
                <TableCell>{newProducts.categories[0]?.name}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.subCategories[0]?.name && (
              <TableRow>
                <TableCell>
                  <b>Sub categoría</b>
                </TableCell>
                <TableCell>{newProducts.subCategories[0].name}</TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            )}
            {newProducts?.specifications &&
              newProducts.specifications.map((spec) => {
                return (
                  <TableRow>
                    <TableCell>
                      <b>{spec.name}</b>
                    </TableCell>
                    <TableCell>{spec["value:"].value}</TableCell>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
