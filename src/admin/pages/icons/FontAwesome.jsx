import React from "react";

const FontAwesome = () => {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Font Awesome Icons</h3>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Basic Icons</h4>
              <div className="icons-list row">
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <i className="fa fa-address-book"></i> fa-address-book
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <i className="fa fa-user"></i> fa-user
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <i className="fa fa-home"></i> fa-home
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FontAwesome;
