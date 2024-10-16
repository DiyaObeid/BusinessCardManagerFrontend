export interface BusinessCard {
    id: string; 
    name: string;
    gender: 'Male' | 'Female' | "" ;
    dateOfBirth: Date;
    email: string;
    phone: string;
    address: string;
    photo?: string;
  } 