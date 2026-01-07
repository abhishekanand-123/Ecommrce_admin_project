import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const ChartJs = () => {
  useEffect(() => {
    const charts = [];

    charts.push(
      new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [{
            label: "Sales",
            data: [12, 19, 3, 5, 2],
            borderColor: "#b66dff",
            backgroundColor: "rgba(182,109,255,0.2)",
            fill: true,
          }],
        },
      })
    );

    charts.push(
      new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [{
            label: "Votes",
            data: [12, 19, 3],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
          }],
        },
      })
    );

    charts.push(
      new Chart(document.getElementById("doughnutChart"), {
        type: "doughnut",
        data: {
          labels: ["Desktop", "Tablet", "Mobile"],
          datasets: [{
            data: [60, 25, 15],
            backgroundColor: ["#4bc0c0", "#ff9f40", "#9966ff"],
          }],
        },
      })
    );

    return () => charts.forEach(chart => chart.destroy());
  }, []);

  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Chart JS</h3>
      </div>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Line Chart</h4>
              <canvas id="lineChart"></canvas>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Bar Chart</h4>
              <canvas id="barChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Doughnut Chart</h4>
              <canvas id="doughnutChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartJs;
