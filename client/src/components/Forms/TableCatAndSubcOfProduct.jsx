import {
  Button,
  ListItemAvatar,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Table,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getDetail,
  getDetailOneProduct,
  getProducts,
  getSubCategories,
  putCategoryToProduct,
  putSubCategoryToProduct,
} from "../../redux/actions";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

export const TableCatAndSubcOfProduct = ({
  newProdId,
  subCategory,
  category,
}) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const allSubcategories = useSelector((state) => state.subCategories);

  const [render, setRender] = useState("")
  const newProducDetail = useSelector(state => state.getDetailOneProduct)

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getDetailOneProduct(newProdId))
  }, [dispatch]);

  //  const [idSubCat, setIdSubCat] = useState(0)
  //  const [reRender, setReRender] = useState(0);
  // const [idCatForDelete, setIdCatForDelete] = useState(0)

  const newProducts = products.find((p) => p.id === newProdId);


  //funcion para eliminar la categoria del producto
  async function handleDeleteCat(e) {
    e.preventDefault();
    const subCatInCadena = allSubcategories.filter((sc) => sc.categories[0]?.id == e.target.value );
    await dispatch(putCategoryToProduct(newProdId, e.target.value));

    if (subCatInCadena.length > 0) {
      subCatInCadena.map(

        async (sc) => await dispatch(putSubCategoryToProduct(newProdId, sc.id))
      );
      await dispatch(getProducts());
      await dispatch(getDetailOneProduct(newProdId))
      setRender(newProdId)
    }

    await dispatch(getProducts());
  }

  async function handleDeleteSubc(e) {
    e.preventDefault();
    await dispatch(putSubCategoryToProduct(newProdId, e.target.value));
    await dispatch(getProducts());
    await dispatch(getDetailOneProduct(newProdId))
      setRender(newProdId)
  }



  return (
    <>

    <Typography color="warning.dark">
      Atencion: Si elimina su categoría, se eliminaran del producto las
      subcategorías asociadas
    </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="ambar5">
                Nombre de la categoria:
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {newProducts?.categories.map((c) => {
              return (
                <TableRow>
                  <TableCell>{c.name}</TableCell>
                  <TableCell></TableCell>

                  <Button
                    value={c.id}
                    onClick={(e) => handleDeleteCat(e)}
                    // name="delete"
                    // startIcon={<EditIcon />}
                  >
                    Eliminar
                  </Button>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <TableContainer component={Paper}>
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
          
          {                 newProducDetail[0]?.subCategories.map(sc => {
                      return (
                        <TableRow>
                          <TableCell>{sc.name} </TableCell>
                          <TableCell>{sc.categories[0].name} </TableCell>

                        <Button
                      value={sc.id}
                      onClick={(e) => handleDeleteSubc(e)}
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
      </TableContainer>
    </>
  );
};

// {     newProducts?.subCategories?.map( sc => {
//   return (
//       <TableRow>
//       <TableCell>
//       {/* <ListItemAvatar>
//     <SubdirectoryArrowRightIcon />
//   </ListItemAvatar>   */}
//   <b>Sub categoría</b>
//       </TableCell>
//       <TableCell>{sc.name}</TableCell>
//       <Button
//       value={sc.id}
//       onClick={(e) => handleDeleteSubc(e)}
//       // name="delete"
//       // startIcon={<EditIcon />}
//       >
//         Eliminar
//       </Button>
//     </TableRow>
//   )
// })}
