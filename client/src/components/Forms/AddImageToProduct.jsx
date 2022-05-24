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
      <Box sx={{ display:"", alignItems:"center", justifyContent:"center"}}>
      <form onSubmit={ e=> handleSubmit(e)}>
        <div>
          <input
            onChange={(e) => handleImage(e)}
            name="image"
           // accept="image/*"
            id="file"
            //   multiple
            type="file"
          />
        </div>
        <div>
        <Button  type="submit" variant="contained" color="ambar4" size="small">Subir</Button>
        </div>
      </form>
      </Box>
      <Box>
        { newProduct.images &&
          <ImageList sx={{ width: 400 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">{newProduct?.name}</ListSubheader>
            </ImageListItem>
            {newProduct.images.map((i) => (
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
                >
                  Eliminar
                </Button>
                {/* <ImageListItemBar
            title={i.urlFile}
            //subtitle={i.author}
            actionIcon={
              <IconButton
              value={i.id}
              onClick={deleteClickImageToProduct}
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                // aria-label={`info about ${i.urlFile}`}
              >
                <DeleteIcon  />
              </IconButton>
            }
          /> */}
              </ImageListItem>
            ))}
          </ImageList>
        }
      </Box>

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
    </Box>
  );
};
