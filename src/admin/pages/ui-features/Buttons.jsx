import React from "react";

const Buttons = () => {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Buttons</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#" className="text-primary">UI Elements</a></li>
            <li className="breadcrumb-item active">Buttons</li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Gradient Buttons</h4>
              <p className="card-description">
                Add class <code>.btn-gradient-{'{color}'}</code> for gradient buttons
              </p>
              <div className="template-demo">
                <button type="button" className="btn btn-gradient-primary btn-fw">Primary</button>
                <button type="button" className="btn btn-gradient-secondary btn-fw">Secondary</button>
                <button type="button" className="btn btn-gradient-success btn-fw">Success</button>
                <button type="button" className="btn btn-gradient-danger btn-fw">Danger</button>
                <button type="button" className="btn btn-gradient-warning btn-fw">Warning</button>
                <button type="button" className="btn btn-gradient-info btn-fw">Info</button>
                <button type="button" className="btn btn-gradient-light btn-fw">Light</button>
                <button type="button" className="btn btn-gradient-dark btn-fw">Dark</button>
                <button type="button" className="btn btn-link">Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Rounded Buttons</h4>
              <p className="card-description">
                Add class <code>.btn-rounded</code>
              </p>
              <div className="template-demo">
                <button type="button" className="btn btn-gradient-primary btn-rounded btn-fw">Primary</button>
                <button type="button" className="btn btn-gradient-secondary btn-rounded btn-fw">Secondary</button>
                <button type="button" className="btn btn-gradient-success btn-rounded btn-fw">Success</button>
                <button type="button" className="btn btn-gradient-danger btn-rounded btn-fw">Danger</button>
                <button type="button" className="btn btn-gradient-warning btn-rounded btn-fw">Warning</button>
                <button type="button" className="btn btn-gradient-info btn-rounded btn-fw">Info</button>
                <button type="button" className="btn btn-gradient-light btn-rounded btn-fw">Light</button>
                <button type="button" className="btn btn-gradient-dark btn-rounded btn-fw">Dark</button>
                <button type="button" className="btn btn-link">Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Outlined Buttons</h4>
              <p className="card-description">
                Add class <code>.btn-outline-{'{color}'}</code> for outlined buttons
              </p>
              <div className="template-demo">
                <button type="button" className="btn btn-outline-primary btn-fw">Primary</button>
                <button type="button" className="btn btn-outline-secondary btn-fw">Secondary</button>
                <button type="button" className="btn btn-outline-success btn-fw">Success</button>
                <button type="button" className="btn btn-outline-danger btn-fw">Danger</button>
                <button type="button" className="btn btn-outline-warning btn-fw">Warning</button>
                <button type="button" className="btn btn-outline-info btn-fw">Info</button>
                <button type="button" className="btn btn-outline-light btn-fw">Light</button>
                <button type="button" className="btn btn-outline-dark btn-fw">Dark</button>
                <button type="button" className="btn btn-link">Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Single color buttons</h4>
              <p className="card-description">
                Add class <code>.btn-{'{color}'}</code> for solid buttons
              </p>
              <div className="template-demo">
                <button type="button" className="btn btn-primary btn-fw">Primary</button>
                <button type="button" className="btn btn-secondary btn-fw">Secondary</button>
                <button type="button" className="btn btn-success btn-fw">Success</button>
                <button type="button" className="btn btn-danger btn-fw">Danger</button>
                <button type="button" className="btn btn-warning btn-fw">Warning</button>
                <button type="button" className="btn btn-info btn-fw">Info</button>
                <button type="button" className="btn btn-light btn-fw">Light</button>
                <button type="button" className="btn btn-dark btn-fw">Dark</button>
                <button type="button" className="btn btn-link">Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Icon Buttons</h4>
              <p className="card-description">
                Add class <code>.btn-icon</code>
              </p>
              <div className="template-demo">
                <button type="button" className="btn btn-gradient-primary btn-icon">
                  <i className="mdi mdi-home"></i>
                </button>
                <button type="button" className="btn btn-gradient-dark btn-icon">
                  <i className="mdi mdi-menu"></i>
                </button>
                <button type="button" className="btn btn-gradient-danger btn-icon">
                  <i className="mdi mdi-star"></i>
                </button>
                <button type="button" className="btn btn-gradient-info btn-icon">
                  <i className="mdi mdi-refresh"></i>
                </button>
                <button type="button" className="btn btn-gradient-success btn-icon">
                  <i className="mdi mdi-alert"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Button Size</h4>
              <p className="card-description">
                Add class <code>.btn-{'{size}'}</code>
              </p>
              <div className="template-demo">
                <button type="button" className="btn btn-gradient-primary btn-lg">btn-lg</button>
                <button type="button" className="btn btn-gradient-primary">Default</button>
                <button type="button" className="btn btn-gradient-primary btn-sm">btn-sm</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .card-description { color: #8e94a9; font-size: 0.875rem; margin-bottom: 1rem; }
        .card-description code { color: #fe7c96; background: #f8f9fa; padding: 2px 6px; border-radius: 3px; }
        .text-primary { color: #9a55ff !important; text-decoration: none; }
        .template-demo { display: flex; flex-wrap: wrap; gap: 10px; }
        .btn-fw { min-width: 120px; }
        .btn-rounded { border-radius: 50px !important; }
        .btn-gradient-primary { background: linear-gradient(to right, #da8cff, #9a55ff); color: #fff; border: none; }
        .btn-gradient-secondary { background: linear-gradient(to right, #e7ebf0, #868e96); color: #fff; border: none; }
        .btn-gradient-success { background: linear-gradient(to right, #84d9d2, #07cdae); color: #fff; border: none; }
        .btn-gradient-danger { background: linear-gradient(to right, #ffbf96, #fe7096); color: #fff; border: none; }
        .btn-gradient-warning { background: linear-gradient(to right, #f6e384, #ffd500); color: #212529; border: none; }
        .btn-gradient-info { background: linear-gradient(to right, #90caf9, #047edf); color: #fff; border: none; }
        .btn-gradient-light { background: linear-gradient(to right, #f4f4f4, #d4d4d4); color: #212529; border: none; }
        .btn-gradient-dark { background: linear-gradient(to right, #7a7a7a, #3e3c3c); color: #fff; border: none; }
        .btn-outline-primary { color: #9a55ff; border-color: #9a55ff; background: transparent; }
        .btn-outline-primary:hover { background: #9a55ff; color: #fff; }
        .btn-outline-secondary { color: #868e96; border-color: #868e96; background: transparent; }
        .btn-outline-success { color: #07cdae; border-color: #07cdae; background: transparent; }
        .btn-outline-danger { color: #fe7096; border-color: #fe7096; background: transparent; }
        .btn-outline-warning { color: #ffd500; border-color: #ffd500; background: transparent; }
        .btn-outline-info { color: #047edf; border-color: #047edf; background: transparent; }
        .btn-outline-light { color: #d4d4d4; border-color: #d4d4d4; background: transparent; }
        .btn-outline-dark { color: #3e3c3c; border-color: #3e3c3c; background: transparent; }
        .btn-icon { width: 40px; height: 40px; padding: 0; display: inline-flex; align-items: center; justify-content: center; }
        .btn-link { color: #9a55ff; text-decoration: none; }
        .btn-link:hover { text-decoration: underline; }
        .btn-lg { padding: 0.875rem 1.5rem; font-size: 1rem; }
        .btn-sm { padding: 0.375rem 0.75rem; font-size: 0.75rem; }
      `}</style>
    </>
  );
};

export default Buttons;
