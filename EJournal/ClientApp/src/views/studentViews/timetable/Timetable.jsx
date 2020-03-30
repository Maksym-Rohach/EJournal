import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';

class Timetable extends React.Component {


render() {
    return (
            <MDBCard className="mt-5">
              <MDBCardBody>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      <th>Урок</th>
                      <th>Час</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>Фізика</td>
                      <td>9:00</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Фіз-ра</td>
                      <td>9:15</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
</MDBCard>   )}
}
export default Timetable;

