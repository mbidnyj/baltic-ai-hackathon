function ModuleCard({ title, subject, description, questions, grade, students }) {
    return (
      <div className="flex overflow-hidden flex-col rounded-xl border border border-solid shadow-sm max-w-[371px]">
        <div className="flex flex-col p-5 w-full bg-white">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-start w-full text-lg font-bold tracking-normal text-gray-800">
              <div className="flex-1 shrink min-w-[240px]">{title}</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4339c28bda7f71093d44accb788b8a9609f7f4b9aff378b5f95c7250b40ed56f?placeholderIfAbsent=true&apiKey=542dd31c5a084a599cf61de163f975e1"
                className="object-contain shrink-0 w-6 aspect-square"
              />
            </div>
            <div className="mt-1.5 text-sm font-semibold tracking-normal leading-none text-gray-500">
              {subject}
            </div>
          </div>
          <div className="mt-4 text-base font-medium tracking-normal leading-6 text-gray-500">
            {description}
          </div>
          <div className="flex gap-2.5 items-start self-start mt-4 text-xs font-medium tracking-normal leading-none text-gray-800">
            <div className="flex items-start shadow-sm">
              <div className="flex gap-px items-center p-1.5 bg-white rounded-md border border border-solid">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/19b4c4c91c5b15b63b2f3c479580f5fc55a976878e54404505bc075da24e813a?placeholderIfAbsent=true&apiKey=542dd31c5a084a599cf61de163f975e1"
                  className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                />
                <div className="gap-2 self-stretch px-1 my-auto">
                  {questions}
                </div>
              </div>
            </div>
            <div className="flex items-start shadow-sm">
              <div className="flex gap-px items-center p-1.5 bg-white rounded-md border border border-solid">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6df17aa04c8ab795c3f862408918ff3ea05a080d096494bd6fd2cce442cc026?placeholderIfAbsent=true&apiKey=542dd31c5a084a599cf61de163f975e1"
                  className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                />
                <div className="gap-2 self-stretch px-1 my-auto">{grade}</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm font-semibold tracking-normal leading-none text-gray-500">
            Enrolled students: {students}
          </div>
          <div className="flex gap-2.5 items-start mt-4 w-full text-base font-semibold tracking-normal text-center">
            <div className="flex items-start text-white">
              <div className="overflow-hidden gap-2.5 self-stretch px-4 py-3.5 bg-blue-600 rounded-lg">
                Assign module
              </div>
            </div>
            <div className="flex items-start text-blue-600">
              <div className="overflow-hidden gap-2.5 self-stretch px-4 py-3.5 rounded-lg">
                Edit module
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default ModuleCard;  