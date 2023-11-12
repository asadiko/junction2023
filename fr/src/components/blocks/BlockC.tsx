import { ClockIcon } from "../../assets";

export const BlockC = () => {
  return (
    <div className="block_c blck p-5 flex">
      <div className="icons">
        <div>
          <ClockIcon />
        </div>
      </div>
      <div className="text flex flex-col w-2/3">
        <h2 className="text-white text-2xl">Save 45% of time</h2>
        <p className="text-[#E5E5E5] mt-2">
          generate with creo on the same platform, and save you precious time
        </p>
      </div>
    </div>
  );
};
