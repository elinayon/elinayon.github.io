import * as React from 'react';
import './DisplayBox.css';
import { Box, Container, Slide, Typography, Grow, colors } from './mui-index';

export default function DisplayBox({imgSrc, text}) {
  const containerRef = React.useRef(null);
    return (
      <Container >
        <Box
          justifyContent={'center'}
          sx={{
            height: '40vh',
            border: 2,
            display: 'flex',
            borderRadius: '100px',
            borderColor: colors.amber[50]
          }}
          ref={containerRef}
        >
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

