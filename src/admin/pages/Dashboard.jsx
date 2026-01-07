import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const doughnutChartInstance = useRef(null);

  useEffect(() => {
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }
    if (doughnutChartInstance.current) {
      doughnutChartInstance.current.destroy();
    }

    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");
      barChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
          datasets: [
            {
              label: "CHN",
              data: [50, 120, 40, 100, 60, 120, 50, 100],
              backgroundColor: "#b66dff",
              borderRadius: 5,
              barThickness: 12,
            },
            {
              label: "USA",
              data: [80, 160, 70, 130, 100, 150, 90, 70],
              backgroundColor: "#1bcfb4",
              borderRadius: 5,
              barThickness: 12,
            },
            {
              label: "UK",
              data: [40, 60, 30, 80, 40, 60, 50, 30],
              backgroundColor: "#fe7c96",
              borderRadius: 5,
              barThickness: 12,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              align: "end",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                padding: 20,
                font: { size: 12 }
              },
            },
          },
          scales: {
            x: { 
              grid: { display: false },
              ticks: { font: { size: 11 }, color: '#9c9fa6' }
            },
            y: { 
              grid: { borderDash: [3, 3], color: '#ebedf2' }, 
              beginAtZero: true,
              ticks: { font: { size: 11 }, color: '#9c9fa6' }
            },
          },
        },
      });
    }

    if (doughnutChartRef.current) {
      const ctx2 = doughnutChartRef.current.getContext("2d");
      doughnutChartInstance.current = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: ["Search Engines 30%", "Direct Click 30%", "Bookmarks Click 40%"],
          datasets: [
            {
              data: [30, 30, 40],
              backgroundColor: ["#047edf", "#1bcfb4", "#fe7c96"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: { 
                usePointStyle: true, 
                pointStyle: "circle",
                padding: 15,
                font: { size: 12 }
              },
            },
          },
        },
      });
    }

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();
    };
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white">
            <i className="mdi mdi-home"></i>
          </span>
          Dashboard
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle ms-1"></i>
            </li>
          </ul>
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='150' cy='50' r='100' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='180' cy='100' r='60' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E" className="card-img-absolute" alt="circle" />
              <h4 className="mb-3">
                Weekly Sales
                <i className="mdi mdi-chart-line mdi-24px float-end"></i>
              </h4>
              <h2 className="mb-5">$ 15,0000</h2>
              <h6 className="card-text">Increased by 60%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='150' cy='50' r='100' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='180' cy='100' r='60' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E" className="card-img-absolute" alt="circle" />
              <h4 className="mb-3">
                Weekly Orders
                <i className="mdi mdi-bookmark-outline mdi-24px float-end"></i>
              </h4>
              <h2 className="mb-5">45,6334</h2>
              <h6 className="card-text">Decreased by 10%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='150' cy='50' r='100' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='180' cy='100' r='60' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E" className="card-img-absolute" alt="circle" />
              <h4 className="mb-3">
                Visitors Online
                <i className="mdi mdi-diamond mdi-24px float-end"></i>
              </h4>
              <h2 className="mb-5">95,5741</h2>
              <h6 className="card-text">Increased by 5%</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Visit And Sales Statistics</h4>
              <div style={{ height: '280px' }}>
                <canvas ref={barChartRef} id="visit-sale-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Traffic Sources</h4>
              <div style={{ height: '280px' }}>
                <canvas ref={doughnutChartRef} id="traffic-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tickets Table */}
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Tickets</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Assignee</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Last Update</th>
                      <th>Tracking ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="face" />
                        David Grey
                      </td>
                      <td>Fund is not received</td>
                      <td><span className="badge badge-gradient-success">DONE</span></td>
                      <td>Dec 5, 2017</td>
                      <td>WD-12345</td>
                    </tr>
                    <tr>
                      <td>
                        <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="face" />
                        Stella Johnson
                      </td>
                      <td>High loading time</td>
                      <td><span className="badge badge-gradient-warning">PROGRESS</span></td>
                      <td>Dec 12, 2017</td>
                      <td>WD-12346</td>
                    </tr>
                    <tr>
                      <td>
                        <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="face" />
                        Marina Michel
                      </td>
                      <td>Website down for one week</td>
                      <td><span className="badge badge-gradient-info">ON HOLD</span></td>
                      <td>Dec 16, 2017</td>
                      <td>WD-12347</td>
                    </tr>
                    <tr>
                      <td>
                        <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="face" />
                        John Doe
                      </td>
                      <td>Loosing control on server</td>
                      <td><span className="badge badge-gradient-danger">REJECTED</span></td>
                      <td>Dec 3, 2017</td>
                      <td>WD-12348</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
