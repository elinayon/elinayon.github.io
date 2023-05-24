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
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-evenly"
        position: "fixed",
        right: 0,
        bottom: 0
      }}>
        {/* <Pagination/> */}
        <div sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          font: "large"
        }}>
          <a href='https://www.linkedin.com/in/elinayon/' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" style={{margin: "5px"}} />
          </a>
          <a href='https://github.com/elinayon' className='me-4 text-reset'>
            <MDBIcon fab icon="github" style={{margin: "5px"}}  />
          </a>
        </div>
      </section>
    </MDBFooter>
  );
}