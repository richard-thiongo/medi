import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import LabApi from "../../Apis/Labs";
import { Link } from "react-router-dom";

const Labs = () => {
    
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch labs using useEffect
    useEffect(() => {
      const fetchLabs = async () => {
        const response = await LabApi.getLabs();
        setLabs(response.labs);
        setLoading(false);
        console.log(response);
      };
      fetchLabs();
    }, []);
    console.log(labs);
    
  return (
    <div>
      <div className="d-flex justify-content-between alimg-items-center mb-3">
        <h2>Labs</h2>
        <button className="btn btn-outline-primary">
          <Plus size={18} className="me-2" />
          Add Lab
        </button>
      </div>

      <div className="mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search labs..."
        />
      </div>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Permit ID</th>
                <th>Reg Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {labs.length > 0 ? (
                labs.map((lab, index) => (
                  <tr key={lab.id}>
                    <td>{index + 1}</td>
                    <td>{lab.lab_name}</td>
                    <td>{lab.email}</td>
                    <td>{lab.phone}</td>
                    <td>{lab.permit_id}</td>
                    <td>{lab.reg_date}</td>
                    <td className="d-flex gap-2">
                      <Link to={`/labs/${lab.lab_id}`} className="btn btn-sm btn-outline-primary">
                        View
                      </Link>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No labs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Labs;
