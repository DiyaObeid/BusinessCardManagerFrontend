export interface BusinessCardCsvXml {
    name: string;
    gender: 'Male' | 'Female' | "" ; // You can use an enum if you prefer
    dateOfBirth: Date; // Use Date for easier date handling
    email: string;
    phone: string;
     // Optional: use a string to store the photo URL or base64 string
    address: string;
    photo?: string;
  } 