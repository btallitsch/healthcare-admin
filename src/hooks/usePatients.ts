import { useState, useEffect } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
}

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Patient[]>('https://api.example.com/patients');
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (newPatient: Omit<Patient, 'id'>) => {
    try {
      setLoading(true);
      const response = await axios.post<Patient>('https://api.example.com/patients', newPatient);
      setPatients(prevPatients => [...prevPatients, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  return { patients, loading, error, fetchPatients, addPatient };
};

export default usePatients;