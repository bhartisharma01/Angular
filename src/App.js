import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";import "react-toastify/dist/ReactToastify.css";
import Student from "./pages/Student"
import CreateStudent from './pages/CreateStudent'
import UpdateStudent from './pages/UpdateStudent'
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}/>
          <Route path="/create" element={<CreateStudent />}/>
          <Route path="/update/:id" element={<CreateStudent />}/>
        </Routes>
   
    </BrowserRouter>
  );
}

export default App;
