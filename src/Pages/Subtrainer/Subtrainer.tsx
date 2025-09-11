import React, { useCallback, useState } from "react";
import ButtonsLabel from "@/Components/Buttons/ButtonsLabel";
import { Column } from "primereact/column";
import SelectInputWithLabel from "@/Components/Input/SelectInputWithLabel";
import { DataTable } from "primereact/datatable";
import TextInputWithLabel from "@/Components/Input/TextInputWithLabel";
import { Dialog } from "primereact/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import NumberInputWithLabel from "@/Components/Input/NumberInputWithLabel";
import FileInputWithLabel from "@/Components/Input/FileInputWithLabelProps ";
import { FileHandlerService } from "@/Services/FileHandlerService";
import type { TempFilesState } from "@/Interfaces/SubtrainerInterface";
import { SubtrainerService } from "@/Services/SubtrainerService";
import LoadingOverlay from "@/Components/Loading/Loading";

interface SubtrainerProps {}

const Subtrainer: React.FC<SubtrainerProps> = () => {
  const candidates = [
    {
      name: "Ethan Harper",
      email: "ethan.harper@example.com",
      status: "Active",
    },
    {
      name: "Sophia Bennett",
      email: "sophia.bennett@example.com",
      status: "Inactive",
    },
    {
      name: "Liam Carter",
      email: "liam.carter@example.com",
      status: "Active",
    },
    {
      name: "Olivia Mitchell",
      email: "olivia.mitchell@example.com",
      status: "Active",
    },
    {
      name: "Noah Anderson",
      email: "noah.anderson@example.com",
      status: "Active",
    },
  ];

  const [data, _] = useState(candidates);

  const statusOptions = [...new Set(candidates.map((c) => c.status))].map(
    (t) => ({
      label: t,
      value: t,
    })
  );

  const [newRegistrationPopup, setNewRegistrationPopup] = useState(false);
  const [editRegistrationPopup, setEditRegistrationPopup] = useState(false);

  const [newRegistrationFormData, setNewRegistrationFormData] = useState({
    fullname: "",
    phonenumber: "",
    emailid: "",
    dob: "",
    currentLocation: "",
    workexprience: "",
    aadhar: "",
    profile_img: "",
    resume: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRegistrationFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [newFiles, setNewFiles] = useState<TempFilesState>({
    profile_img: null,
    resume: null,
  });

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const handleProfileImageUpload = useCallback(
    async (file: File) => {
      const formDataImg = new FormData();
      formDataImg.append("profileImage", file);

      try {
        const response = await FileHandlerService.uploadImage({
          formImg: formDataImg,
        });

        console.log(response);

        if (response.status) {
          setNewRegistrationFormData((prev) => ({
            ...prev,
            profile_img: response.fileName,
          }));

          setNewFiles((prev) => ({
            ...prev,
            profile_img: file,
          }));
        } else {
          setError({
            status: true,
            message: "Profile image upload failed",
          });
        }
      } catch (err) {
        setError({
          status: true,
          message: "Error uploading profile image",
        });
      }
    },
    [setNewRegistrationFormData, setNewFiles, setError]
  );

  const handleFileUpload = useCallback(
    async (file: File) => {
      const formDataImg = new FormData();
      formDataImg.append("file", file);

      try {
        const response = await FileHandlerService.uploadFile({
          formFile: formDataImg,
        });

        console.log(response);

        if (response.status) {
          setNewRegistrationFormData((prev) => ({
            ...prev,
            resume: response.fileName,
          }));

          setNewFiles((prev) => ({
            ...prev,
            resume: file,
          }));
        } else {
          setError({
            status: true,
            message: "File upload failed",
          });
        }
      } catch (err) {
        setError({
          status: true,
          message: "Error uploading file",
        });
      }
    },
    [setNewRegistrationFormData, setNewFiles, setError]
  );

  const handleNewRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await SubtrainerService.newSubtrainer(
        newRegistrationFormData
      );

      if (response.status) {
      } else {
      }
    } catch (err) {}
  };

  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <Dialog
        header="New Sub Trainer Registration Details"
        visible={newRegistrationPopup}
        className="w-10/12 lg:w-4/12"
        style={{
          height: "100%",
          borderRadius: "16px", // rounded corners
          overflow: "hidden",
        }}
        headerStyle={{
          display: "none",
        }}
        contentStyle={{
          background: "rgba(255, 255, 255, 0.1)", // semi-transparent
          backdropFilter: "blur(20px)", // frosted glass
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "0 0 16px 16px",
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onHide={() => setNewRegistrationPopup(false)}
      >
        <form onSubmit={handleNewRegistration}>
          <div className="w-full">
            <div
              onClick={() => setNewRegistrationPopup(false)}
              className="flex cursor-pointer justify-center"
            >
              <div
                className={cn(
                  "inline-flex items-center justify-center select-none focus:outline-none py-2 px-4 text-[0.8rem] font-bold rounded-xl",
                  // sizeClasses[size],
                  "bg-[#008080] text-white",
                  "shadow-[inset_7px_7px_7px_rgba(153,153,153,0.25),inset_-7px_-7px_7px_rgba(235,235,235,0.25)]",
                  "hover:shadow-[inset_9px_9px_9px_rgba(153,153,153,0.28),inset_-9px_-9px_9px_rgba(235,235,235,0.28)]"
                  //   "active:shadow-[inset_4px_4px_6px_rgba(153,153,153,0.35),inset_-4px_-4px_6px_rgba(235,235,235,0.35)]"
                )}
              >
                New Sub Trainer Registration Details
              </div>
              <X
                className="absolute right-2 cursor-pointer"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="h-[74vh] overflow-y-auto custom-scroll flex flex-col gap-3 px-3 pb-3">
            <TextInputWithLabel
              type="text"
              name="fullname"
              label="Name"
              placeholder="Enter your name"
              bgColor="#00808054"
              value={newRegistrationFormData.fullname}
              onChange={handleInput}
              required
            />
            <TextInputWithLabel
              type="email"
              name="emailid"
              label="Email ID"
              placeholder="Enter your email ID"
              bgColor="#00808054"
              value={newRegistrationFormData.emailid}
              onChange={handleInput}
              required
            />
            <NumberInputWithLabel
              name="phonenumber"
              label="Mobile Number "
              useGrouping={false}
              placeholder="Enter Mobile Number"
              bgColor="#00808054"
              value={
                newRegistrationFormData.phonenumber
                  ? parseInt(newRegistrationFormData.phonenumber)
                  : null
              }
              onChange={handleInput}
              required
            />
            <TextInputWithLabel
              type="date"
              name="dob"
              label="Date of Birth "
              placeholder="Select your date of birth"
              bgColor="#00808054"
              value={newRegistrationFormData.dob}
              onChange={handleInput}
              required
            />
            <TextInputWithLabel
              type="text"
              name="currentLocation"
              label="Trainer Location "
              placeholder="Enter your location"
              bgColor="#00808054"
              value={newRegistrationFormData.currentLocation}
              onChange={handleInput}
              required
            />
            <NumberInputWithLabel
              name="experience"
              label="Trainer Experience "
              placeholder="Enter your experience"
              bgColor="#00808054"
              value={
                newRegistrationFormData.workexprience
                  ? parseInt(newRegistrationFormData.workexprience)
                  : null
              }
              onChange={handleInput}
              required
            />
            <NumberInputWithLabel
              name="aadhar"
              label="Trainer Aadhar "
              placeholder="Enter your aadhar number"
              bgColor="#00808054"
              useGrouping={false}
              value={
                newRegistrationFormData.aadhar
                  ? parseInt(newRegistrationFormData.aadhar)
                  : null
              }
              onChange={handleInput}
              required
            />
            <FileInputWithLabel
              name="profile"
              label="Trainer Image "
              accept=".jpg,.jpeg,.png"
              onChange={(files) => {
                const file = files?.[0];
                if (!file) return;

                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                  setError({
                    status: true,
                    message: "Image must be less than 5MB.",
                  });
                  return;
                }

                handleProfileImageUpload(file);
              }}
              bgColor="#00808054"
              required
            />

            <FileInputWithLabel
              name="resume"
              label="Trainer Resume "
              accept="application/pdf"
              onChange={(files) => {
                const file = files?.[0];
                if (!file) return;

                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                  setError({
                    status: true,
                    message: "File must be less than 5MB.",
                  });
                  return;
                }

                handleFileUpload(file);
              }}
              bgColor="#00808054"
              required
            />
          </div>
          <div className="h-[8vh]">
            <p className="text-center h-[30px] text-red-500">
              {error.status && error.message}
            </p>
            <div className="w-full flex justify-center items-center">
              <div className="w-8/12 lg:w-6/12">
                <ButtonsLabel className="h-8 lg:h-10" variant="primary">
                  Register
                </ButtonsLabel>
              </div>
            </div>
          </div>
        </form>
      </Dialog>

      <Dialog
        header="New Sub Trainer Registration Details"
        visible={editRegistrationPopup}
        className="w-10/12 lg:w-4/12"
        style={{
          height: "100%",
          borderRadius: "16px", // rounded corners
          overflow: "hidden",
        }}
        headerStyle={{
          display: "none",
        }}
        contentStyle={{
          background: "rgba(255, 255, 255, 0.1)", // semi-transparent
          backdropFilter: "blur(20px)", // frosted glass
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "0 0 16px 16px",
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onHide={() => setEditRegistrationPopup(false)}
      >
        <div className="w-full">
          <div
            onClick={() => setEditRegistrationPopup(false)}
            className="flex cursor-pointer justify-center"
          >
            <div
              className={cn(
                "inline-flex items-center justify-center select-none focus:outline-none py-2 px-4 text-[0.8rem] font-bold rounded-xl",
                // sizeClasses[size],
                "bg-[#008080] text-white",
                "shadow-[inset_7px_7px_7px_rgba(153,153,153,0.25),inset_-7px_-7px_7px_rgba(235,235,235,0.25)]",
                "hover:shadow-[inset_9px_9px_9px_rgba(153,153,153,0.28),inset_-9px_-9px_9px_rgba(235,235,235,0.28)]"
                //   "active:shadow-[inset_4px_4px_6px_rgba(153,153,153,0.35),inset_-4px_-4px_6px_rgba(235,235,235,0.35)]"
              )}
            >
              Sub Trainer Registration Details
            </div>
            <X
              className="absolute right-2 cursor-pointer"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="h-[76vh] overflow-y-auto custom-scroll flex flex-col gap-3 px-3 pb-3">
          <TextInputWithLabel
            type="text"
            name="name"
            label="Name :"
            placeholder="Enter your name"
            bgColor="#00808054"
            value="Gokul"
          />
          <TextInputWithLabel
            type="date"
            name="dob"
            label="Date of Birth :"
            placeholder="Select your date of birth"
            bgColor="#00808054"
            value="19-09-2002"
          />
          <TextInputWithLabel
            type="text"
            name="location"
            label="Trainer Location :"
            placeholder="Enter your location"
            bgColor="#00808054"
            value="Salem"
          />
          <NumberInputWithLabel
            name="experience"
            label="Trainer Experience :"
            placeholder="Enter your experience"
            bgColor="#00808054"
            value={1}
          />
          <NumberInputWithLabel
            name="aadhar"
            label="Trainer Aadhar :"
            placeholder="Enter your aadhar number"
            bgColor="#00808054"
            useGrouping={false}
            value={123456789012}
          />
          <FileInputWithLabel
            name="profile"
            label="Trainer Image :"
            accept="image/*"
            // onChange={handleFileChange}
            bgColor="#00808054"
          />
          <FileInputWithLabel
            name="resume"
            label="Trainer Resume :"
            accept="application/pdf" // optional: allow images & pdf
            // onChange={handleFileChange}
            bgColor="#00808054"
          />
        </div>
        <div className="h-[6vh]">
          <div className="w-full flex justify-center items-center">
            <div className="w-8/12 lg:w-6/12">
              <ButtonsLabel className="h-8 lg:h-10" variant="primary">
                Save
              </ButtonsLabel>
            </div>
          </div>
        </div>
      </Dialog>

      <div className="my-4 flex items-center justify-between">
        <h5>Sub Trainers</h5>
        <div className="w-6/12 lg:w-2/12">
          <ButtonsLabel
            variant="primary"
            onClick={() => setNewRegistrationPopup(true)}
          >
            Add Sub Trainers
          </ButtonsLabel>
        </div>
      </div>
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
          scrollHeight="65vh"
          selectionMode="single"
          value={data}
          filterDisplay="menu"
        >
          <Column
            style={{ width: "30%" }}
            field="name"
            header="Sub Trainer Name"
            filter
            filterField="name"
            showFilterMenu={true} // ✅ keep this TRUE to show popup
            showFilterMenuOptions={false} // ✅ hides "StartsWith/Contains"
            showFilterOperator={false} // ✅ hides AND/OR
            showFilterMatchModes={false} // ✅ hides match mode dropdown
            showAddButton={false} // ✅ hides "+ Add Rule"
            filterElement={(options) => (
              <TextInputWithLabel
                name=" "
                label=""
                value={options.value || ""}
                onChange={(e) => options.filterApplyCallback(e.target.value)} // ✅ instant apply
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
            filterField="email"
            showFilterMenu={true} // ✅ keep this TRUE to show popup
            showFilterMenuOptions={false} // ✅ hides "StartsWith/Contains"
            showFilterOperator={false} // ✅ hides AND/OR
            showFilterMatchModes={false} // ✅ hides match mode dropdown
            showAddButton={false} // ✅ hides "+ Add Rule"
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
            header="Status"
            field="status"
            filter
            filterField="status"
            showFilterMenu={true} // ✅ keep this TRUE to show popup
            showFilterMenuOptions={false} // ✅ hides "StartsWith/Contains"
            showFilterOperator={false} // ✅ hides AND/OR
            showFilterMatchModes={false} // ✅ hides match mode dropdown
            showAddButton={false} // ✅ hides "+ Add Rule"
            body={(row) => (
              <ButtonsLabel className="h-8 lg:h-8" variant="primary">
                {row.status}
              </ButtonsLabel>
            )}
            filterElement={(options) => (
              <SelectInputWithLabel
                name=" "
                label=""
                value={options.value}
                options={statusOptions}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Filter by status"
                className="p-column-filter"
              />
            )}
          />
          <Column
            style={{ width: "20%" }}
            header="Action"
            body={() => (
              <ButtonsLabel
                onClick={() => setEditRegistrationPopup(true)}
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
  );
};

export default Subtrainer;
