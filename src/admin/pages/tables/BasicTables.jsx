import React from "react";

const BasicTables = () => {
  const tableData = [
    { name: "Jacob", vatNo: "53275531", created: "12 May 2017", status: "Pending", statusColor: "danger" },
    { name: "Messsy", vatNo: "53275532", created: "15 May 2017", status: "In progress", statusColor: "warning" },
    { name: "John", vatNo: "53275533", created: "14 May 2017", status: "Fixed", statusColor: "info" },
    { name: "Peter", vatNo: "53275534", created: "16 May 2017", status: "Completed", statusColor: "success" },
    { name: "Dave", vatNo: "53275535", created: "20 May 2017", status: "In progress", statusColor: "warning" },
  ];

  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Basic Tables</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#" className="text-primary">Tables</a></li>
            <li className="breadcrumb-item active">Basic tables</li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Basic Table</h4>
              <p className="card-description">
                Add class <code>.table</code>
              </p>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>VatNo.</th>
                      <th>Created</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.vatNo}</td>
                        <td>{row.created}</td>
                        <td>
                          <span className={`badge badge-${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Table with hover</h4>
              <p className="card-description">
                Add class <code>.table-hover</code>
              </p>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Product</th>
                      <th>Sale</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jacob</td>
                      <td>Photoshop</td>
                      <td className="text-danger">29%<i className="mdi mdi-arrow-down"></i></td>
                      <td><span className="badge badge-danger">Pending</span></td>
                    </tr>
                    <tr>
                      <td>Messsy</td>
                      <td>Flash</td>
                      <td className="text-success">35%<i className="mdi mdi-arrow-up"></i></td>
                      <td><span className="badge badge-success">Done</span></td>
                    </tr>
                    <tr>
                      <td>John</td>
                      <td>Premier</td>
                      <td className="text-danger">27%<i className="mdi mdi-arrow-down"></i></td>
                      <td><span className="badge badge-warning">In progress</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Table with striped rows</h4>
              <p className="card-description">
                Add class <code>.table-striped</code>
              </p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>First name</th>
                      <th>Progress</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="user" style={{width: '36px', height: '36px', borderRadius: '50%'}} />
                      </td>
                      <td>Herman Beck</td>
                      <td>
                        <div className="progress" style={{height: '8px'}}>
                          <div className="progress-bar bg-gradient-success" style={{width: '25%'}}></div>
                        </div>
                      </td>
                      <td>$ 77.99</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="user" style={{width: '36px', height: '36px', borderRadius: '50%'}} />
                      </td>
                      <td>Messsy Adam</td>
                      <td>
                        <div className="progress" style={{height: '8px'}}>
                          <div className="progress-bar bg-gradient-danger" style={{width: '75%'}}></div>
                        </div>
                      </td>
                      <td>$245.30</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="user" style={{width: '36px', height: '36px', borderRadius: '50%'}} />
                      </td>
                      <td>John Richards</td>
                      <td>
                        <div className="progress" style={{height: '8px'}}>
                          <div className="progress-bar bg-gradient-warning" style={{width: '90%'}}></div>
                        </div>
                      </td>
                      <td>$138.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .badge-danger { background: #fe7c96; color: #fff; padding: 5px 10px; border-radius: 3px; font-size: 12px; font-weight: 400; }
        .badge-warning { background: #fed713; color: #1f1f1f; padding: 5px 10px; border-radius: 3px; font-size: 12px; font-weight: 400; }
        .badge-info { background: #198ae3; color: #fff; padding: 5px 10px; border-radius: 3px; font-size: 12px; font-weight: 400; }
        .badge-success { background: #1bcfb4; color: #fff; padding: 5px 10px; border-radius: 3px; font-size: 12px; font-weight: 400; }
        .card-description { color: #8e94a9; font-size: 0.875rem; margin-bottom: 1rem; }
        .card-description code { color: #fe7c96; background: #f8f9fa; padding: 2px 6px; border-radius: 3px; }
        .text-primary { color: #9a55ff !important; text-decoration: none; }
      `}</style>
    </>
  );
};

export default BasicTables;
