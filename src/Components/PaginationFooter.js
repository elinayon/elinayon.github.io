import React from 'react';
import {
  MDBFooter,
  MDBIcon,
} from './libraries';
import { amber } from '@mui/material/colors';
import Pagination from './Pagination';

export default function PaginationFooter(props) {
  return (
    <MDBFooter>
      <section style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
      }}>
        <Pagination/>
        <div sx={{
          width: "8vw",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}>
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