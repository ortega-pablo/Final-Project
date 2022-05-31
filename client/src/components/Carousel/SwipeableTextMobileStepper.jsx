import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import image1 from "../../media/1.png"
import image2 from "../../media/2.png"
import image3 from "../../media/3.png"
import { getImageBanner } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);




const images = [
  {
    label: 'Minadora 1',
    imgPath: image1,
  },
  {
    label: 'Minadora 2',
    imgPath: image2,
  },
  {
    label: 'Minadora 3',
    imgPath: image3,
  },
];

function SwipeableTextMobileStepper() {
  const dispatch = useDispatch();
  const banner = useSelector( state => state.allImagesBanner)

  React.useEffect(() => {
    dispatch(getImageBanner())
 
   }, [ ]);
 


  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = banner.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "vp", flexGrow: 1, ml:"auto", mr:"auto", mt:1 }}>
      
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {banner.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  paddingTop: "2rem"
                }}
                src={step.urlImage}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

    </Box>
  );
}

export default SwipeableTextMobileStepper;
