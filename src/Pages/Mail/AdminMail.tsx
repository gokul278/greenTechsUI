import React from "react";
import ButtonsLabel from "@/Components/Buttons/ButtonsLabel";
import { useNavigate } from "react-router-dom";

interface AdminMailProps {}

const AdminMail: React.FC<AdminMailProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <p className="font-bold mb-3 text-sm text-[#008080]">
        Registration Confirmation Email
      </p>
      <div className="w-full flex flex-col justify-between h-full">
        <p className="font-bold mb-3 text-sm text-[#000]">Candidate Details</p>
        <div
          style={{
            boxShadow:
              "inset 7px 7px 7px rgba(153,153,153,0.25), inset -7px -7px 7px rgba(235,235,235,0.25)",
          }}
          className="md:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col gap-4 px-4 py-4 rounded-xl"
        >
          <div className="w-full flex justify-between">
            <p className="w-4/12 text-[#008080] font-bold text-xs sm:text-sm">
              Candidate Name
            </p>
            <p className="w-7/12 text-[#000] font-semibold text-xs sm:text-sm">
              Priya Sharma
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="w-4/12 text-[#008080] font-bold text-xs sm:text-sm">
              Registration ID
            </p>
            <p className="w-7/12 text-[#000] font-semibold text-xs sm:text-sm">
              REG2025-045
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="w-4/12 text-[#008080] font-bold text-xs sm:text-sm">
              Course Name
            </p>
            <p className="w-7/12 text-[#000] font-semibold text-xs sm:text-sm">
              Data Science
            </p>
          </div>
        </div>
        <p className="font-bold my-3 text-xs sm:text-sm text-[#000]">
          Email Content
        </p>
        <p className="font-normal mb-3 text-xs sm:text-sm text-[#000]">
          Dear Priya Sharma,
        </p>
        <p className="font-normal mb-3 text-xs sm:text-sm text-[#000]">
          Congratulations on your successful registration for the Data Science
          course! Your registration ID is REG2024-045. We are excited to have
          you join our program.
        </p>
        <p className="font-normal mb-3 text-xs sm:text-sm text-[#000]">
          Your username is <strong>gokulhk278@gmail.com</strong> and your
          password is <strong>12345678</strong>. Please use these credentials to
          log in and access your course details.
        </p>
        <p className="font-normal mb-3 text-xs sm:text-sm text-[#000]">
          We look forward to seeing you in class!
        </p>
        <p className="font-normal text-xs sm:text-sm text-[#000]">
          Best regards,
        </p>
        <p className="font-normal text-xs sm:text-sm text-[#000]">
          Greens Technology
        </p>
        <p className="font-bold mt-6 mb-3 text-sm text-[#000]">
          Handover to Head Trainer
        </p>
        <div className=" md:w-5/12 lg:w-4/12 xl:w-3/12">
          <ButtonsLabel
            onClick={() => {
              navigate(`/admin/register`);
            }}
            variant="primary"
          >
            Handover to Head Trainer
          </ButtonsLabel>
        </div>
      </div>
    </div>
  );
};

export default AdminMail;
