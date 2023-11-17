import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function CreateStudent() {
    const navigate = useNavigate();
    const param = useParams();
    const userId = param?.id;
    console.log("userid::::",userId);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    role: "",
    current_address: "",
    permanent_address: "",
    school: "",
    graduation: "",
    profile: null, // Initialize to null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile: file,
    });
  };

  const userUpdate = ()=>{
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("mobileNo", formData.mobileNo);
    formDataToSubmit.append("role", formData.role);
    formDataToSubmit.append(
      "address[current_address]",
      formData.current_address
    );
    formDataToSubmit.append(
      "address[permanent_address]",
      formData.permanent_address
    );
    formDataToSubmit.append("education[school]", formData.school);
    formDataToSubmit.append("education[graduation]", formData.graduation);
    formDataToSubmit.append("profile", formData.profile);

    axios
      .post("http://localhost:3000/api/users/createUser", formDataToSubmit)
      .then((res) => {
        console.log("Student creation response", res.data);
        navigate('/')
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="d-flex vh-100 bg-secondary bg-gradient justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>Add Student</h2>
          <div className="mb-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile No"
              className="form-control"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="current_address"
              placeholder="Current Address"
              className="form-control"
              value={formData.current_address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="permanent_address"
              placeholder="Permanent Address"
              className="form-control"
              value={formData.permanent_address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="school"
              placeholder="School"
              className="form-control"
              value={formData.school}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="graduation"
              placeholder="Graduation"
              className="form-control"
              value={formData.graduation}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="file"
              name="profile"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-2">
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
