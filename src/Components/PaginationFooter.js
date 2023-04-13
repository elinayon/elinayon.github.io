import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from './mui-index';
import { amber } from '@mui/material/colors';
import Pagination from './Pagination';

export default function PaginationFooter() {
  return (
    <MDBFooter className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-space-evenly justify-content-around border-bottom'>
        <Pagination/>
        <div className=''>
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