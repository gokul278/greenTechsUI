import Button from "@/Components/Buttons/ButtonsLabel";
import SelectInputWithLabel from "@/Components/Input/SelectInputWithLabel";
import TextInputWithLabel from "@/Components/Input/TextInputWithLabel";
import YearPickerWithLabel from "@/Components/Input/YearPickerWithLabel";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";

const StudentAttendence: React.FC = () => {

    return (
        <div className="px-3 py-3 md:!px-20 md:!py-5 flex flex-col gap-4 font-mont ">
            <h6 className="font-mont">Time & Attendance</h6>
            <div className="flex flex-col gap-1 text-sm">
                <div className="font-bold">Current Time</div>
                <div className="text-[#7D7C7C] text-xs">Monday, July 22, 2025 | 10:30 AM</div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <div className="font-bold">Punch In / Out </div>
                <div className="text-[#7D7C7C] text-xs flex gap-5 md:pl-30 ">
                    <Button className="h-8 lg:h-8 w-24" variant="primary">Punch In</Button>
                    <Button className="h-8 lg:h-8 w-24" variant="ghost">Punch Out</Button>
                </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
                <div className="font-bold">Leave Application </div>
                <div className="text-[#7D7C7C] text-xs md:flex flex-col md:flex-row  md:gap-5 ">
                    <div className="flex flex-col mb-3 md:mb-0">
                        {/* <div></div> */}
                        <TextInputWithLabel
                            type="date"
                            name="dob"
                            label="Start Date"
                            placeholder="Select Date"
                            bgColor="#00808054"
                            className="w-60"
                            labelClassName="!text-[#000000] !font-semibold"
                            // value={formData.dob}
                            // onChange={handleInput}
                            // required
                            // errorStatus={errorStatus.dob}
                        />
                        </div>
                    <div className="flex flex-col">
                        {/* <div></div> */}
                        <TextInputWithLabel
                            className="w-60"
                            type="date"
                            name="dob"
                            label="End Date"
                            placeholder="Select Date"
                            bgColor="#00808054"
                            labelClassName="!text-[#000000] !font-semibold"
                            
                        // value={formData.dob}
                        // onChange={handleInput}
                        // required
                        // errorStatus={errorStatus.dob}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                    <div className="font-bold">Reason for leave </div>
                    <div>
                        <InputTextarea
                            placeholder="Enter your feedback"
                            rows={4}
                            autoResize
                            className="mt-4 w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                        />
                    </div>
                    <Button variant="primary" className="w-fit px-10">Submit Leave Request</Button>
                </div>
                <div className=" mt-3 flex flex-col gap-2">
                    <div className="font-bold">Permission Request</div>
                    <div className="font-semibold"></div>
                    <SelectInputWithLabel
                        name="preference"
                        className=" w-72 md:w-80"
                        label="Permission Type"
                        placeholder="Select permission Type"
                        options={[
                            {
                                label: "Leave",
                                value: "leave",
                            },
                            {
                                label: "Hospital Visit",
                                value: "hospital_visit",
                            },
                        ]}
                        
                        bgColor="#00808054"
                        labelClassName="mb-3 !font-semibold"
                       
                    />
                    <div className="flex flex-col gap-4 text-sm mt-3">
                        <div className="font-bold">Description</div>
                        <InputTextarea autoResize rows={5} cols={10} />
                        <Button variant="primary" className="w-fit px-10">Submit Permission Request</Button>
                    </div>
                    <div className="rounded-2xl px-4 py-4 md:px-10 md:py-4 bg-[#00808066] md:flex md:gap-0 justify-between items-center mt-5">
                        <div className="flex flex-col justify-between gap-2 mb-3 md:mb-0">
                            <div className="font-bold">Confirm Punch Out </div>
                            <div className="text-[#00000091]">Are you sure you want to punch out</div>
                        </div>
                        <Button variant="primary" className="w-fit px-10">Confirm</Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendence;
