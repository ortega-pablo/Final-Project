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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
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
  // const allCategories = useSelector( state => state.categories)
  // const [idCat, setIdCat] = useState("")

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  //  const [idSubCat, setIdSubCat] = useState(0)
  //  const [reRender, setReRender] = useState(0);
  // const [idCatForDelete, setIdCatForDelete] = useState(0)

  const newProducts = products.find((p) => p.id === newProdId);

  async function handleDeleteCat(e) {
    e.preventDefault();
    // setIdCatForDelete(e.target.value)
    const subCatInCadena = allSubcategories.filter((sc) => sc.categories[0]?.id == e.target.value
    );

    await dispatch(putCategoryToProduct(newProdId, e.target.value));

    if (subCatInCadena.length > 0) {
      subCatInCadena.map(
        async (sc) => await dispatch(putSubCategoryToProduct(newProdId, sc.id))
      );
      await dispatch(getProducts());
    }

    await dispatch(getProducts());
  }

  async function handleDeleteSubc(e) {
    e.preventDefault();
    await dispatch(putSubCategoryToProduct(newProdId, e.target.value));
    await dispatch(getProducts());
  }

  // function handleSubCat(e) {
  //   e.preventDefault()
  //   setIdSubCat(e.target.value)

  // }

  // const categoriaFromSubc = allCategories.find((c,i) => c.subCategories.some(c.id.subCategory) )
  //     // const categ = categoriaFromSubc.filter()
  //     console.log(categoriaFromSubc)
  //     console.log(subCategory)
  //     // console.log(categ)

  return (
    <>
      <div>TableCatAndSubcOfProduct</div>
      
      Atencion: Si elimina su categoría, se eliminaran del producto las
      subcategorías asociadas
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nombre de la categoria: </b>
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
            {newProducts?.subCategories?.map((sc) => {
              return (
                <TableRow>
                  <TableCell>{sc.name} </TableCell>
                  <TableCell>ACA VA LA CATEGORIA </TableCell>

                  {/* {c?.subCategories?.map(sc => <TableCell>{sc.name}</TableCell> ) } */}

                  <Button
                    value={sc.id}
                    onClick={(e) => handleDeleteSubc(e)}
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
