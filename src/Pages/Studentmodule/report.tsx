
import Button from "@/Components/Buttons/ButtonsLabel";
import TextInputWithLabel from "@/Components/Input/TextInputWithLabel";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";

type ReportType = "weekly" | "monthly";

interface ReportFormState {
    periodEnding: string;
    summary: string;
    challenges: string;
    goals: string;
    file: File | null;
}

const initialReportState: Record<ReportType, ReportFormState> = {
    weekly: {
        periodEnding: "",
        summary: "",
        challenges: "",
        goals: "",
        file: null,
    },
    monthly: {
        periodEnding: "",
        summary: "",
        challenges: "",
        goals: "",
        file: null,
    },
};

const Reports: React.FC = () => {
    const [active, setActive] = React.useState<ReportType>("weekly");
    const [reportState, setReportState] = React.useState(initialReportState);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const activeReport = reportState[active];

    const handleTabChange = (type: ReportType) => {
        if (type === active) return;
        setActive(type);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const updateReportField = <K extends keyof ReportFormState>(field: K, value: ReportFormState[K]) => {
        setReportState((prev) => ({
            ...prev,
            [active]: {
                ...prev[active],
                [field]: value,
            },
        }));
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateReportField("periodEnding", event.target.value);
    };

    const handleTextAreaChange = (
        field: Exclude<keyof ReportFormState, "periodEnding" | "file">
    ) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateReportField(field, event.target.value);
    };

    const assignFileToState = (file: File) => {
        updateReportField("file", file);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            assignFileToState(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            assignFileToState(file);
        }
    };

    const handleSubmit = () => {
        const payload = reportState[active];
        console.log(`Submitting ${active} report`, payload);
    };

    return (
        <div className="px-3 py-3 md:!px-20 md:!py-5 flex flex-col gap-5 font-mo nt ">
            <div className="flex flex-col gap-2">
                <h6 className="font-bold">Reports</h6>
                <p className=" !text-xs text-[#7D7C7C]">Submit your weekly and monthly reports to the head trainer</p>
            </div>
            <div className="flex sm:w-[400px] md:w-[600px] gap-3 md:gap-6 rounded-2xl p-2 shadow-lg bg-[#00808054]">
                <Button
                    onClick={() => handleTabChange("weekly")}
                    className={`rounded-xl h-fit py-2 font-semibold transition-all duration-300 w-full 
            ${active === "weekly" ? "bg-[#028080] text-white shadow-md" : "bg-white text-black"}`}
                >
                    Weekly Report
                </Button>

                <Button
                    onClick={() => handleTabChange("monthly")}
                    className={`rounded-xl h-fit py-2  font-semibold transition-all duration-300  w-full
            ${active === "monthly" ? "bg-[#028080] text-white shadow-md" : "bg-white text-black"}`}
                >
                    Monthly Report
                </Button>
            </div>
            <div className="">
                <TextInputWithLabel
                    className="w-60"
                    type="date"
                    name="periodEnding"
                    label={active === "weekly" ? "Week Ending" : "Month Ending"}
                    placeholder="Select Date"
                    bgColor="#00808054"
                    labelClassName="!text-[#000000] !font-bold"
                    value={activeReport.periodEnding}
                    onChange={handleDateChange}
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">
                    {active === "weekly" ? "Weekly Summary" : "Monthly Summary"}
                </p>
                <InputTextarea
                    placeholder={`Provide a summary of your training activities, client progress and any notable events for the ${active === "weekly" ? "week" : "month"
                        }.`}
                    rows={4}
                    autoResize
                    className="w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                    value={activeReport.summary}
                    onChange={handleTextAreaChange("summary")}
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">Challenges and Solutions</p>
                <InputTextarea
                    placeholder={`Describe any challenges encountered during the ${active === "weekly" ? "week" : "month"
                        } and the solutions implemented.`}
                    rows={4}
                    autoResize
                    className="w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                    value={activeReport.challenges}
                    onChange={handleTextAreaChange("challenges")}
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">
                    {active === "weekly" ? "Goal for Next Week" : "Goal for Next Month"}
                </p>
                <InputTextarea
                    placeholder={`Outline your goals and objectives for the upcoming ${active === "weekly" ? "week" : "month"
                        }.`}
                    rows={4}
                    autoResize
                    className="w-full md:max-w-xl xl:max-w-3xl rounded-3xl border-none outline-none p-4
                   [box-shadow:inset_0_0_8px_rgba(0,0,0,0.15)]"
                    value={activeReport.goals}
                    onChange={handleTextAreaChange("goals")}
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
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDrop}
                    onClick={handleBrowseClick}
                >
                    <div className="flex flex-col gap-1 items-center">
                        <p className="font-bold text-sm">Drag and drop or browse to upload</p>
                        <p className="flex items-center text-sm mb-2">Accepted formats: CSV, TXT</p>

                        <button
                            type="button"
                            className="inline-flex items-center cursor-pointer justify-center select-none focus:outline-none h-8 lg:h-8 text-[0.8rem] bg-[#008080] p-3 text-white font-bold rounded-xl w-fit"
                        >
                            Browse Files
                        </button>

                        {/* Show file name after upload */}
                        {activeReport.file && (
                            <p className="text-xs mt-2 text-gray-600">Uploaded: {activeReport.file.name}</p>
                        )}
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
                <Button
                    type="button"
                    variant="primary"
                    className="w-fit px-10 h-fit py-2"
                    onClick={handleSubmit}
                >
                    Submit Report
                </Button>
            </div>
        </div>
    );
};

export default Reports;
