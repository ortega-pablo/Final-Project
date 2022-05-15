import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import CarouselDetail from "./CarouselDetail";
import TableDetail from "./TableDetail";
import QuestionsAndAnswers from "./QuestionsAndAnswers";
import {
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { Box, maxWidth } from "@mui/system";

export const Detail = () => {
  const dispatch = useDispatch();
  //deberia ser un state.detail
  const productDetail = useSelector((state) => state.productDetail);
  let { id } = useParams();

  useEffect(() => {
    //tendria que ser un getDitail(id) desde las action
    dispatch(getDetail(id));
    // return (()=>{
    //     dispatch(clearDetail())
    // })
  }, [dispatch]);

  return (
    <div>
   
        {productDetail.length > 0 ? (
          <Container
          maxWidth="vp"
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "3%",
            width: "100%",
            justifyContent: "space-between",
          }}>
            <Divider>
              <Chip
                label={productDetail[0].name}
                size="string"
                sx={{ fontSize: "20px" }}
              />
            </Divider>

            <CarouselDetail
              productDetail={productDetail}
              sx={{
                display: "flex",
                width: "100%",
              }}
            />

            <Divider textAlign="left">
              <Chip
                label="Descripción"
                size="string"
                sx={{ fontSize: "15px" }}
              />
            </Divider>
              <Box sx={{ m: "2%", maxWidth:"90%"}}>

            <Typography >
              {productDetail[0].description}
            </Typography>
              </Box>

            <Divider textAlign="left">
              <Chip
                label="Especificaciones"
                size="string"
                sx={{ fontSize: "15px" }}
              />
            </Divider>

            <TableDetail productDetail={productDetail} />

            <Divider textAlign="left" sx={{ mt: "2%", mb: "2%" }}>
              <Chip label="Consultas" size="string" sx={{ fontSize: "15px" }} />
            </Divider>

            <QuestionsAndAnswers asks={productDetail[0].asks} />
          </Container>
        ) : (
          <CircularProgress
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        )}

    </div>
  );
};
