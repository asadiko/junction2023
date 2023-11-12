import { signal } from "@preact/signals-react";
import { colors } from "../data/colors";
import { ExportIcon, DeployIcon, ErrorIcon } from "../assets";
import { codeBase } from "./GenerationModal";

const selectedColor = signal("");

export const GeneratedResult = () => {
  const handleColorChange = (newVal: string) => (selectedColor.value = newVal);

  return (
    <div className="flex bg-white p-4 z-50 rounded-3xl min-w-[66vw] max-w-[80vw] flex-nowrap gap-4">
      <div className="flex w-1/2 flex-col">
        <div className="rounded-2xl w-min mt-6 p-2 bg-white shadow-md">
          <div className="grid grid-cols-7 gap-1">
            {colors.slice(0, -3).map((color) => (
              <div
                onClick={() => handleColorChange(color)}
                className="rounded-md w-[3rem] aspect-square h-auto"
                key={color}
                style={{ background: color }}
              ></div>
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {colors.slice(-3).map((color) => (
              <div
                onClick={() => handleColorChange(color)}
                className="rounded-md w-[3rem] aspect-square h-auto"
                key={color}
                style={{ background: color }}
              ></div>
            ))}
            <div className="rounded-md w-1/2 overflow-hidden flex text-slate-600 border border-solid border-[#f0f0f0]">
              <div className="w-10 aspect-square flex justify-center items-center h-auto bg-[#f0f0f0]">
                #
              </div>
              <input
                className="p-1 rounded-r-md"
                type="text"
                value={selectedColor.value.replace("#", "")}
                defaultValue="AB313A"
              />
            </div>
          </div>
        </div>
        <label className="mt-4">
          <h4 className="text-xl">Name</h4>
          <input
            name="title"
            className="bg-[#dddddd] mt-4 p-2 rounded-md w-full"
            type="text"
            placeholder="Some text here..."
          />
        </label>
        <div className="w-full flex justify-between mt-8">
          <h4 className="text-xl">Image prompts</h4>
          <p className="font-light text-[#9D9D9D]">Click to write a prompt*</p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-center items-center bg-slate-100 aspect-square rounded-lg w-auto"
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between mt-8">
          <h4 className="text-xl">Text prompts</h4>
          <p className="font-light text-[#9D9D9D]">Click to write a prompt*</p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <input
              key={index}
              name={`name-${index}`}
              className="bg-[#dddddd] p-2 rounded-md w-full"
              type="text"
              placeholder={"Text " + (index + 1)}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-between">
        <h2 className="text-3xl">Preview</h2>
        <div className="rounded-lg mt-2 flex justify-center items-center h-full bg-[#999999]">
          {codeBase.value instanceof Error ? (
            <>
              <ErrorIcon />
              <p>Error occured while creating your awesome website</p>
            </>
          ) : (
            <iframe
              className="w-full h-full"
              src={codeBase.value.link}
              frameBorder="0"
            ></iframe>
          )}
        </div>
        <div className="flex gap-4 mt-8">
          <button className="flex justify-center items-center p-2 gap-1 w-full text-white bg-[#FEB776] result_btn rounded-lg">
            <ExportIcon /> Export
          </button>
          <button className="flex justify-center items-center p-2 gap-1 w-full text-white bg-[#7A6EFF] result_btn rounded-lg">
            <DeployIcon /> Deploy
          </button>
        </div>
      </div>
    </div>
  );
};
