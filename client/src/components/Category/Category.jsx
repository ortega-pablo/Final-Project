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



export function Category({categories}) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>

        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Categorias
            </ListSubheader>
          }
        >
        {categories.length ?  categories.map((category) => { return <>
          <ListItemButton
            key={category}
            disableGutters
            secondaryAction={
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
            }
            >
            <ListItemText primary={category.name}  />
            </ListItemButton>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
        </>}) : 
        <></>
        }

        </List>
    </Box>
  );
}
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
        

        