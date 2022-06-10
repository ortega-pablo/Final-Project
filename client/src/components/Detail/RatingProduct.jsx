import React from "react";
import { Box, Button, List, ListItem, ListItemText, Modal, Rating, Typography } from "@mui/material";
import AllReviews from "./AllReviews";
import { TypographyMenu } from "../../personalizadTheme";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


function RatingProduct({productDetail}) {

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  let promedy = 0;
  productDetail?.reviews?.forEach((r) => {
    return (promedy = promedy + r.rating);
  });
  promedy = promedy / productDetail?.reviews?.length;

  return (
    <>
      {productDetail?.reviews.length < 5 ? (
        <Box>

            <Rating
              name="half-rating-read"
              defaultValue={0}
              precision={0.5}
              readOnly
            />
          <Typography>Este producto no tiene suficientes reseñas para ser mostradas</Typography>
        </Box>
      
      ) : (
        <>
          <Rating
            name="half-rating-read"
            defaultValue={promedy}
            precision={0.5}
            readOnly
          />
          <Button
            onClick={handleOpenModal}
            color="darkGrey"
            variant="contained"
            size="small"
            sx={{ maxWidth: "32%", mt:1}}
          >
            <TypographyMenu>Ver todas las Reviews</TypographyMenu>
          </Button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <AllReviews reviews={productDetail.reviews} />
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default RatingProduct;
