import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';

export function Category() {
  return (
    <Box>
        <Typography>
            Categorias
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[1, 2, 3].map((value) => (
            <ListItem
            key={value}
            disableGutters
            secondaryAction={
                <IconButton aria-label="comment">
                <CommentIcon />
                </IconButton>
            }
            >
            <ListItemText primary={`Line item ${value}`} />
            </ListItem>
        ))}
        </List>
    </Box>
  );
}
