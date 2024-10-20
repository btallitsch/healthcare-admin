// src/types/common.ts

// Generic type for API responses
type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
  };
  
  // Utility type for making all properties of an object optional
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };
  
  // Utility type for making all properties of an object required
  type Required<T> = {
    [P in keyof T]-?: T[P];
  };
  
  // Utility type for picking specific properties from an object
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  
  // Define a more complex Patient type
  type Patient = {
    id: number;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    contact: {
      email: string;
      phone: string;
    };
    medicalHistory: {
      conditions: string[];
      allergies: string[];
      medications: Array<{
        name: string;
        dosage: string;
        frequency: string;
      }>;
    };
  };
  
  // Use utility types to create new types based on Patient
  type PatientSummary = Pick<Patient, 'id' | 'name' | 'age' | 'gender'>;
  type PartialPatient = Partial<Patient>;
  
  // Generic function to fetch data from API
  async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    const data = await response.json();
    return {
      data: data as T,
      status: response.status,
      message: response.statusText,
    };
  }
  
  // Usage example
  const fetchPatients = () => fetchData<Patient[]>('/api/patients');
  const fetchPatient = (id: number) => fetchData<Patient>(`/api/patients/${id}`);
  
  // Function overloading
  function getProp(obj: Patient, key: 'id'): number;
  function getProp(obj: Patient, key: 'name'): string;
  function getProp(obj: Patient, key: 'age'): number;
  function getProp(obj: Patient, key: string): any {
    return obj[key as keyof Patient];
  }
  
  // Conditional types
  type IsString<T> = T extends string ? true : false;
  type A = IsString<string>; // true
  type B = IsString<number>; // false
  
  // Mapped types
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  
  type ReadonlyPatient = Readonly<Patient>;
  
  // Template literal types
  type EmailLocale = 'en-US' | 'fr-FR' | 'es-ES';
  type EmailSubject<T extends EmailLocale> = T extends 'en-US' 
    ? 'Welcome' 
    : T extends 'fr-FR' 
      ? 'Bienvenue' 
      : 'Bienvenido';
  
  const getEmailSubject = <T extends EmailLocale>(locale: T): EmailSubject<T> => {
    switch (locale) {
      case 'en-US':
        return 'Welcome' as EmailSubject<T>;
      case 'fr-FR':
        return 'Bienvenue' as EmailSubject<T>;
      case 'es-ES':
        return 'Bienvenido' as EmailSubject<T>;
    }
  };