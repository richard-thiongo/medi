import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NurseApi from "../../Apis/Nurses";
import LabApi from "../../Apis/Labs";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const EditNurse = () => {
  const { id } = useParams();
  const [prevoiusLab, setPreviousLab] = useState([null]);
  const [labs, setLabs] = useState([]);
  const [passsword, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    surname: "",
    others: "",
    phone: "",
    gender: "",
    email: "",
    lab_id: "",
  });
  // Fetch the currrent nurse details from backend
  useEffect(() => {
    const fetchNurse = async () => {
      const data = await NurseApi.getNurseById(id);
      setForm({
        surname: data.nurse.surname,
        others: data.nurse.others,
        phone: data.nurse.phone,
        gender: data.nurse.gender,
        email: data.nurse.email,
        lab_id: data.nurse.lab_id,
      });
    };
    if (id) {
      fetchNurse();
    }
  }, [id]);
  console.log(form);

  // fetch  previous lab using useEffect from the backend using the lab_id in the form

  useEffect(() => {
    const fetchPreviousLab = async () => {
      const data = await LabApi.getLabById(form.lab_id);
      setPreviousLab(data.message);
    };
    if (form.lab_id) {
      fetchPreviousLab();
    }
  }, [form.lab_id]);

  // Fetch avilable labs from the backend
  useEffect(() => {
    const fetchLabs = async () => {
      const data = await LabApi.getLabs();
      setLabs(data);
    };
    if (id) {
      fetchLabs();
    }
  }, []);

  // Lets handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updateData = {
      nurse_id: id,
      surname: form.surname,
      others: form.others,
      phone: form.phone,
      gender: form.gender,
      email: form.email,
      password: passsword,
      lab_id: form.lab_id,
    };
    const response = await NurseApi.updateNurse(updateData);
    if (response.message === "Nurse updated successfully") {
      setTimeout(() => {
        toast.success("Nurse updated successfully");
        window.location.href = "/nurses";
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Nurse</h2>
      <form action="" className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label">
            Surname
          </label>
          <input
            type="text"
            name="surname"
            className="form-control"
            required
            value={form.surname}
            onChange={(e)=> setForm({...form, surname: e.target.value})}
          />
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
            value={form.others}
            onChange={(e)=> setForm({...form, others: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            required
            className="form-control"
            value={form.email}
            onChange={(e)=> setForm({...form, email: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="phone"
            required
            className="form-control"
            value={form.phone}
            onChange={(e)=> setForm({...form, phone: e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select name="gender" required id="" className="form-select" onChange={(e) => setForm({...form, gender: e.target.value})}>
            <option value={form.gender}>{form.gender}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="lab" className="form-label">
            Lab
          </label>
          <select name="lab" required id="" className="form-select" onChange={(e) => setForm({...form, lab_id: e.target.value})}>
            <option value={form.lab_id}>{prevoiusLab.lab_name}</option>
            {labs.length > 0 &&
              labs.map((lab) => (
                <option value={lab.lab_id}>{lab.lab_name}</option>
              ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            required
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {loading ? (
          <button className="btn btn-primary" disabled>
            <Spinner animation="border" size="sm" />
            <span className="">Loading...</span>
          </button>
        ) : (
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default EditNurse;
