import * as React from 'react';
import './DisplayBox.css';
import { Box, Container, Slide, Typography, Grow, colors } from './mui-index';
import { CssBaseline } from '@mui/material';

export default function DisplayBox({imgSrc, text}) {
  const containerRef = React.useRef(null);
    return (
      <Container sx={{display: 'flex'}}>
        <Box ref={containerRef} >
          <Slide 
            direction="up" 
            in={true}
            container={containerRef.current} >
            <img 
              src={process.env.PUBLIC_URL + '/' + imgSrc + '.png'} 
              alt={imgSrc}
              />
          </Slide>
        </Box>
      </Container>
    );
}

