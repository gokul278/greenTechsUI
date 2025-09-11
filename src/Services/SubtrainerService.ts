import type { HandoverResponse } from "@/Interfaces/RegisterStudentInterface";
import { decrypt, encrypt } from "@/lib/Helper";
import axios from "axios";
import { tokenService } from "./tokenService";
import type { NewSubtrainerRegistrationFormData } from "@/Interfaces/SubtrainerInterface";

export const SubtrainerService = {
  newSubtrainer: async (formData: NewSubtrainerRegistrationFormData) => {
    const token = localStorage.getItem("token");
    const payload = encrypt(
      {
        fullname: formData.fullname,
        emailid: formData.emailid,
        dob: formData.dob,
        currentLocation: formData.currentLocation,
        workexprience: formData.workexprience.toString(),
        profileImage: formData.profile_img,
        aadhar: formData.aadhar,
        resume: formData.resume,
        phonenumber: formData.phonenumber,
      },
      token
    );

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/subtrainer/new`,
      { encryptedData: payload },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const decryptedData: HandoverResponse = decrypt(
      res.data.data,
      res.data.token
    );
    tokenService.setToken(res.data.token);
    return decryptedData;
  },
};
