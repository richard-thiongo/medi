import React, { use, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import NursesApi from "../../Apis/Nurses";
import LabsApi from "../../Apis/Labs";
import MembersApi from "../../Apis/Members";
import BookingsApi from "../../Apis/Bookings";

// // Sample data for the line chart
// const monthlyTestsData = [
//   { month: 'Aug', tests: 1150 },
//   { month: 'Aug', tests: 1100 },
//   { month: 'Aug', tests: 1050 },
//   { month: 'Aug', tests: 1000 },
//   { month: 'Sep', tests: 980 },
//   { month: 'Sep', tests: 950 },
//   { month: 'Sep', tests: 920 },
//   { month: 'Sep', tests: 900 },
//   { month: 'Sep', tests: 850 },
//   { month: 'Oct', tests: 800 },
//   { month: 'Oct', tests: 750 },
//   { month: 'Oct', tests: 700 }
// ];



const DashboardHome = () => {
  const [nursesCount, setNursesCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [labsCount, setLabsCount] = useState(0);
  const [labTests, setLabTests] = useState([]);
  const [count, setCount] = useState({}); 

  // fetch all nurses from the backend using useEffect and count them and display the count on the dashboard
  // fetch members from the backend using useEffect and count them and display the count on the dashboard
  // fetch labs from the backend using useEffect and count them and display the count on the dashboard
  useEffect(() => {
    // fetch nurses
    const fetchNurses = async () => {
      const response = await NursesApi.getNurses();
      setNursesCount(response?.nurses?.length);
    };
    fetchNurses();
    // fetch members
    const fetchMembers = async () => {
      const response = await MembersApi.getMembers();
      setMembersCount(response?.members?.length);
    };
    fetchMembers();
    // fetch labs
    const fetchLabs = async () => {
      const response = await LabsApi.getLabs();
      setLabsCount(response?.labs?.length);
    };
    fetchLabs();

    const countMemberandDependants = async () => {
      const response = await MembersApi.countMembersAndDependants();
      setCount(response.members);
    }
    countMemberandDependants();
  }, []);
  console.log("this is the count",count);


  // Data for pie chart
const pieData = [
  { name: "Dependants", value: count?.total_dependants, color: "#4285f4" },
  { name: "Members", value: count?.total_members, color: "#a855f7" },
];




  // fetch the labs tests from the backend using useEffect
  useEffect(() => {
    const fetchLabsTests = async () => {
      const response = await LabsApi.geTestsPerMonth();
      setLabTests(response);
    };
    fetchLabsTests();
  }, []);
  console.log(labTests);

  const monthOrder = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const monthlyTestsData = labTests
    ?.map((item) => ({
      month: item.month,
      tests: item.total,
    }))
    ?.sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);

  return (
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark">Welcome Admin !</h2>
        <p className="text-muted">Some quick analysis of the MedLab LTD</p>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-sm"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <h6 className="card-subtitle mb-1 opacity-75">
                    Total nurses
                  </h6>
                  <h2 className="card-title mb-0 fw-bold">{nursesCount}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-sm"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V1h-2v1H8V1H6v1H4.5C3.67 2 3 2.67 3 3.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zm0 16.5h-15V7h15v10.5z" />
                  </svg>
                </div>
                <div>
                  <h6 className="card-subtitle mb-1 opacity-75">Total labs</h6>
                  <h2 className="card-title mb-0 fw-bold">{labsCount}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-sm"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01 1.01l-2.54 3.4c-.36.48-.85.85-1.45.99v2.16c.8-.14 1.54-.48 2.14-1l1.86-2.5v8h2z" />
                  </svg>
                </div>
                <div>
                  <h6 className="card-subtitle mb-1 opacity-75">
                    Total members
                  </h6>
                  <h2 className="card-title mb-0 fw-bold">{membersCount}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        {/* Line Chart */}
        <div className="col-md-8 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h6 className="card-title mb-4 text-dark fw-semibold">
                Members & Dependants monthly tests.
              </h6>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTestsData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                    />
                    <YAxis
                      domain={["dataMin - 100", "dataMax + 100"]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="tests"
                      stroke="#4285f4"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h6 className="card-title mb-4 text-dark fw-semibold">
                Members to their Dependants pie chart.
              </h6>
              <div style={{ height: "200px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={80}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#a855f7",
                      }}
                    ></div>
                    <small className="text-muted">Members</small>
                  </div>
                  <small className="fw-semibold">{
                    ((count?.total_members / (count?.total_members + count?.total_dependants)) * 100).toFixed(2)
                    }%
                    </small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#4285f4",
                      }}
                    ></div>
                    <small className="text-muted">Dependants</small>
                  </div>
                  <small className="fw-semibold">
                    {
                      ((count?.total_dependants / (count?.total_members + count?.total_dependants)) * 100).toFixed(2)
                     }%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap CSS CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </div>
  );
};

export default DashboardHome;
