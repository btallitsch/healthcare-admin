// src/components/PatientList.tsx
import React, { useMemo, useCallback } from 'react';
import { Patient } from '../types/common';

interface PatientListProps {
  patients: Patient[];
  onPatientSelect: (patient: Patient) => void;
}

const PatientListItem: React.FC<{ patient: Patient; onSelect: (patient: Patient) => void }> = React.memo(
  ({ patient, onSelect }) => {
    console.log(`Rendering PatientListItem for ${patient.name}`);
    return (
      <li onClick={() => onSelect(patient)}>
        {patient.name} - Age: {patient.age}, Gender: {patient.gender}
      </li>
    );
  }
);

const PatientList: React.FC<PatientListProps> = ({ patients, onPatientSelect }) => {
  // Use useMemo to memoize the sorted patients array
  const sortedPatients = useMemo(() => {
    console.log('Sorting patients');
    return [...patients].sort((a, b) => a.name.localeCompare(b.name));
  }, [patients]);

  // Use useCallback to memoize the onSelect function
  const handlePatientSelect = useCallback((patient: Patient) => {
    console.log(`Selected patient: ${patient.name}`);
    onPatientSelect(patient);
  }, [onPatientSelect]);

  return (
    <ul>
      {sortedPatients.map(patient => (
        <PatientListItem 
          key={patient.id} 
          patient={patient} 
          onSelect={handlePatientSelect} 
        />
      ))}
    </ul>
  );
};

export default React.memo(PatientList);

// src/components/PatientDashboard.tsx
import React, { useState, useMemo } from 'react';
import PatientList from './PatientList';
import { Patient } from '../types/common';
import usePatients from '../hooks/usePatients';

const PatientDashboard: React.FC = () => {
  const { patients, loading, error } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Use useMemo to calculate statistics only when the patients array changes
  const patientStats = useMemo(() => {
    console.log('Calculating patient stats');
    const totalPatients = patients.length;
    const averageAge = patients.reduce((sum, patient) => sum + patient.age, 0) / totalPatients;
    const genderDistribution = patients.reduce((acc, patient) => {
      acc[patient.gender] = (acc[patient.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalPatients, averageAge, genderDistribution };
  }, [patients]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <div>
        <h3>Patient Statistics</h3>
        <p>Total Patients: {patientStats.totalPatients}</p>
        <p>Average Age: {patientStats.averageAge.toFixed(2)}</p>
        <p>Gender Distribution:</p>
        <ul>
          {Object.entries(patientStats.genderDistribution).map(([gender, count]) => (
            <li key={gender}>{gender}: {count}</li>
          ))}
        </ul>
      </div>
      <PatientList patients={patients} onPatientSelect={setSelectedPatient} />
      {selectedPatient && (
        <div>
          <h3>Selected Patient</h3>
          <p>Name: {selectedPatient.name}</p>
          <p>Age: {selectedPatient.age}</p>
          <p>Gender: {selectedPatient.gender}</p>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;