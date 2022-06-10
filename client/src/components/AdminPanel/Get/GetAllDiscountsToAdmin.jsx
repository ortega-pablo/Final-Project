import {
  Collapse,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscount } from "../../../redux/actions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
          <Typography>{row.description}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{row.discountPercent}%</Typography>
        </TableCell>
        <TableCell>
          {row.active ? <CheckBoxIcon /> : <DisabledByDefaultIcon />}
        </TableCell>
      </TableRow>
      <TableRow sx={{ width: "100%" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              <TableHead>
                <TableCell>
                  <Typography variant="h6" color="darkGrey.main">
                    Productos con el descuento
                  </Typography>
                </TableCell>
              </TableHead>
              <TableBody>
                {row.products?.map((p) => {
                  return (
                      <TableRow>
                        <TableCell>
                        <Typography>{p.name}</Typography>
                        </TableCell>
                      </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export const GetAllDiscountsToAdmin = () => {
  const dispatch = useDispatch();
  const discounts = useSelector((state) => state.discounts);
  useEffect(() => {
    dispatch(getAllDiscount());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="h5" color="darkGrey.main">Nombre</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main">Descripcion</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main">Porcentaje</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="darkGrey.main">Activo</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discounts?.map((d) => {
            return <Row row={d} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
