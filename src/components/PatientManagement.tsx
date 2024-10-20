// src/components/PatientManagement.tsx
import React, { useState } from 'react';
import usePatients from '../hooks/usePatients';

const PatientManagement: React.FC = () => {
  const { patients, loading, error, addPatient } = usePatients();
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient({
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender
    });
    setNewPatient({ name: '', age: '', gender: '' });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Patient Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newPatient.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="age"
          value={newPatient.age}
          onChange={handleInputChange}
          placeholder="Age"
          required
        />
        <input
          type="text"
          name="gender"
          value={newPatient.gender}
          onChange={handleInputChange}
          placeholder="Gender"
          required
        />
        <button type="submit">Add Patient</button>
      </form>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>{patient.name} - Age: {patient.age}, Gender: {patient.gender}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientManagement;