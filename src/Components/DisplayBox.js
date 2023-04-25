import * as React from 'react';
import './DisplayBox.css';
import { Box, Container, Slide, Typography } from './mui-index';

export default function DisplayBox({imgSrc, text}) {
  const containerRef = React.useRef(null);
    return (
      <Container sx={{display: 'flex'}}>
        <Box ref={containerRef} >
          <Slide 
            direction="left" 
            in={true}
            container={containerRef.current} >
            <img 
              src={process.env.PUBLIC_URL + '/' + imgSrc} 
              alt={imgSrc}
              />
          </Slide>
        </Box>
        <Box ref={containerRef} >
          <Slide 
            direction="left" 
            in={true}
            container={containerRef.current} >
            <Typography >
              {text}
            </Typography>
          </Slide>
        </Box>
      </Container>
    );
}

