import Button from "@/Components/Buttons/ButtonsLabel";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
interface StudentSessionsProps {}

const StudentSessions: React.FC<StudentSessionsProps> = () => {
  const courses = [
    { id: 1, course: "AWS Azure", topic: "Virtual Machine" },
    { id: 2, course: "AWS Azure", topic: "Azure Storage" },
    { id: 3, course: "AWS Azure", topic: "Azure App Service" },
    { id: 4, course: "AWS Azure", topic: "Azure Devops" },
    { id: 5, course: "AWS Azure", topic: "Azure Functions" },
  ];
  return (
    <div className="p-4 lg:px-6 lg:py-4 xl:px-8 xl:py-6">
      <p className="text-2xl font-bold">Session Management</p>
      <p className="mt-4 mb-3 text-xl font-semibold">Group Management</p>
      <p className="mt-5 mb-3 text-lg font-bold">Group Name</p>
      <Button className="w-full md:max-w-sm xl:max-w-lg rounded-2xl">
        Group 1
      </Button>
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <Button
          variant="ghost"
          className="md:w-fit md:px-6 text-md rounded-2xl"
        >
          View
        </Button>
        <Button
          variant="ghost"
          className="md:w-fit md:px-6 text-md rounded-2xl"
        >
          Add
        </Button>
      </div>
      <p className="mt-6 mb-3 text-lg font-bold">Session Invites</p>
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <Button
          variant="ghost"
          className="lg:w-fit lg:px-8 text-md rounded-2xl"
        >
          Send Invite Before Session
        </Button>
        <Button
          variant="ghost"
          className="lg:w-fit lg:px-8 text-md rounded-2xl"
        >
          Session Notification
        </Button>
      </div>
      <p className="mt-6 mb-3 text-lg font-bold">Session Notes & Recordings</p>
      <p className="mt-3 mb-3 text-lg font-semibold">Session Notes</p>
      <div>
        <InputTextarea
          placeholder="Enter your feedback"
          rows={4}
          autoResize
          className="mt-4 w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
        />
      </div>
      <Button className="md:w-fit md:px-8 text-md rounded-2xl mt-5">
        Publish Recordings
      </Button>
      <p className="mt-6 mb-5 text-lg font-bold">Course progress</p>

      <div className="lg:w-5/6 flex justify-center rounded-2xl overflow-hidden [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]">
        {/* Horizontal Scroll on Mobile */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] shadow-lg p-4">
            {/* Header */}
            <div className="flex justify-between px-4 py-3 rounded-xl shadow-xl font-semibold bg-gray-100">
              <div className="w-1/6">Course</div>
              <div className="w-4/6 text-center">Topic</div>
              <div className="w-1/6 text-center">Completed</div>
            </div>

            {/* Rows */}
            <div className="mt-5">
              {courses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="w-1/6 text-gray-700">{item.course}</div>
                  <div className="w-4/6 text-center font-medium">
                    {item.topic}
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <input
                      type="checkbox"
                      className="accent-teal-500 scale-150 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button className="md:w-fit md:px-8 text-md rounded-2xl mt-5">
        Mark Session as Completed
      </Button>
    </div>
  );
};

export default StudentSessions;
