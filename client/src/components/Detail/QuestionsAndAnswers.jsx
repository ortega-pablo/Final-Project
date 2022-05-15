import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Box } from "@mui/system";

export const QuestionsAndAnswers = ({ asks }) => {
  return (
    <Box sx={{
      width: "80%",
      alignSelf:"center",
alignItems:"center"
    }}>
      <List
       sx={{
  
      }} 
      >
        {asks.map((a) => {
          return (
            <>
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
                <ListItemText primary={a.content} secondary="User 1" />
              </ListItem>
              <Divider component="li" variant="inset" />
              <li>
                <Typography
                  sx={{ mt: "0,5%", ml: "9%" }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                ></Typography>
              </li>
              <ListItem>
                <ListItemAvatar>
                  <SubdirectoryArrowRightIcon />
                </ListItemAvatar>
                <ListItemText primary={a.answer.content} secondary="User 2" />
              </ListItem>
            </>
          );
        })}
      </List>
    </Box>
  );
};

export default QuestionsAndAnswers;
