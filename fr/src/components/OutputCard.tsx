import { FC, ReactNode } from "react";
import { template } from "./GenerationModal";

interface OutputCardProps {
    img?: string;
    name: string;
    icon: ReactNode
    value: string
    selected: boolean
}

export const OutputCard:FC<OutputCardProps> = ({img, name, icon, value, selected}) => {
    return (
        <div onClick={() => template.value = value} className={`rounded-2xl w-full ${selected ? "border-2 border-solid border-[#49ef70]" : ""}`}>
            <div className={`w-full rounded-t-xl aspect-video h-auto `}>
                <img className="object-cover aspect-video rounded-t-xl" src={img} alt={value} />
            </div>
            <div className="bg-white flex gap-2 rounded-b-xl p-2">
                <p>{name}</p>
                {icon}
            </div>
        </div>
    )
}