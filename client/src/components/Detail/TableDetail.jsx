import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";


export default function TableDetail({ productDetail }) {
  return (
    <TableContainer sx={{ ml: "auto", mr: "auto", mt: "2%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>{productDetail[0].name}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Marca</TableCell>
            <TableCell>{productDetail[0].brand}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Peso</TableCell>
            <TableCell>{productDetail[0].name + "gr"}</TableCell>
          </TableRow>
          {productDetail[0].specifications.map((s) => {
            return (
              <TableRow>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s["value:"].value}</TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell>Garantía</TableCell>
            <TableCell>{productDetail[0].warranty}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

  );
}
