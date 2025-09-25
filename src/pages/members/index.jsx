import { Eye, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import MembersApi from "../../Apis/Members";
import { Link } from "react-router-dom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch members from the backend using useEffect
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await MembersApi.getMembers();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setMembers(response.members);
    };
    fetchMembers();
  }, []);
  console.log(members);

  return (
    <div>
      <div className="d-flex justify-content-between alimg-items-center mb-3">
        <h2>Members</h2>
        <button className="btn btn-outline-primary">
          <Plus size={18} className="me-2" />
          Add Member
        </button>
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
      ) : (
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
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.surname}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.gender}</td>
                    <td>{member.reg_date}</td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/members/${member.member_id}`}
                        className="btn btn-sm  me-2 btn-outline-primary"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No members found
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

export default Members;
