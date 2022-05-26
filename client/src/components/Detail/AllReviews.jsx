import { Divider, List, ListItem, ListItemText, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function AllReviews({reviews}) {
  return (
    <Box>
    <List 
      sx={{ width: '100%', maxWidth: "360px",maxHeight:"360px", bgcolor: 'background.paper', overflowY: "scroll" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {reviews?.map((r)=>{
        return(<>
        <Divider component="li" />
            <li>
              <Typography
                sx={{ mt: "0,5%", ml: "2%" }}
                color="text.secondary"
                display="block"
                variant="caption"
              ></Typography>
            </li>
      <ListItem>
      <Rating name="half-rating-read" defaultValue={r.rating} precision={0.5} readOnly />
      </ListItem>
      <ListItem>
      <ListItemText color="ambar5.main" primary={r.review} />
      </ListItem>
      </>)
      })}
    </List>
    </Box>
  )
}

export default AllReviews