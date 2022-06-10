import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { height, textAlign } from "@mui/system";

// arriba
// name, price, stock, sku(al final)
// abajo
//brand, netWeight, description, productDimensions, packageDimensions, grossWeight, warranty
// categorias

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography>{row.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{row.price}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{row.productInventory.quantity}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{row.sku}</Typography>
        </TableCell>
      </TableRow>
      <TableRow sx={{ width: "100%" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="purchases">
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      width: "30%",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="h6" color="darkGrey.main">Marca: </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Typography>{row.brand}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow sx={{ height: "100%" }}>
                  <TableCell sx={{ width: "30%" }}>
                    <Typography variant="h6" color="darkGrey.main">Descripcion: </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      sx={{
                        maxWidth: "70%",
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {row.description}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "30%" }}>
                    <Typography variant="h6" color="darkGrey.main">
                      Dimensiones del producto:
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "70%" }}>
                    <Typography>{row.productDimensions}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "30%" }}>
                    <Typography variant="h6" color="darkGrey.main">
                      Dimensiones del paquete:
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "70%" }}>
                    <Typography>{row.packageDimensions}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "30%" }}>
                    <Typography variant="h6" color="darkGrey.main">Peso neto:</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "70%" }}>
                    <Typography>{row.netWeight}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "30%" }}>
                    <Typography variant="h6" color="darkGrey.main">Peso bruto:</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "70%" }}>
                    <Typography>{row.grossWeight}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "30%" }}>
                    <Typography variant="h6" color="darkGrey.main">Garantia:</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "70%" }}>
                    <Typography>{row.warranty}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function GetAllProductsToAdmin() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <TableContainer component={Paper} align="center">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableCell />
            <TableCell>
              <Typography variant="h5" color="darkGrey.main" >Nombre</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main" >Precio</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main" >Stock</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h5" color="darkGrey.main" >SKU</Typography>
            </TableCell>
          </TableHead>
          <TableBody>
            {products?.map((p) => {
              return <Row row={p} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
