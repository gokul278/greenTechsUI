import TextInputWithLabel from "@/Components/Input/TextInputWithLabel";
import YearPickerWithLabel from "@/Components/Input/YearPickerWithLabel";
import React, { useState } from "react";
import ButtonsLabel from "@/Components/Buttons/ButtonsLabel";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import SelectInputWithLabel from "@/Components/Input/SelectInputWithLabel";

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  const candidates = [
    {
      name: "Ethan Harper",
      email: "ethan.harper@example.com",
      course: "AWS",
      groupname: "Group1",
      status: "Active",
    },
    {
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      course: "React",
      groupname: "Group2",
      status: "Active",
    },
    {
      name: "Liam Johnson",
      email: "liam.johnson@example.com",
      course: "Python",
      groupname: "Group1",
      status: "Inactive",
    },
    {
      name: "Olivia Brown",
      email: "olivia.brown@example.com",
      course: "Java",
      groupname: "Group3",
      status: "Active",
    },
    {
      name: "Noah Wilson",
      email: "noah.wilson@example.com",
      course: "Node.js",
      groupname: "Group2",
      status: "Inactive",
    },
    {
      name: "Ava Taylor",
      email: "ava.taylor@example.com",
      course: "Angular",
      groupname: "Group3",
      status: "Active",
    },
  ];

  const [data, _] = useState(candidates);

  const courseOptions = [...new Set(candidates.map((c) => c.course))].map(
    (t) => ({
      label: t,
      value: t,
    })
  );

  const groupOptions = [...new Set(candidates.map((c) => c.groupname))].map(
    (t) => ({
      label: t,
      value: t,
    })
  );

  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <div className="my-3 flex flex-col gap-3">
        <h5>Filter the Students Registered</h5>
        <p className="font-semibold text-sm text-[#7D7C7C]">
          Filter and manage students registrations based on the date and
          experience level
        </p>
      </div>
      <div className="w-[100%] lg:w-8/12 flex justify-center items-start lg:items-center flex-col lg:flex-row gap-3">
        <TextInputWithLabel
          type="date"
          name="enrolldate"
          label="Registration Date / Month / Year"
          placeholder="Select date / month / year"
          bgColor="#00808054"
        />
        <YearPickerWithLabel
          name="workexprience"
          label="Experience Level"
          placeholder="Select experience level"
          // value={year}
          // onChange={(e) => setYear(e.value)}
          startYear={0}
          endYear={30}
          bgColor="#00808054"
        />
        <div className="mt-1 h-10 lg:h-16 flex justify-center items-end w-[150px] sm:w-[200px]">
          <ButtonsLabel className="h-10 lg:h-11" variant="primary">
            Apply
          </ButtonsLabel>
        </div>
      </div>
      <div className="w-full mt-3">
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
            // resizableColumns
            // showGridlines
            scrollHeight="50vh"
            selectionMode="single"
            value={data}
            filterDisplay="row"
          >
            <Column
              style={{ width: "30%" }}
              field="name"
              header="Student name"
              filter
              showFilterMenu={false}
              filterElement={(options) => (
                <TextInputWithLabel
                  name=" "
                  label=""
                  value={options.value || ""}
                  onChange={(e) => options.filterApplyCallback(e.target.value)}
                  placeholder="Search by name"
                  className="p-column-filter w-full h-9 px-2 rounded-md border border-gray-300"
                />
              )}
            />
            <Column
              style={{ width: "30%" }}
              field="email"
              header="Email ID"
              filter
              showFilterMenu={false}
              filterElement={(options) => (
                <TextInputWithLabel
                  name=" "
                  label=""
                  value={options.value || ""}
                  onChange={(e) => options.filterApplyCallback(e.target.value)}
                  placeholder="Search by email"
                  className="p-column-filter w-full h-9 px-2 rounded-md border border-gray-300"
                />
              )}
            />
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
                  placeholder="Filter by course"
                  className="p-column-filter"
                />
              )}
            />

            <Column
              style={{ width: "20%" }}
              field="groupname"
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
                  placeholder="Filter by group"
                  className="p-column-filter"
                />
              )}
            />

            <Column
              style={{ width: "20%" }}
              header="Action"
              body={() => (
                <ButtonsLabel
                  // onClick={() => setEditRegistrationPopup(true)}
                  className="h-8 lg:h-8"
                  variant="primary"
                >
                  Edit
                </ButtonsLabel>
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Filter;
