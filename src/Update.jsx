import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const validate = () => {
    let temp = {};

    if (!values.firstname.trim()) temp.firstname = "First name is required";

    if (!values.lastname.trim()) temp.lastname = "Last name is required";

    if (!values.email.trim()) temp.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      temp.email = "Invalid email format";

    if (!values.phone.trim()) temp.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(values.phone))
      temp.phone = "Phone must be 10 digits";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!validate()) return;

    axios
      .put(`http://localhost:3000/users/${id}`, values)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="mb-4">Update User</h1>

        <form onSubmit={handleUpdate} noValidate>
          {/* First Name */}
          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstname && "is-invalid"}`}
              value={values.firstname}
              onChange={(e) =>
                setValues({ ...values, firstname: e.target.value })
              }
            />
            <div className="invalid-feedback">{errors.firstname}</div>
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastname && "is-invalid"}`}
              value={values.lastname}
              onChange={(e) =>
                setValues({ ...values, lastname: e.target.value })
              }
            />
            <div className="invalid-feedback">{errors.lastname}</div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              className={`form-control ${errors.phone && "is-invalid"}`}
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>

          <button className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
