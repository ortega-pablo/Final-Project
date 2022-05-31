import { Button, CircularProgress, ImageList, ImageListItem, ListSubheader, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteImageToBanner, getImageBanner, postAddImageToBanner } from '../../redux/actions';



export const Banner = () => {
    const dispatch = useDispatch();
    const banner = useSelector( state => state.allImagesBanner)
console.log(banner)
    const [newImage, setNewImage] = useState([]);
  const [render2, setRender2] = useState("")

  useEffect(() => {
   dispatch(getImageBanner())

  }, [ ]);

  const formData = new FormData();
  var  id = 1

  async function handleImage(e) {
    e.preventDefault();

    await setNewImage([...newImage, {id:id++ , file: e.target.files[0]}  ]);
    
  }

 

  async function handleSubmit (e){
  e.preventDefault()
newImage.forEach( f => formData.append("image", f.file) )
console.log("hola")
 await dispatch(postAddImageToBanner( formData));
setRender2(e.target.value)
setNewImage([])
await dispatch(getImageBanner())

await dispatch(getImageBanner())

// await dispatch(getProducts())

  }



  async function deleteClickImageToProduct(e) {
    e.preventDefault();
    await dispatch(deleteImageToBanner( e.target.value));
    await dispatch(getImageBanner())


  }

  const userStatus = useSelector((state) => state.userStatus);
  return userStatus === "admin" || userStatus === "superAdmin" ?  (
      <>
    
    <Box sx={{mt:3, display:"", alignItems:"center", justifyContent:"center"}}>
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
              
        <Button type="submit" variant="contained" color="ambar4" size="small" dissabled ><Typography variant="h6" color="ambar5" dissabled >Subir imagen</Typography></Button>
            <Typography>Las dimensiones de las imagenes recomendadas para el banner son 1800 píxeles x 380 píxeles </Typography>

        </div>
      </form>
      </Box>



      <Box>
        { banner &&
          <ImageList sx={{ width: 400 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">{banner?.urlImage}</ListSubheader>
            </ImageListItem>
            {banner.map((i) => (
              <ImageListItem key={i.img}>
                <img
                  src={i.urlImage}
                  srcSet={i.urlImage}
                  alt={i.urlImage}
                  loading="lazy"
                />
                <Button
                  value={i.id}
                  onClick={(e) => deleteClickImageToProduct(e)}
                >
                  Eliminar
                </Button>
               
              </ImageListItem>
            ))}
          </ImageList>
        }
      </Box>
      </>
  ): (
    <Box
    maxWidth="vp"
    sx={{
      gap: 0,
      display: "flex",
      flexDirection: "column",
      margin: 0,
      width: "100%",
      justifyContent: "space-between",
    }}
  >
    <CircularProgress
      sx={{
        alignSelf: 'center',
        mt: '20%'
      }}
    /> 
    </Box>
  );
}
