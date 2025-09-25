import React, { useEffect, useState } from "react";
import LabApi from "../../Apis/Labs";
import NurseApi from "../../Apis/Nurses";
import { toast } from "react-toastify";

const AddNurse = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [othername, setOthername] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [lab_id, setLab_id] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const nurseData = {
      surname : surname,
      others : othername,
      phone : phone,
      gender : gender,
      email : email,
      password : password,
      lab_id : lab_id
    }


    const response = await NurseApi.addNurse(nurseData);
    if (response.message === "Nurse registered successfully") {
        setTimeout(() => {
            setLoading(false);
            toast.success("Nurse registered successfully");
            window.location.href = "/nurses";
        }, 2000);

    }
    else {
        toast.error("Something went wrong. Please try again.");

    }
    
  }

  // fetch the available labs using useeffect
  useEffect(() => {
    const fetchLabs = async () => {
      const response = await LabApi.getLabs();
      setLabs(response.labs);
    };
    fetchLabs();
  });
  console.log(labs);
  return (
    <div className="container mt-4">
      <h2>Add Nurse</h2>
      <form action="" className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label" >
            Surname
          </label>
          <input type="text" name="surname" className="form-control" required onChange={(e) => setSurname(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="othername" className="form-label">
            Other Name
          </label>
          <input
            type="text"
            name="othername"
            className="form-control"
            required
            onChange={(e) => setOthername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" required className="form-control" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input type="phone" required className="form-control" onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select name="gender" required id="" className="form-select" onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="lab" className="form-label">
            Lab
          </label>
          <select name="lab" required id="" className="form-select" onChange={(e) => setLab_id(e.target.value)}>
            <option value="">Select Lab</option>
            {labs.length > 0 && labs.map((lab) => (
              <option value={lab.lab_id}>{lab.lab_name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" required className="form-control" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddNurse;
