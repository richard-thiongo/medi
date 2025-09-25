import { HandCoins, Plus } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import BookingsApi from "../../Apis/Bookings";
import MembersApi from "../../Apis/Members";
import LabApi from "../../Apis/Labs";
import NurseApi from "../../Apis/Nurses";
import AllocationApi from "../../Apis/Allocation"
import { toast } from "react-toastify";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [nurses, setNurses] = useState([]);
  const [nurseId, setNurseId] = useState("");

  const handleShowingModal = (booking) => {
    setSelectedBooking(booking);
    setModalShow(true);
  };

  // fETCH BOOKINGD]S FROM THE BACKEND USING USEEFFECT

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await BookingsApi.getallBookings();
      setTimeout(() => {
        setBookings(response);
        setLoading(false);
      }, 2000);
    };

    fetchBookings();
  }, []);
  //   console.log(bookings);

  //   Instead of displaying member_id, lab_id and dependant_id, fetch the name from the backend using respective API

  useEffect(() => {
    const fetchNames = async () => {
      const updatedBookings = [];

      for (const booking of bookings) {
        if (booking._enriched) return booking;
        //  small delay before each request
        await new Promise((resolve) => setTimeout(resolve, 200));

        const memberResponse = await MembersApi.getMemberById(
          booking?.member_id
        );
        const labResponse = await LabApi.getLabById(booking?.lab_id);
        const dependantResponse = booking.dependant_id
          ? await MembersApi.getDependantById(booking?.dependant_id)
          : null;

        updatedBookings.push({
          ...booking,
          member_name: memberResponse
            ? `${memberResponse?.members?.surname} ${memberResponse?.members?.others}`
            : "N/A",
          lab_name: labResponse ? labResponse?.message?.lab_name : "N/A",
          dependant_name: dependantResponse
            ? `${dependantResponse?.surname} ${dependantResponse?.others}`
            : "N/A",
          _enriched: true,
        });
      }

      setBookings(updatedBookings);
    };

    if (bookings.length > 0) {
      fetchNames();
    }
  }, [bookings]);

  // console.log(bookings);

  // fetch all the nurses from the backend using useEffect

  useEffect(() => {
    const fetchNurses = async () => {
      const response = await NurseApi.getNurses();
      setNurses(response);
    };
    fetchNurses();
  }, []);
  console.log(nurses);


  // funtion to craete allocation
  const handleAllocate = async () => {
    if (!nurseId || !selectedBooking) return 

    const alllocatData = {
      nurse_id: nurseId,
      invoice_no: selectedBooking.invoice_no,
    }
    try {
      const response = await AllocationApi.allocateNurse(alllocatData)
      if (response.message === "Nurse allocated successfully"){
        setTimeout(() => {
          setModalShow(false)
          toast.success("Nurse allocated Successfully")
          setNurseId("")
          setSelectedBooking(null)
        }, 2000);
      }
      else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // A modal to allocate a booking to  a test
  const Modal = () => {
    if (!modalShow) return null;
    return (
      <div class="modal show d-block" tabindex="5">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Allocate Booking</h5>
              <button
                type="button"
                class="btn-close"
                onClick={() => setModalShow(false)}
              ></button>
            </div>
            <div class="modal-body">
              <form action="">
                <div className="m-4 p-4">
                  <select name="" className="form-select" onChange={(e) => setNurseId(e.target.value)}>
                    <option value="">Select Nurse</option>
                    {nurses.nurses.length > 0 &&
                      nurses.nurses.map((nurse) => (
                        <option key={nurse.nurse_id} value={nurse.nurse_id}>
                          {nurse.surname} {nurse.others}
                        </option>
                      ))}
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => setModalShow(false)}
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" onClick={handleAllocate} >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between alimg-items-center mb-3">
        <h2>Bookings</h2>
      </div>

      <div className="mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search bookings..."
        />
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Member Name</th>
              <th>Booked For</th>
              <th>Appointment Date</th>
              <th>Time</th>
              <th>Where Taken</th>
              <th>Status</th>
              <th>Invoice No</th>
              <th>Lab</th>
              <th>Dependant Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.member_name}</td>
                  <td>{booking.booked_for}</td>
                  <td>{booking.appiontment_date}</td>
                  <td>{booking.appointment_time}</td>
                  <td>{booking.where_taken}</td>
                  <td>{booking.status}</td>
                  <td>{booking.invoice_no}</td>
                  <td>{booking.lab_name}</td>
                  <td>{booking.dependant_name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary d-flex flex-row align-items-center"
                      onClick={() => handleShowingModal(booking)}
                    >
                      <span>
                        <HandCoins size={16} className="me-2" />
                      </span>
                      Allocate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center">
                  No Bookings Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal />
      </div>
    </div>
  );
};

export default Bookings;
