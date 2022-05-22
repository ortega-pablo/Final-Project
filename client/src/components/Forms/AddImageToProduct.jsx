import { Button, Input, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts, postAddImageToProduct } from "../../redux/actions";

export const AddImageToProduct = ({ newProduct, newProdId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const formData = new FormData();

  async function handleImage(e) {
    e.preventDefault();

    await formData.append("image", e.target.files[0]);
    await dispatch(postAddImageToProduct(newProdId, formData));
  }

  async function handleClickImage(e) {
    e.preventDefault();
    console.log("gika");

    console.log(formData);
  }

  return (
    <>
      <div>AddImageToProduct</div>
      <form action="">
        <div>
          <input
            onChange={(e) => handleImage(e)}
            name="image"
            accept="image/*"
            id="file"
            //   multiple
            type="file"
          />
        </div>
        <div>
          <Button onClick={handleClickImage}>Upload</Button>
        </div>
      </form>
 


  {/* <Stack direction="row" alignItems="center" spacing={2}>
 <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
         
         
          type="file"
          sx={{display: "none"}}
          onChange={(e) => handleImage(e)}
          name="image"
        
          id="file"
          //   multiple
         
        />
  
        <Button onClick={handleClickImage} variant="contained" component="span">
          Upload
        </Button>
        </label>
      </Stack>  */}

      
    </>
  );
};
