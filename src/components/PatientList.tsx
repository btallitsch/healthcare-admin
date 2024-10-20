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