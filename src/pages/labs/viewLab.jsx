import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LabApi from "../../Apis/Labs";
import { Spinner } from "react-bootstrap";

const ViewLab = () => {
  const [lab, setLab] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [labTests, setLabTests] = useState([]);
  const [loadingLabTests, setLoadingLabTests] = useState(true);
  // fetch the lad using useEffect by id from the url
  useEffect(() => {
    const fetchLab = async () => {
      const response = await LabApi.getLabById(id);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setLab(response);
    };
    fetchLab();
  }, [id]);
  console.log(lab);

  // fetch the lab tests using useeffect by id from the url
  useEffect(() => {
    const fetchLabTests = async () => {
      const response = await LabApi.getlabTests(id);
      console.log("this is it", response);
      setTimeout(() => {
        setLoadingLabTests(false);
      }, 2000);
      setLabTests(response);
    };
    fetchLabTests();
  }, [id]);
  console.log(labTests);
  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2>Lab Details</h2>
        <Link to="/labs" className="btn btn-outline-primary">
          <ArrowBigLeft size={18} className="me-2" />
          Back
        </Link>
      </div>

      {/* card to show the lab details e.g email, lab Name, permit ID, Phone and Registration Date */}
      <div className="card shadow-sm">
        {loading ? (
          <div className="card-body">
            <div className="text-center my-5">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h3>Name: {lab?.message?.lab_name} </h3>
              <h3>Email:{lab?.message?.email}</h3>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h3>Permit ID:{lab?.message?.permit_id}</h3>
              <h3>Phone:{lab?.message?.phone}</h3>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h3>Registration Date:{lab?.message?.reg_date}</h3>
            </div>
          </div>
        )}
      </div>

      {/* Card to show the lab tests */}

      <div className="card shadow-sm my-3">
        <div className="card-header">
          <h3>Lab Tests</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Test Price</th>
                <th>Test Discount</th>
                <th>Test Description</th>
                <th>Status</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>
              {loadingLabTests ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <Spinner animation="border" variant="success" />
                  </td>
                </tr>
              ) : (
                labTests.length > 0 &&
                labTests.map((test) => (
                  <tr key={test.id}>
                    <td>{test.test_name}</td>
                    <td>{test.test_cost}</td>
                    <td>{test.test_discount}</td>
                    <td>{test.test_description}</td>
                    <td>{test.availability}</td>
                    <td>{test.more_info}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLab;
