import { signal } from "@preact/signals-react";
import { ArrowIcon, MagicIcon } from "../assets";
import { Blocks, CodeLoader, GeneratedResult } from "../components";
import { BlurLayer } from "../components/BlurLayer";
import {
  GenerationModal,
  isCodeGenerating,
} from "../components/GenerationModal";

const feedbacks = [
{
    name: "Jayin",
    team: "@ATO",
    feedback:
        "If it will be available, I will use it at next hackathon.",
    },
  {
    name: "Firad",
    team: "@Liquid Energy",
    feedback:
      "It will be really great if you will enter Tech-market.",
  },
  {
    name: "Ibrakhim",
    team: "@SWA",
    feedback:
      "The best feature of this app is selection of website's type!",
  },
];

export const isModalOpen = signal(false);
export const isModal2Open = signal(false);

export const MainPage = () => {
  return (
    <div className="flex flex-col justify-between items-center mt-4">
      <BlurLayer>
        {isModalOpen.value && <GenerationModal />}
        {isCodeGenerating.value && <CodeLoader />}
        {isModal2Open.value && <GeneratedResult />}
      </BlurLayer>
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex w-full xl:w-1/2 justify-center items-center">
          <h1 className="abyssinica text-6xl leading-snug">
            <span className="p-2 rounded-full bg-green text-lg mx-2 align-middle font-light">
              We offer
            </span>
            AI powered solution for the real-time business decisions
            optimization
          </h1>
        </div>
        <div className="w-full xl:w-1/2 flex flex-col p-5 justify-end">
          <p className="text-gray-500 font-light text-xl">
            Utilizing generative Artificial Intelligence in a sustainable manner
            to collect and summarize real time insights to help drive business
            decisions.
          </p>
          <div className="mt-6 flex gap-10 items-center">
            <div
              className="flex"
              onClick={() => {
                return (isModalOpen.value = true);
              }}
            >
              <button className="p-2 bg-purple rounded-full text-white flex gap-2 items-center">
                <MagicIcon /> Generate
              </button>
              <div className="bg-purple rounded-full p-2 w-12 h-12 flex items-center cursor-pointer justify-center">
                <ArrowIcon />
              </div>
            </div>
            <div className="underline cursor-pointer">Learn more</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-6 flex-wrap">
        <div className="flex w-full lg:w-2/5 flex-col justify-center p-8">
          {feedbacks.map((item, index) => (
            <div
              key={item.name}
              className={[
                "p-2 flex justify-between items-start bg-white w-9/12 rounded-2xl mt-8 gap-3",
                (index + 1) % 2 === 0 && "translate-x-1/4",
              ].join(" ")}
            >
              {/* <div className="bg-slate-600 w-32 aspect-square rounded-xl"></div> */}
              <div className="flex flex-col">
                <h6 className=" leading-none">{item.name}</h6>
                <p className=" text-slate-600 text-sm">{item.team}</p>
                <p className="font-light mt-2">{item.feedback}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 w-full lg:w-3/5 flex justify-end">
          <Blocks />
        </div>
      </div>
    </div>
  );
};
