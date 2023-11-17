import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/api/users/getUsers')
        .then((res) => {
          setStudents(res.data.data);
          console.log("res.data.data", res.data.data)
        //   console.log("res.data", res.data)
        })
        .catch((err) => {
          console.log("error", err);
        });
    }, []);
      
  return (
    <div className='d-flex vh-100 bg-secondary bg-gradient justify-content-center align-items-center'>
        <div className='w-75 bg-white rounded p-3'>
            <Link to='/create' className='btn btn-success'>Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Current Address</th>
                        <th>Permanent Address</th>
                        <th>School</th>
                        <th>Graduation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                     
                       Object.values(student).map((data, i)=>{
                        debugger
                        <tr key={i}>
                            <td>{data.firstName}</td>

                        </tr>
                    })
} */}
                    {students.map((data, i) => (
                        <tr key={i}>
                            <td>{data.id}</td>
                          <td>{data.firstName}</td>
                          <td>{data.lastName}</td>
                          <td>{data.email}</td>
                          <td>{data.mobileNo}</td>
                          <td>{data.role}</td>
                          <td>{data.address.current_address}</td>
                          <td>{data.address.permanent_address}</td>
                          <td>{data.education.school}</td>
                          <td>{data.education.graduation}</td>
                          <td>
                            <Link to={`update/${data.id}`} className='btn btn-primary'>Edit</Link>
                            <Link className='btn btn-danger ms-2'>Delete</Link>
                          </td>

                        </tr>
                      ))}
                </tbody>
              
            </table>
        </div>
    </div>
  )
}

export default Student