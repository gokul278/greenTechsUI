import React, { useState } from "react";
import ButtonsLabel from "@/Components/Buttons/ButtonsLabel";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressBar } from "primereact/progressbar";
import SelectInputWithLabel from "@/Components/Input/SelectInputWithLabel";

interface GroupsProps {}

const Groups: React.FC<GroupsProps> = () => {
  const candidates = [
    {
      group: "Group 1",
      course: "AWS",
      subtrainer: "John Smith",
      studentscount: 12,
      complatedtopics: 40,
      totaltopics: 100,
    },
    {
      group: "Group 2",
      course: "React",
      subtrainer: "Emily Johnson",
      studentscount: 18,
      complatedtopics: 25,
      totaltopics: 80,
    },
    {
      group: "Group 3",
      course: "Python",
      subtrainer: "Michael Brown",
      studentscount: 15,
      complatedtopics: 60,
      totaltopics: 120,
    },
    {
      group: "Group 4",
      course: "Java",
      subtrainer: "Sophia Wilson",
      studentscount: 20,
      complatedtopics: 75,
      totaltopics: 150,
    },
    {
      group: "Group 5",
      course: "Node.js",
      subtrainer: "David Miller",
      studentscount: 10,
      complatedtopics: 30,
      totaltopics: 90,
    },
    {
      group: "Group 6",
      course: "Angular",
      subtrainer: "Olivia Davis",
      studentscount: 14,
      complatedtopics: 55,
      totaltopics: 100,
    },
  ];

  const [data, _] = useState(candidates);

  const groupOptions = [...new Set(candidates.map((c) => c.group))].map(
    (g) => ({
      label: g,
      value: g,
    })
  );

  const courseOptions = [...new Set(candidates.map((c) => c.course))].map(
    (c) => ({
      label: c,
      value: c,
    })
  );

  const trainerOptions = [...new Set(candidates.map((c) => c.subtrainer))].map(
    (t) => ({
      label: t,
      value: t,
    })
  );

  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <div className="my-3 flex flex-col gap-3">
        <h5>Students Group</h5>
        <p className="font-semibold text-sm text-[#7D7C7C]">
          View and manage students groups, track progress and identify areas of
          improvement
        </p>
      </div>
      <div className="w-full">
        <div
          style={{
            boxShadow:
              "inset 7px 7px 7px rgba(153,153,153,0.25), inset -7px -7px 7px rgba(235,235,235,0.25)",
            border: "none",
            borderRadius: 10,
            //   backgroundColor: "#008080",
            //   color: "#fff",
          }}
          className="w-12/12 overflow-y-auto p-4 custom-scroll"
        >
          <DataTable
            scrollable
            scrollHeight="65vh"
            selectionMode="single"
            value={data}
            filterDisplay="row"
          >
            {/* Group name filter */}
            <Column
              style={{ width: "20%" }}
              field="group"
              header="Group name"
              filter
              showFilterMenu={false}
              filterElement={(options) => (
                <SelectInputWithLabel
                  name=" "
                  label=""
                  value={options.value}
                  options={groupOptions}
                  onChange={(e) => options.filterApplyCallback(e.value)}
                  placeholder="Select Group"
                  className="w-full"
                />
              )}
            />

            {/* Course filter */}
            <Column
              style={{ width: "20%" }}
              field="course"
              header="Course"
              filter
              showFilterMenu={false}
              filterElement={(options) => (
                <SelectInputWithLabel
                  name=" "
                  label=""
                  value={options.value}
                  options={courseOptions}
                  onChange={(e) => options.filterApplyCallback(e.value)}
                  placeholder="Select Course"
                  className="w-full"
                />
              )}
            />

            {/* Sub trainer filter */}
            <Column
              style={{ width: "20%" }}
              field="subtrainer"
              header="Sub Trainer"
              filter
              showFilterMenu={false}
              filterElement={(options) => (
                 <SelectInputWithLabel
                name=" "
                label=""
                  value={options.value}
                  options={trainerOptions}
                  onChange={(e) => options.filterApplyCallback(e.value)}
                  placeholder="Select Trainer"
                  className="w-full"
                />
              )}
            />

            {/* Students count */}
            <Column
              style={{ width: "10%" }}
              field="studentscount"
              header="Students"
            />

            {/* Completed topics with progress */}
            <Column
              style={{ width: "20%" }}
              header="Completed topics"
              body={(row) => (
                <div className="flex gap-2 justify-start items-center">
                  <ProgressBar
                    style={{ height: "10px", width: "60%" }}
                    displayValueTemplate={() => ""}
                    className="custom-progressbar"
                    value={Math.round(
                      (row.complatedtopics / row.totaltopics) * 100
                    )}
                  />
                  <span>{row.complatedtopics}</span>
                </div>
              )}
            />

            {/* Action */}
            <Column
              style={{ width: "10%" }}
              header="Action"
              body={() => (
                <ButtonsLabel className="h-8 lg:h-8" variant="primary">
                  View
                </ButtonsLabel>
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Groups;
