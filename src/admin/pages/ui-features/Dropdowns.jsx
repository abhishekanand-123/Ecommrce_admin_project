import React from "react";

const Dropdowns = () => {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Dropdowns</h3>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Gradient Dropdown</h4>
              <div className="template-demo d-flex flex-wrap gap-2">
                {["primary", "secondary", "danger", "warning", "success", "info"].map((color, i) => (
                  <div className="dropdown" key={i}>
                    <button className={`btn btn-gradient-${color} dropdown-toggle`} type="button" data-bs-toggle="dropdown">
                      Dropdown
                    </button>
                    <div className="dropdown-menu">
                      <button className="dropdown-item">Action</button>
                      <button className="dropdown-item">Another action</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdowns;
