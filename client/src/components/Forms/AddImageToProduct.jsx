import { Button, Input, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageToProduct,
  getImage,
  getProducts,
  postAddImageToProduct,
} from "../../redux/actions";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
// import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelect } from "@mui/base";
import { TypographyMenu } from "../../personalizadTheme";

export const AddImageToProduct = ({ newProduct, newProdId,  prueba }) => {
  const allImages = useSelector(state => state.allImages)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getImage());

  }, [ ]);



  const [newImage, setNewImage] = useState([]);
  const [render2, setRender2] = useState("")

  const formData = new FormData();
  var  id = 1

  async function handleImage(e) {
    e.preventDefault();

    //  formData.append("image", e.target.files[0]);
    await setNewImage([...newImage, {id:id++ , file: e.target.files[0]}  ]);
    
    await dispatch(getProducts())
  }

  // async function handleImage(e) {
  //   e.preventDefault();

  //   await formData.append("image", e.target.files[0]);
  //   await dispatch(postAddImageToProduct(newProdId, formData));
  //   await setNewImage(e.target.files[0]);
  //   await dispatch(getProducts());
  // }



  async function handleSubmit (e){
  e.preventDefault()
newImage.forEach( f => formData.append("image", f.file) )

await dispatch(postAddImageToProduct(newProdId, formData));
setRender2(e.target.value)
setNewImage([])
await   dispatch(getImage());
await dispatch(getProducts())
await dispatch(getProducts())

  }

  // async function handleClickImage(e) {
  //   e.preventDefault();
  //   console.log("gika");
  //   await setNewImage(e.target.value);
  //   await dispatch(getProducts());
  // }

  async function deleteClickImageToProduct(e) {
    e.preventDefault();
    await dispatch(deleteImageToProduct(newProdId, e.target.value));
    await dispatch(getProducts())


  }
  return (
    <Box>
<Typography sx={{ m: "5px" }} variant="h5" color="darkGrey.main">
        Selecciona las imagenes
      </Typography>



      <Box sx={{ display:"", alignItems:"center", justifyContent:"center"}}>
      <form   style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={ e=> handleSubmit(e)}>
        <div>
          <input
          style={{
            border: "1px solid #ccc",
            display: "inline-block",
            padding: "6px 12px",
            cursor: "pointer",
            textShadow: "1px 1px #fff",
            fontWeight: "700",
            fontSize: "16px",
          }}
            onChange={(e) => handleImage(e)}
            name="image"
           // accept="image/*"
            id="file"
            //   multiple
            type="file"
          />
        </div>
        <div>
              
        <Button type="submit" variant="contained" color="darkGrey" size="small" dissabled ><TypographyMenu>Upload</TypographyMenu></Button>

        </div>
      </form>
      </Box>
      <Box>
        { newProduct?.images &&
          <ImageList sx={{ width: 400 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">{newProduct?.name}</ListSubheader>
            </ImageListItem>
            {newProduct?.images.map((i) => (
              <ImageListItem key={i.img}>
                <img
                  src={i.urlFile}
                  srcSet={i.urlFile}
                  alt={i.urlFile}
                  loading="lazy"
                />
                <Button
                  value={i.id}
                  onClick={(e) => deleteClickImageToProduct(e)}
                  variant="contained"
                  color="darkGrey"
                >
                  <TypographyMenu>Eliminar</TypographyMenu> 
                </Button>
              
              </ImageListItem>
            ))}
          </ImageList>
        }
      </Box>
    </Box>
  );
};
