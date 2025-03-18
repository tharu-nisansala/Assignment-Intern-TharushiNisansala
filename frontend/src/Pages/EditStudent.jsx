import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
  const [student, setStudent] = useState({ name: '', age: '', status: 'Active', image: null });
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch student data
  useEffect(() => {
    axios.get(`http://localhost:3001/api/students/${id}`)
      .then((response) => setStudent(response.data))
      .catch((error) => console.error('Error fetching student:', error));
  }, [id]);

  // Handle form submission for updating student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', student.name);
    formData.append('age', student.age);
    formData.append('status', student.status);
    if (student.image) {
      formData.append('image', student.image);
    }

    try {
      await axios.put(`http://localhost:3001/api/students/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/students');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-300 to-purple-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">Edit Student</h1>
        <form onSubmit={handleUpdateStudent}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
            <input
              type="text"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Age</label>
            <input
              type="number"
              value={student.age}
              onChange={(e) => setStudent({ ...student, age: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
            <select
              value={student.status}
              onChange={(e) => setStudent({ ...student, status: e.target.value })}
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
              onChange={(e) => setStudent({ ...student, image: e.target.files[0] })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
