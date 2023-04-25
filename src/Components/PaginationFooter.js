import React from 'react';
import {
  MDBFooter,
  MDBIcon,
} from './mui-index';
import { amber } from '@mui/material/colors';
import Pagination from './Pagination';

export default function PaginationFooter(props) {
  return (
    <MDBFooter>
      <section className='d-flex justify-content-center 
        justify-content-space-evenly 
        justify-content-around border-bottom'>
        <Pagination/>
        <div sx={{width: 'calc(1vmin)'}}>
          <a href='https://www.linkedin.com/in/elinayon/' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='https://github.com/elinayon' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>
    </MDBFooter>
  );
}