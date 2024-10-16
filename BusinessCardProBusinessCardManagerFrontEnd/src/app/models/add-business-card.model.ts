export interface AddBusinessCard {
    name: string;
    gender: 'Male' | 'Female' | "" ; // You can use an enum if you prefer
    dateOfBirth: Date; // Use Date for easier date handling
    email: string;
    phone: string;
    address: string;
    photo?: File | null ;
  } 