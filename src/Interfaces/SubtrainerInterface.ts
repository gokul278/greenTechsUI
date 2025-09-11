export interface TempFilesState {
  profile_img: File | null;
  resume: File | null;
}

export interface NewSubtrainerRegistrationFormData {
  fullname: string;
  phonenumber: string;
  emailid: string;
  dob: string;              // or Date if you want actual Date objects
  currentLocation: string;
  workexprience: string;
  aadhar: string;
  profile_img: string;      // can change to File | string if handling uploads
  resume: string;           // same here: File | string
}

