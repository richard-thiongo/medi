import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MembersApi from "../../Apis/Members";
import { Spinner } from "react-bootstrap";

const ViewMember = () => {
  const [member, setMember] = useState(null);
  const [dependants, setDependants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [loadingDependants, setLoadingDependants] = useState(true);

  // fetch the meber using useEffect by id from the url
  useEffect(() => {
    const fetchMember = async () => {
      const response = await MembersApi.getMemberById(id);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setMember(response);
    };
    fetchMember();
  }, [id]);
  console.log(member);

  useEffect(() => {
    const fetchDependants = async () => {
      const response = await MembersApi.getMemberDependants(id);
      setTimeout(() => {
        setLoadingDependants(false);
      }, 2000);
      setDependants(response);
    };
    fetchDependants();
  }, [id]);
  console.log(dependants.dependants);

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2>Member Details</h2>
        <Link to="/members" className="btn btn-outline-secondary">
          <ArrowBigLeft size={16} className="me-2" />
          Back
        </Link>
      </div>

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
              <h4>Name: {member?.members?.surname}</h4>
              <h4>Other Name: {member?.members?.others}</h4>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h4>Phone:{member?.members?.phone}</h4>
              <h4>Email:{member?.members?.email}</h4>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h4>Gender:{member?.members?.gender}</h4>
              <h4>DOB: {member?.members?.dob}</h4>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <h4>Status:{member?.members?.status===1? "Active ": "Inactive"}</h4>
              <h4>Location:{member?.members?.location_id}</h4>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h4>Registration Date:{member?.members?.reg_date}</h4>
            </div>
          </div>
        )}
      </div>
      {/* Table to show the member dependants */}

      <div className="mt-4">
        <h3>Dependants</h3>
        <div className="table-responsive">
          {loadingDependants ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="success" />
            </div>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th> Frist Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Registration Date</th>
                </tr>
              </thead>

              <tbody>
                {dependants.dependants.length > 0 ? (
                    dependants.dependants.map((dependant,index)=>(
                        <tr key={dependant?.dependant_id}>
                            <td>{index+1}</td>
                            <td>{dependant?.surname}</td>
                            <td>{dependant?.others}</td>
                            <td>{dependant?.dob}</td>
                            <td>{dependant?.reg_date}</td>
                        </tr>
                    ))

                ) : (
                    <tr>
                        <td colspan={5}>No Dependants found</td>
                    </tr>
                
                )}
                
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMember;
