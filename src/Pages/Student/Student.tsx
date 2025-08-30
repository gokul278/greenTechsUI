import React from "react";
import CandidateAssignment from "./CandidateAssignment";
import { TabPanel, TabView } from "primereact/tabview";
import OnetoOneSessionAssignment from "./OnetoOneSessionAssignment";
interface StudentProps {}

const Student: React.FC<StudentProps> = () => {
  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <TabView>
        <TabPanel
          className="font-semibold mb-3 text-xl text-[#000]"
          header="Candidate Assignment"
        >
          <CandidateAssignment />
        </TabPanel>
        <TabPanel
          className="font-semibold mb-3 text-xl text-[#000]"
          header="One-to-One Session Assignment"
        >
          <OnetoOneSessionAssignment/>
        </TabPanel>
      </TabView>
      {/* <p >
        Candidate Assignment
      </p> */}
      {/* <div className="w-12/12 lg:w-6/12 mb-5">
        <InputText
          // id={name}
          // name={name}
          style={{
            boxShadow:
              "inset 7px 7px 7px rgba(153,153,153,0.25), inset -7px -7px 7px rgba(235,235,235,0.25)",
            border: "none",
            borderRadius: 10,
            backgroundColor: "#008080",
            color: "#fff",
          }}
          className={
            "w-full h-10 lg:h-11 searchinput px-4 text-bold text-normal rounded-2xl focus:border-none placeholder:text-[#fff]"
          }
          placeholder="🔍 Search candidate by the course name"
          // value={value}
          // onChange={onChange}
          // type={type}
          // required={required}
          // readOnly={readonly}
        />
      </div> */}
    </div>
  );
};

export default Student;
