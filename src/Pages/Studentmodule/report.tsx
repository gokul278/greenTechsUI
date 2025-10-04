
import Button from "@/Components/Buttons/ButtonsLabel";
import FileInputWithLabel from "@/Components/Input/FileInputWithLabelProps ";
import TextInputWithLabel from "@/Components/Input/TextInputWithLabel";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";

const Reports: React.FC = () => {
    const [active, setActive] = React.useState("weekly");
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    // State to store uploaded file name
    const [fileName, setFileName] = React.useState<string | null>(null);

    // 🔹 Trigger input click
    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    // 🔹 Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            console.log("Selected file:", file);
        }
    };

    // 🔹 Handle drag & drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setFileName(file.name);
            console.log("Dropped file:", file);
        }
    };

    return (
        <div className="px-3 py-3 md:!px-20 md:!py-5 flex flex-col gap-5 font-mont ">
            <div className="flex flex-col gap-2">
                <h6 className="font-bold">Reports</h6>
                <p className=" !text-xs text-[#7D7C7C]">Submit your weekly and monthly reports to the head trainer</p>
            </div>
            <div className="flex sm:w-[400px] md:w-[600px] gap-3 md:gap-6 rounded-2xl p-2 shadow-lg bg-[#00808054]">
                {/* Weekly Report */}
                <Button
                    onClick={() => setActive("weekly")}
                    className={`rounded-xl py-2 font-semibold transition-all duration-300 flex-1
            ${active === "weekly" ? "bg-[#028080] text-white shadow-md" : "bg-white text-black"}`}
                >
                    Weekly Report
                </Button>

                {/* Monthly Report */}
                <Button
                    onClick={() => setActive("monthly")}
                    className={`rounded-xl py-2 font-semibold transition-all duration-300  flex-1
            ${active === "monthly" ? "bg-[#028080] text-white shadow-md" : "bg-white text-black"}`}
                >
                    Monthly Report
                </Button>
            </div>
            <div className="">
                <TextInputWithLabel
                    className="w-60"
                    type="date"
                    name="dob"
                    label="Week Ending"
                    placeholder="Select Date"
                    bgColor="#00808054"
                    labelClassName="!text-[#000000] !font-bold"
                // value={formData.dob}
                // onChange={handleInput}
                // required
                // errorStatus={errorStatus.dob}
                />
            </div>
                <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">Weekly Summary</p>
                    <InputTextarea
                    placeholder="Provide a summary of your training activities, client progress and any notable events for the week."
                        rows={4}
                        autoResize
                        className="w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                    />
                </div>
            <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">Challenges and Solutions</p>
                <InputTextarea
                    placeholder="Describe any challenges encountered during the week and the solutions implemented."
                    rows={4}
                    autoResize
                    className="w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">Goal for Next Week</p>
                <InputTextarea
                    placeholder="Outline your goals and objectives for the upcoming week."
                    rows={4}
                    autoResize
                    className="w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">Upload Supporting Documents</p>
                {/* <div  className="flex px-4 py-5 rounded-2xl [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)] justify-center items-center">
                    <div className="flex flex-col gap-1 items-center">
                        <p className="font-bold text-sm">Drag and drop or browse to upload</p>
                        <p className="flex items-center text-sm mb-2">Accepted formats : CSV , TXT</p>
                        <button className="inline-flex items-center cursor-pointer justify-center select-none focus:outline-none h-8 lg:h-8 text-[0.8rem] bg-[#008080] p-3 text-white font-bold rounded-xl w-fit">
                            Browse Files
                         </button>
                    </div>
                </div> */}
                {/* <input ref={fileInputRef} name="file-upload" type="file" className="hidden" /> */}
                <div
                    className="flex px-4 py-5 rounded-2xl [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)] justify-center items-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => {
    fileInputRef.current?.click();
  }}
                >
                    <div className="flex flex-col gap-1 items-center">
                        <p className="font-bold text-sm">Drag and drop or browse to upload</p>
                        <p className="flex items-center text-sm mb-2">Accepted formats: CSV, TXT</p>

                        <button
                            type="button"
                            onClick={handleBrowseClick}
                            className="inline-flex items-center cursor-pointer justify-center select-none focus:outline-none h-8 lg:h-8 text-[0.8rem] bg-[#008080] p-3 text-white font-bold rounded-xl w-fit"
                        >
                            Browse Files
                        </button>

                        {/* Show file name after upload */}
                        {fileName && <p className="text-xs mt-2 text-gray-600">Uploaded: {fileName}</p>}
                    </div>
                </div>

                {/* Hidden input */}
                <input
                    ref={fileInputRef}
                    name="file-upload"
                    type="file"
                    accept=".csv,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <div className="flex justify-end">
                <Button variant="primary" className="w-fit px-10">Submit Report</Button>
            </div>
        </div>
    );
};

export default Reports;
