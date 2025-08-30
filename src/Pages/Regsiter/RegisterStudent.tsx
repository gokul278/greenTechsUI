import NumberInputWithLabel from "@/Components/Input/NumberInputWithLabel";
import TextInputWithLabel from "@/Components/Input/TextInputWithLabel";
import React, { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import YearPickerWithLabel from "@/Components/Input/YearPickerWithLabel";
import SelectInputWithLabel from "@/Components/Input/SelectInputWithLabel";
import ButtonsLabel from "@/Components/Buttons/ButtonsLabel";
import { useNavigate } from "react-router-dom";

interface RegisterStudentProps {}

const RegisterStudent: React.FC<RegisterStudentProps> = () => {
  const [sameWhatsappNumber, setWhatsappNumber] = useState(true);

  const navigate = useNavigate();

  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <p className="font-bold mb-3 text-sm text-[#008080]">
        Student Data Collection
      </p>
      <div className="w-full flex flex-col lg:flex-row justify-between h-full">
        <div className="w-full lg:w-4/12 flex flex-col gap-4 px-0 sm:px-4">
          <TextInputWithLabel
            type="date"
            name="enrolldate"
            label="Enrolled Date"
            placeholder="Select date"
            bgColor="#00808054"
          />
          <TextInputWithLabel
            type="text"
            name="fullname"
            label="Full Name"
            placeholder="Enter Full name"
            bgColor="#00808054"
          />
          <NumberInputWithLabel
            name="phonenumber"
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            bgColor="#00808054"
          />
          <div className="flex items-center gap-2">
            <label className="w-8/12 lg:w-auto">
              Use Same Number for Whatsapp
            </label>
            <InputSwitch
              checked={sameWhatsappNumber}
              onChange={(e) => {
                setWhatsappNumber(e.value);
              }}
            />
          </div>
          {!sameWhatsappNumber && (
            <NumberInputWithLabel
              name="whatsappnumber"
              label="Whatsapp Number"
              placeholder="Enter Whatsapp Number"
              bgColor="#00808054"
            />
          )}
          <TextInputWithLabel
            type="text"
            name="emailid"
            label="Email ID"
            placeholder="Enter Email ID"
            bgColor="#00808054"
          />
        </div>
        <div className="w-full lg:w-4/12 mt-4 lg:mt-0 flex flex-col gap-4 px-0 sm:px-4">
          <TextInputWithLabel
            type="date"
            name="dob"
            label="Date of Birth"
            placeholder="Select Date of Birth"
            bgColor="#00808054"
          />
          <TextInputWithLabel
            type="text"
            name="highesteducation"
            label="Highest Education"
            placeholder="Enter Highest Education"
            bgColor="#00808054"
          />
          <TextInputWithLabel
            type="text"
            name="currentLocation"
            label="Current Location"
            placeholder="Enter Current Location"
            bgColor="#00808054"
          />
          <TextInputWithLabel
            type="text"
            name="fathersmothersoccupation"
            label="Father’s / Mother’s Occupation"
            placeholder="Enter Father’s / Mother’s Occupation"
            bgColor="#00808054"
          />
          <YearPickerWithLabel
            name="passedoutyear"
            label="Passed Out Year"
            startYear={2000}
            endYear={new Date().getFullYear() + 5}
            bgColor="#00808054"
          />
        </div>
        <div className="w-full lg:w-4/12 mt-4 lg:mt-0 flex flex-col gap-4 px-0 sm:px-4">
          <YearPickerWithLabel
            name="workexprience"
            label="Work Experience"
            placeholder="Select Work Experience"
            // value={year}
            // onChange={(e) => setYear(e.value)}
            startYear={0}
            endYear={30}
            bgColor="#00808054"
          />
          <SelectInputWithLabel
            name="courseselection"
            label="Course Selection"
            placeholder="Select Course"
            options={[
              { label: "Java", value: "1" },
              { label: "Python", value: "2" },
              { label: "Devops", value: "3" },
            ]}
            bgColor="#00808054"
            // value={selected}
            // onChange={(e) => setSelected(e.value)}
            // required
          />
          <SelectInputWithLabel
            name="courseselection"
            label="Select your Preference"
            placeholder="Select Preference"
            options={[
              { label: "Interested in One-to-One Session", value: "1" },
              { label: "Not Interested in One-to-One Session", value: "2" },
            ]}
            bgColor="#00808054"
            // value={selected}
            // onChange={(e) => setSelected(e.value)}
            // required
          />
        </div>
      </div>
      <div className="px-0 sm:px-4 mt-3 flex justify-end items-center">
        <div className="w-12/12 lg:w-2/12">
          <ButtonsLabel
            onClick={() => {
              navigate(`/admin/mail`);
            }}
            variant="primary"
          >
            Register
          </ButtonsLabel>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
