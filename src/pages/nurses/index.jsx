import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import NurseApi from "../../Apis/Nurses";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
const Nurses = () => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  // fetch nurses using useEffect
  useEffect(()=>{
    const fetchNurses = async () => {
      const response = await NurseApi.getNurses()
      setTimeout(() => {
        setLoading(false)
      }, 1000);
      setNurses(response.nurses)
      
    }
    fetchNurses()
  },[])
  console.log(nurses);
  return (
    <div>
      <div className="d-flex justify-content-between alimg-items-center mb-3">
        <h2>Nurses</h2>
        <Link to="/nurses/add" className="btn btn-outline-primary">
          <Plus size={18} className="me-2" />
          Add Nurse
        </Link>
      </div>

      <div className="mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search nurses..."
        />
      </div>
      {loading ? (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    
      ):(
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Reg Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {nurses.length > 0 ? ( nurses.map((nurse, index) => (
            <tr key={nurse.id}>
              <td>{index +1}</td>
              <td>{nurse.surname}</td>
              <td>{nurse.email}</td>
              <td>{nurse.phone}</td>
              <td>{nurse.gender}</td>
              <td>{nurse.reg_date}</td>
              <td className="d-flex gap-2">
                {/* the view button to navigate to  the view nurse page */}
              <Link to={`/nurses/view/${nurse.nurse_id}`} className="btn btn-sm btn-outline-primary">View</Link>
                <Link to={`/nurses/edit/${nurse.nurse_id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
              </td>
            </tr>
          )) ):
          (
            <tr>
              <td colSpan={7} className="text-center">No nurses found</td>
            </tr>
          )
        }
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default Nurses;
