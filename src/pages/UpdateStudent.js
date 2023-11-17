import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import bcrypt from "bcryptjs-react";
function UpdateStudent() {
 

    // useEffect(() => {
    //   axios.get('http://localhost:3000/api/users/getUserByid/'+id)
    //     .then((res) => {
    //       setStudents(res.data.data);
    //       console.log("res.data.data", res.data.data)
    //     //   console.log("res.data", res.data)
    //     })
    //     .catch((err) => {
    //       console.log("error", err);
    //     });
    // }, []);




    const navigate = useNavigate();
    const {id} = useParams()
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
 // const salt = bcrypt.genSaltSync(10);
  // Hash the password
//   const hashedPassword = bcrypt.hashSync(formData.password, salt);
//   formData.password=hashedPassword;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       profile: file,
//     });
//   };
const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Generate a new salt

  
    setFormData({
      ...formData,
    //  password: hashedPassword, // Update the password field
      profile: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("mobileNo", formData.mobileNo);
    formDataToSubmit.append("role", formData.role);
    // formDataToSubmit.append(
    //   "address[current_address]",
    //   formData.current_address
    // );
    formDataToSubmit.append(
      "current_address",
      formData.current_address
    );
    formDataToSubmit.append(
      "address[permanent_address]",
      formData.permanent_address
    );
    formDataToSubmit.append("education[school]", formData.school);
    formDataToSubmit.append("education[graduation]", formData.graduation);
    // formDataToSubmit.append("profile", formData.profile);
    console.log("checkimg formDataToSubmit", formDataToSubmit)
    axios
      .patch("http://localhost:3000/api/users/updateUser/"+id, formDataToSubmit)
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
          <h2>Update Student</h2>
         
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
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
