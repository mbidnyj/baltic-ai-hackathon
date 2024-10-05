import React from "react";

const ModulePreviewTop = ({ title, questionCount, points, onDelete }) => {
  return (
    <div className="flex justify-between items-center mb-4">
    <div className="flex flex-col justify-center self-stretch my-auto">
        <div className="text-2xl font-semibold tracking-normal text-black">
        {title}
        </div>
        <div className="flex gap-2 items-start self-start mt-2 text-xs font-medium tracking-normal leading-none text-gray-800">
        <div className="flex items-start shadow-sm">
            <div className="flex gap-px items-center p-1.5 bg-white rounded-md border border-solid">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/86c6336195520e4093240f4566c5b56a63261e1de2bc373f48ecf19f6968ae8e"
                className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
            />
            <div className="gap-2 self-stretch px-1 my-auto">
                {questionCount} Questions
            </div>
            </div>
        </div>
        <div className="flex items-start shadow-sm">
            <div className="flex gap-px items-center p-1.5 bg-white rounded-md border border-solid">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e25f42e4cd3c5ef2cd449ca923e46008948393e2516bb0229a7466fc7e3972ee"
                className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
            />
            <div className="gap-2 self-stretch px-1 my-auto">{points} Points</div>
            </div>
        </div>
        </div>
    </div>

    {/* Buttons on the right */}
    <div className="flex gap-2">
        <button className="px-4 py-2 bg-gray-200 text-blue-600 rounded-lg font-semibold shadow">
        Return to editing
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700">
        Submit
        </button>
        <button
        className="px-4 py-3.5 bg-white border border-solid rounded-lg text-red-600 shadow-sm"
        onClick={onDelete}
        >
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a4e88b2c927a2e8cbe917c2f00e2c87d5e85adf4e2506737cf234061a3880f0"
            className="object-contain w-4"
        />
        </button>
    </div>
    </div>
  );
};

export default ModulePreviewTop;
