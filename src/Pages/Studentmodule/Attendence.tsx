import Button from "@/Components/Buttons/ButtonsLabel";
import SelectInputWithLabel from "@/Components/Input/SelectInputWithLabel";
import TextInputWithLabel from "@/Components/Input/TextInputWithLabel";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";

type PunchType = "in" | "out";

type LeaveFormState = {
    startDate: string;
    endDate: string;
    reason: string;
};

type PermissionFormState = {
    type: string;
    description: string;
};

type FeedbackState = {
    status: "success" | "error";
    message: string;
} | null;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
});

const formatFullDateTime = (date: Date) => `${dateFormatter.format(date)} | ${timeFormatter.format(date)}`;

const formatTime = (date: Date) => timeFormatter.format(date);

const StudentAttendence: React.FC = () => {
    const [currentDateTime, setCurrentDateTime] = React.useState<Date>(new Date());
    const [isPunchedIn, setIsPunchedIn] = React.useState(false);
    const [lastPunch, setLastPunch] = React.useState<{ type: PunchType; at: Date } | null>(null);

    const [leaveForm, setLeaveForm] = React.useState<LeaveFormState>({
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [leaveFeedback, setLeaveFeedback] = React.useState<FeedbackState>(null);

    const [permissionForm, setPermissionForm] = React.useState<PermissionFormState>({
        type: "",
        description: "",
    });
    const [permissionFeedback, setPermissionFeedback] = React.useState<FeedbackState>(null);

    React.useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    const handlePunch = (type: PunchType) => {
        const now = new Date();
        setIsPunchedIn(type === "in");
        setLastPunch({ type, at: now });
    };

    const handleLeaveDateChange = (field: "startDate" | "endDate") => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeaveForm((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
        setLeaveFeedback(null);
    };

    const handleLeaveReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLeaveForm((prev) => ({
            ...prev,
            reason: event.target.value,
        }));
        setLeaveFeedback(null);
    };

    const handlePermissionTypeChange = (event: { value: string }) => {
        setPermissionForm((prev) => ({
            ...prev,
            type: event.value,
        }));
        setPermissionFeedback(null);
    };

    const handlePermissionDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPermissionForm((prev) => ({
            ...prev,
            description: event.target.value,
        }));
        setPermissionFeedback(null);
    };

    const handleLeaveSubmit = () => {
        if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason.trim()) {
            setLeaveFeedback({ status: "error", message: "Please complete every field before submitting your leave." });
            return;
        }

        if (new Date(leaveForm.startDate) > new Date(leaveForm.endDate)) {
            setLeaveFeedback({ status: "error", message: "Start date must be on or before the end date." });
            return;
        }

        setLeaveFeedback({ status: "success", message: "Leave request submitted successfully." });
    };

    const handlePermissionSubmit = () => {
        if (!permissionForm.type || !permissionForm.description.trim()) {
            setPermissionFeedback({ status: "error", message: "Please choose a permission type and add a description." });
            return;
        }

        setPermissionFeedback({ status: "success", message: "Permission request submitted successfully." });
    };

    return (
        <div className="px-3 py-3 md:!px-20 md:!py-5 flex flex-col gap-4 font-mont ">
            <h6 className="font-mont">Time & Attendance</h6>
            <div className="flex flex-col gap-1 text-sm">
                <div className="font-bold">Current Time</div>
                <div className="text-[#7D7C7C] text-xs">{formatFullDateTime(currentDateTime)}</div>
                {lastPunch && (
                    <div className="text-[#008080] text-xs font-semibold">
                        You last punched {lastPunch.type === "in" ? "in" : "out"} at {formatTime(lastPunch.at)}.
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <div className="font-bold">Punch In / Out </div>
                <div className="text-[#7D7C7C] text-xs flex gap-5 md:pl-24 ">
                    <Button
                        className="h-8 lg:h-8 w-24"
                        variant={isPunchedIn ? "primary" : "ghost"}
                        onClick={() => handlePunch("in")}
                    >
                        Punch In
                    </Button>
                    <Button
                        className="h-8 lg:h-8 w-24"
                        variant={!isPunchedIn ? "primary" : "ghost"}
                        onClick={() => handlePunch("out")}
                    >
                        Punch Out
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
                <div className="font-bold">Leave Application </div>
                <div className="text-[#7D7C7C] text-xs md:flex flex-col md:flex-row  md:gap-5 ">
                    <div className="flex flex-col mb-3 md:mb-0">
                        {/* <div></div> */}
                        <TextInputWithLabel
                            type="date"
                            name="leave-start-date"
                            label="Start Date"
                            placeholder="Select Date"
                            bgColor="#00808054"
                            className="w-60"
                            labelClassName="!text-[#000000] !font-semibold"
                            value={leaveForm.startDate}
                            onChange={handleLeaveDateChange("startDate")}
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <div></div> */}
                        <TextInputWithLabel
                            className="w-60"
                            type="date"
                            name="leave-end-date"
                            label="End Date"
                            placeholder="Select Date"
                            bgColor="#00808054"
                            labelClassName="!text-[#000000] !font-semibold"
                            value={leaveForm.endDate}
                            onChange={handleLeaveDateChange("endDate")}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                    <div className="font-bold">Reason for leave </div>
                    <div>
                        <InputTextarea
                            placeholder="Enter your reason for leave"
                            rows={4}
                            autoResize
                            className="mt-4 w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                            value={leaveForm.reason}
                            onChange={handleLeaveReasonChange}
                        />
                    </div>
                    <Button variant="primary" className="w-fit px-10 h-fit py-3" onClick={handleLeaveSubmit}>
                        Submit Leave Request
                    </Button>
                    {leaveFeedback && (
                        <div
                            className={`text-xs font-semibold ${leaveFeedback.status === "success" ? "text-[#008080]" : "text-red-500"}`}
                        >
                            {leaveFeedback.message}
                        </div>
                    )}
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
                        value={permissionForm.type}
                        onChange={handlePermissionTypeChange}
                        bgColor="#00808054"
                        labelClassName="mb-3 !font-semibold"

                    />
                    <div className="flex flex-col gap-4 text-sm mt-3">
                        <div className="font-bold">Description</div>
                        <InputTextarea
                            placeholder="Describe your permission request"
                            rows={4}
                            autoResize
                            className="mt-0 w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                            value={permissionForm.description}
                            onChange={handlePermissionDescriptionChange}
                        />
                        <Button variant="primary" className="w-fit px-10 h-fit py-2" onClick={handlePermissionSubmit}>
                            Submit Permission Request
                        </Button>
                        {permissionFeedback && (
                            <div
                                className={`text-xs font-semibold ${permissionFeedback.status === "success" ? "text-[#008080]" : "text-red-500"}`}
                            >
                                {permissionFeedback.message}
                            </div>
                        )}
                    </div>
                    <div className="rounded-2xl px-4 py-4 md:px-10 md:py-4 bg-[#00808066] md:flex md:gap-0 justify-between items-center mt-5">
                        <div className="flex flex-col justify-between gap-2 mb-3 md:mb-0">
                            <div className="font-bold">Confirm Punch Out </div>
                            <div className="text-[#00000091]">Are you sure you want to punch out</div>
                        </div>
                        <Button
                            variant="primary"
                            className="w-fit px-10 h-fit py-2"
                            onClick={() => handlePunch("out")}
                            disabled={!isPunchedIn}
                        >
                            Confirm
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendence;
