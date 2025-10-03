import Button from "@/Components/Buttons/ButtonsLabel";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
interface StudentPanelProps {}

const StudentPanel: React.FC<StudentPanelProps> = () => {
  const courseData = [
    { label: "Course Name", value: "Azure" },
    { label: "Group Name", value: "Group 1" },
    { label: "Session Link", value: "https://session.example.com" },
    { label: "Recording Link", value: "https://recordings.example.com" },
    { label: "Notes", value: "View the available notes" },
  ];

  return (
    <div className="p-4 lg:px-6 lg:py-4 xl:px-8 xl:py-6">
      <p className="text-2xl font-bold">Student Panel</p>
      <p className="mt-4 mb-3 text-xl font-semibold">Group Information</p>

      <div className="flex flex-col gap-4 lg:w-4/5 xl:w-3/4">
        {/* Mobile view: single box per row */}
        <div className="flex flex-col gap-4 md:hidden">
          {courseData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl bg-white p-4 shadow-md"
            >
              <p className="font-semibold text-[#008080]">{item.label}</p>
              <p className="font-semibold break-all whitespace-normal">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tablet/Desktop view: two-column layout */}
        <div className="hidden md:flex flex-col md:flex-row gap-5 justify-between rounded-2xl bg-[#00808054] p-4 shadow-md">
          {/* Left column */}
          <div className="flex md:w-1/3 flex-col gap-6 rounded-2xl bg-white p-4 font-semibold text-[#008080] shadow-md">
            {courseData.map((item, index) => (
              <p key={index}>{item.label}</p>
            ))}
          </div>

          {/* Right column */}
          <div className="flex md:w-2/3 flex-col gap-6 rounded-2xl bg-white p-4 shadow-md">
            {courseData.map((item, index) => (
              <p key={index} className="font-semibold">
                {item.value}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-semibold text-xl">Topics</p>
        {[
          "Virtual Machine",
          "Azure Storage",
          "Azure App Services",
          "Networking in Azure",
        ].map((topic, index) => (
          <div key={index} className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-teal-500 scale-150 cursor-pointer"
            />
            <p className="font-semibold">{topic}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="font-semibold text-xl">Attendance</p>
        <label className="md:w-3/5 mt-4 flex items-center gap-3 rounded-xl p-3 shadow-md cursor-pointer bg-[#ABD4D4]">
          <input
            type="radio"
            name="attendance"
            className="accent-teal-600 scale-150"
          />
          <p className="font-semibold">Attended</p>
        </label>
        <label className="md:w-3/5 mt-4 flex items-center gap-3 rounded-xl p-3 shadow-md cursor-pointer bg-[#ABD4D4]">
          <input
            type="radio"
            name="attendance"
            className="accent-teal-600 scale-150"
          />
          <p className="font-semibold ">Not Attended</p>
        </label>
      </div>

      <div className="mt-6">
        <p className="font-semibold text-xl">Feedback</p>
        <InputTextarea
          placeholder="Enter your feedback"
          rows={4}
          autoResize
          className="mt-4 w-full md:max-w-sm xl:max-w-lg rounded-3xl border-none outline-none p-4
             [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
        />
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Button variant="primary" className="md:w-fit md:px-6 text-md">
          Submit Feedback
        </Button>
        <Button variant="primary" className="md:w-fit md:px-6 text-md">
          Need One More Time
        </Button>
      </div>

      <p className="font-semibold text-[#00000099] mt-4 text-center md:text-left">
        This feedback will be highlighted to the Head Trainer.
      </p>
    </div>
  );
};

export default StudentPanel;
