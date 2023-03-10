import * as React from 'react';
import Box from '@mui/material/Box';
import {colors} from '@mui/material'
import { Container } from '@mui/system';

export default function DisplayBox() {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            p:10,
            height: 300,
            border: 10,
            borderColor: colors.grey[50],
            '&:hover': {
              backgroundColor: colors.amber[100],
              opacity: [0.9, 0.8, 0.7],
            }
          }}
        />
      </Container>
    );
}

