import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AllocationApi from "../../Apis/Allocation"; 

const Allocations = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch allocations using useEffect
  useEffect(() => {
    const fetchAllocations = async () => {
      const response = await AllocationApi.getAllocations();
      setAllocations(response.message);
      setLoading(false);
    };
    fetchAllocations();
  }, []);
   

  console.log(allocations);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Allocations</h2>
        <button className="btn btn-outline-primary">
          <Plus size={18} className="me-2" />
          Add Allocation
        </button>
      </div>

      <div className="mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search allocations..."
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
                <th>Nurse ID</th>
                <th>Invoice No.</th>
                <th>Status</th>
                <th>Reg Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allocations.length > 0 ? (
                allocations.map((allocation) => (
                  <tr key={allocation.allocation_id}>
                    <td>{allocation.nurse_id}</td>
                    <td>{allocation.invoice_no}</td>
                    <td>{allocation.flag}</td>
                    <td>{allocation.reg_date}</td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary">
                        View
                      </button>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No allocations found
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

export default Allocations;
