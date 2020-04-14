import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
//import "./timetableModal.css";
import Typography from "@material-ui/core/Typography";
const propTypes = {
  el: PropTypes.any,
};

function createMarkup(data, date) {
  return (
    <div>
      <Typography className="ml-2" variant="h5" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography className="ml-3 mt-2" variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      <div className="d-flex flex-row mt-3" style={{ width: "100%" }}>
        <div className="d-flex flex-column">
          <Typography className="text-muted" variant="subtitle1" gutterBottom>
            Дата публікації: 14.09.2020
          </Typography>
          <Typography className="text-muted" variant="subtitle1" gutterBottom>
            Відбудеться: 15.09.2020
          </Typography>
        </div>
        <div className="d-flex justify-content-end" style={{ width: "100%" }}>
          <Typography className="text-muted" variant="subtitle1" gutterBottom>
            Олексій Олексійович
          </Typography>
        </div>
      </div>
    </div>
  );
}
const NewsModal = (props) => {
  const { el } = props;
  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div>
      <div>
        <Card onClick={toggle}>
          <CardActionArea>
            <CardContent>
              <div className="d-flex flex-column" style={{ width: "100%" }}>
                <Typography variant="h5" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur
                </Typography>
                <div className="d-flex flex-row mt-2" style={{ width: "100%" }}>
                  <Typography
                    className="text-muted"
                    variant="subtitle1"
                    gutterBottom
                  >
                    Дата публікації: 14.09.2020
                  </Typography>
                  <div
                    className="d-flex justify-content-end"
                    style={{ width: "100%" }}
                  >
                    <Typography
                      className="text-muted"
                      variant="subtitle1"
                      gutterBottom
                    >
                      Олексій Олексійович
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <MDBModal
          size="lg"
          color="primary"
          backdrop={true}
          isOpen={modal}
          toggle={toggle}
        >
          <MDBModalHeader
            className="bg-primary"
            toggle={toggle}
          ></MDBModalHeader>
          <MDBModalBody color="primary">{createMarkup()}</MDBModalBody>
        </MDBModal>
      </div>
    </div>
  );
};

NewsModal.propTypes = propTypes;

export default NewsModal;
