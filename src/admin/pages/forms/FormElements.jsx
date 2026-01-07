import React, { useState } from "react";

const FormElements = () => {
  const [defaultForm, setDefaultForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false
  });

  const [horizontalForm, setHorizontalForm] = useState({
    email: '',
    email2: '',
    mobile: '',
    password: '',
    rePassword: '',
    remember: false
  });

  const handleDefaultChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDefaultForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleHorizontalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHorizontalForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Form elements</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#" className="text-primary">Forms</a></li>
            <li className="breadcrumb-item active">Form elements</li>
          </ol>
        </nav>
      </div>

      <div className="row">
        {/* Default Form */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Default Form</h4>
              <p className="card-description">Basic form layout</p>
              <form className="forms-sample">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={defaultForm.username}
                    onChange={handleDefaultChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={defaultForm.email}
                    onChange={handleDefaultChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={defaultForm.password}
                    onChange={handleDefaultChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password"
                    value={defaultForm.confirmPassword}
                    onChange={handleDefaultChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberDefault"
                    name="remember"
                    checked={defaultForm.remember}
                    onChange={handleDefaultChange}
                  />
                  <label className="form-check-label" htmlFor="rememberDefault">
                    Remember me
                  </label>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                  <button type="button" className="btn btn-dark">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Horizontal Form */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Horizontal Form</h4>
              <p className="card-description">Horizontal form layout</p>
              <form className="forms-sample">
                <div className="form-group row">
                  <label htmlFor="hEmail" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="hEmail"
                      name="email"
                      placeholder="Username"
                      value={horizontalForm.email}
                      onChange={handleHorizontalChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="hEmail2" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      id="hEmail2"
                      name="email2"
                      placeholder="Email"
                      value={horizontalForm.email2}
                      onChange={handleHorizontalChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="hMobile" className="col-sm-3 col-form-label">Mobile</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="hMobile"
                      name="mobile"
                      placeholder="Mobile number"
                      value={horizontalForm.mobile}
                      onChange={handleHorizontalChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="hPassword" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="hPassword"
                      name="password"
                      placeholder="Password"
                      value={horizontalForm.password}
                      onChange={handleHorizontalChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="hRePassword" className="col-sm-3 col-form-label">Re Password</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="hRePassword"
                      name="rePassword"
                      placeholder="Password"
                      value={horizontalForm.rePassword}
                      onChange={handleHorizontalChange}
                    />
                  </div>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberHorizontal"
                    name="remember"
                    checked={horizontalForm.remember}
                    onChange={handleHorizontalChange}
                  />
                  <label className="form-check-label" htmlFor="rememberHorizontal">
                    Remember me
                  </label>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                  <button type="button" className="btn btn-dark">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Form Elements */}
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Basic form elements</h4>
              <p className="card-description">Basic form elements</p>
              <form className="forms-sample">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputName1">Name</label>
                      <input type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail3">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword4">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword4" placeholder="Password" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleSelectGender">Gender</label>
                      <select className="form-select" id="exampleSelectGender">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputCity1">City</label>
                  <input type="text" className="form-control" id="exampleInputCity1" placeholder="Location" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleTextarea1">Textarea</label>
                  <textarea className="form-control" id="exampleTextarea1" rows="4" placeholder="Enter your message..."></textarea>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                  <button type="button" className="btn btn-dark">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .card-description { color: #8e94a9; font-size: 0.875rem; margin-bottom: 1.5rem; }
        .text-primary { color: #9a55ff !important; text-decoration: none; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { font-size: 0.875rem; color: #1f1f1f; margin-bottom: 0.5rem; display: block; font-weight: 400; }
        .form-control { 
          display: block; 
          width: 100%; 
          padding: 0.875rem 1.125rem; 
          font-size: 0.875rem; 
          color: #1f1f1f; 
          background-color: #fff; 
          border: 1px solid #e8ecf1; 
          border-radius: 4px; 
          transition: border-color 0.15s ease-in-out;
        }
        .form-control:focus { 
          outline: none; 
          border-color: #9a55ff; 
          box-shadow: none; 
        }
        .form-control::placeholder { color: #c9c8c8; }
        .form-select {
          display: block;
          width: 100%;
          padding: 0.875rem 1.125rem;
          font-size: 0.875rem;
          color: #1f1f1f;
          background-color: #fff;
          border: 1px solid #e8ecf1;
          border-radius: 4px;
        }
        .form-select:focus { outline: none; border-color: #9a55ff; }
        textarea.form-control { min-height: 120px; resize: vertical; }
        .form-check { margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px; }
        .form-check-input { 
          width: 18px; 
          height: 18px; 
          cursor: pointer; 
          accent-color: #9a55ff;
          margin: 0;
        }
        .form-check-label { font-size: 0.875rem; color: #1f1f1f; cursor: pointer; margin: 0; }
        .form-buttons { margin-top: 1.5rem; }
        .btn { padding: 0.625rem 1.5rem; font-size: 0.875rem; border-radius: 4px; cursor: pointer; border: none; transition: all 0.3s; }
        .btn-gradient-primary { background: linear-gradient(to right, #da8cff, #9a55ff); color: #fff; }
        .btn-gradient-primary:hover { opacity: 0.9; }
        .btn-dark { background: #1f1f1f; color: #fff; }
        .btn-dark:hover { background: #343434; }
        .col-form-label { font-size: 0.875rem; color: #1f1f1f; padding-top: calc(0.875rem + 1px); padding-bottom: calc(0.875rem + 1px); }
        .form-group.row { display: flex; align-items: center; margin-bottom: 1.25rem; }
        .me-2 { margin-right: 0.5rem; }
      `}</style>
    </>
  );
};

export default FormElements;
