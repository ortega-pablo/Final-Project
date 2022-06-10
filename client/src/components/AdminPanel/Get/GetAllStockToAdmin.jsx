import {
    Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions";

const GetAllStockToAdmin = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <TableContainer component={Paper} align="center">
        <Table>
          <TableHead>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main">Nombre</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main">SKU</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main">Stock</Typography>
            </TableCell>
          </TableHead>
          <TableBody>
            {products?.map((p) => {
              return (
                <TableRow>
                  <TableCell>
                    <Typography>{p.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{p.sku}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{p.productInventory.quantity}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GetAllStockToAdmin;
