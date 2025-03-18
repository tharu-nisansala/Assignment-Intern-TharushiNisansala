import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', status: 'Active', image: null });
  const navigate = useNavigate();

  // Fetch students data
  useEffect(() => {
    axios.get('http://localhost:3001/api/students')
      .then((response) => {
        console.log('Fetched students:', response.data); // Log the fetched data
        setStudents(response.data);
      })
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newStudent.name);
    formData.append('age', newStudent.age);
    formData.append('status', newStudent.status);
    if (newStudent.image) {
      formData.append('image', newStudent.image);
    }

    try {
      await axios.post('http://localhost:3001/api/students', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form fields after adding student
      setNewStudent({ name: '', age: '', status: 'Active', image: null });

      // Fetch the latest student list after adding new student
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Fetch students data (to be used after adding a student)
  const fetchStudents = () => {
    axios.get('http://localhost:3001/api/students')
      .then((response) => {
        console.log('Fetched students after adding:', response.data); // Log the updated list
        setStudents(response.data);
      })
      .catch((error) => console.error('Error fetching students:', error));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setNewStudent({ ...newStudent, image: e.target.files[0] });
  };

  // Edit student
  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  // Delete student
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/students/${id}`)
      .then(() => {
        // Fetch updated list after deletion
        fetchStudents();
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  return (
    <div className="min-h-screen p-6  bg-gradient-to-r from-blue-300 to-purple-400">
      <h1 className="text-3xl font-semibold mb-10 text-center ">Student Management</h1>

      
      {/* Display student list */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Age</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="px-6 py-3">{student._id}</td>
                  <td className="px-6 py-3">{student.name}</td>
                  <td className="px-6 py-3">{student.age}</td>
                  <td className="px-6 py-3">{student.status}</td>
                  <td className="px-6 py-3">
                    <img src={student.image} alt="Student" width="50" className="rounded-md" />
                  </td>
                  <td className="px-6 py-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(student._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 p-10 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add New Student Form */}
      <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Student</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Age</label>
          <input
            type="number"
            placeholder="Age"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
          <select
            value={newStudent.status}
            onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Profile Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Add Student
        </button>
      </form>

    </div>
  );
}

export default Students;
