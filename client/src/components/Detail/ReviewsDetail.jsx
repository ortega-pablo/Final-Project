import React from 'react'
import { Box } from '@mui/material'
import Rating from '@mui/material/Rating';


function ReviewsDetail({userId, askId, handleReRender}) {

    const [rating, setRating] = React.useState(0);

  return (
    <Box>


{/* ------Renderiza el input Rating------ */}
<Rating
        name="half-controlled"
        value={rating}
        precision={0.5}
        onChange={(event, newRating) => {
          setRating(newRating);
        }}
      />
{/* -------------------------------------- */}


{/* ------Renderiza el Rating leído ------ */}
<Rating name="read-only" precision={0.5} value={3.5} readOnly />
{/* -------------------------------------- */}

    </Box>
  )
}

export default ReviewsDetail
