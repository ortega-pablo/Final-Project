import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Box, ListItemButton, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@material-ui/core';
import { ListItemIcon, ListSubheader } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions';
import { withWidth } from '@material-ui/core';
import { Hidden } from '@material-ui/core';



function Category({handleClickForCategories, handleClickForSubcategories}) {

  const categories = useSelector(state => state.categories);


  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getCategories());
  }, [dispatch])

  return (
    <Hidden xsDown>
      <Box>

        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Categorias
            </ListSubheader>
          }
        >
        {categories.length ?  categories.map((category) => {
          return <>
          <ListItemButton
            key={category}
            onClick={() => handleClickForCategories(category.name)}
            disableGutters
            secondaryAction={
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
            }
            >
            <ListItemText primary={category.name}  />
            </ListItemButton>
              {category.subCategories ? category.subCategories.map(subCategory => {
                return <>
            <List component="div" disablePadding>
                      <ListItemButton 
                      key={subCategory} 
                      sx={{ pl: 3 }}
                      onClick={() => handleClickForSubcategories(subCategory.name)}
                      >
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={subCategory.name}/>
                      </ListItemButton>
              </List>
                </>
              }) : <></>}
        </>}) : 
        <></>
        }

        </List>
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Precio
            </ListSubheader>
          }>

        </List>
        </Box>
    </Hidden>
    
  );
}

export default withWidth()(Category);
//  <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {categories.subCategories.length ? categories.subCategories.map(subCategory => {
//               <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemText primary={subCategory} />
//               </ListItemButton>
//             }) :
//             <></>
//             }
//           </List>
//       </Collapse>
        

        