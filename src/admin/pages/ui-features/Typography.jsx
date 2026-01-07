import React from "react";

const Typography = () => {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Typography</h3>
      </div>

      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Headings</h4>
              <div className="template-demo">
                <h1>h1. Heading</h1>
                <h2>h2. Heading</h2>
                <h3>h3. Heading</h3>
                <h4>h4. Heading</h4>
                <h5>h5. Heading</h5>
                <h6>h6. Heading</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Text colors</h4>
              <p className="text-primary">.text-primary</p>
              <p className="text-success">.text-success</p>
              <p className="text-danger">.text-danger</p>
              <p className="text-warning">.text-warning</p>
              <p className="text-info">.text-info</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Typography;
