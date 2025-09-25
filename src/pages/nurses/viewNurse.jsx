import { ArrowBigLeft, Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NurseApi from "../../Apis/Nurses";
import { useParams } from "react-router-dom";
const ViewNurse = () => {
  const [loading, setLoading] = useState(null);
  const [nurse, setNurse] = useState([]);
  const [nurseAllocations, setNurseAllocations] = useState([]);
  const [loadingNurseAllocations, setLoadingNurseAllocations] = useState(true);
  // const for getting the allocation of the nurse from the url
  const { id } = useParams();

  // fetch nurse using useEffect by id from the url
  useEffect(() => {
    const fetchNurse = async () => {
      const response = await NurseApi.getNurseById(id);
      setNurse(response.nurse);
      setLoading(false);
    };
    fetchNurse();
  }, [id]);

  console.log(nurse);

  // fetch nurse allocation using useEffect by id from the url
  useEffect(() => {
    const fetchNurseAllocation = async () => {
      const response = await NurseApi.getNurseAllocations(id);
      if (response.message === "Nurse allocations not found") {
        setNurseAllocations([]);
      } else {
        setNurseAllocations(response.message);
      }
      setLoadingNurseAllocations(false);
    };
    if (id) {
      fetchNurseAllocation();
    }
  }, [id]);

  console.log(nurseAllocations);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>View Nurse</h2>
        <Link to="/nurses" className="btn btn-outline-primary">
          <ArrowBigLeft size={18} className="me-2" />
          Back
        </Link>
      </div>

      <div className="card shadow-sm">
        {loading ? (
          <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="card-body">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h4>Name: {`${nurse.surname} ${nurse.others}`} </h4>
              <h4>Email: {nurse.email}</h4>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h4>Phone: {nurse.phone}</h4>
              <h4>Gender:{nurse.gender}</h4>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h4>Registration Date: {nurse.reg_date}</h4>
            </div>
          </div>
        )}
      </div>


      {/* Table to nurse allocations */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="card-title">Nurse Allocations</h4>
        </div>
        <div className="card-body">
          {loadingNurseAllocations ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Invoice no</th>
                  <th scope="col">Reg Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {nurseAllocations.map((nurseAllocation) => (
                  <tr key={nurseAllocation.id}>
                    <td>{nurseAllocation.invoice_no}</td>
                    <td>{nurseAllocation.reg_date}</td>
                    <td>{nurseAllocation.flag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>  
    </div>
  );
};

export default ViewNurse;
