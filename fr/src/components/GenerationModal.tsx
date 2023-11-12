import { useEffect, useRef } from "react";
import { outputs } from "../data/outputs";
import { OutputCard } from "./OutputCard";
import { isModal2Open, isModalOpen } from "../pages";
import { colors } from "../data/colors";
import { MagicIcon } from "../assets";
import stepsImage from '../assets/steps.jpg'
import { signal } from "@preact/signals-react";
import api from '../api/requests'

export const isCodeGenerating = signal(false)
export const selectedColor = signal("")
export const template = signal("")

export const codeBase = signal<any>({})

export const GenerationModal = () => {
    const modalRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLTextAreaElement | null>(null)
    const imgInputRef = useRef<HTMLInputElement | null>(null)
    const nameInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!modalRef.current) return
        if (!isModalOpen.value) return

        window.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [modalRef, isModalOpen])

    const handleClick = (e: MouseEvent):void => {
        if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
            isModalOpen.value = false
        }
    }

    const handleColorChange = (newColor: string):void => {
        selectedColor.value = newColor
    }

    const fetchCode = async () => {
        try {
            isCodeGenerating.value = true
            const res = await api.fetchCode({
                color: selectedColor.value, 
                imagePrompts: imgInputRef.current!.value,
                prompt: inputRef.current!.value,
                name: nameInputRef.current!.value
            })
            codeBase.value = res.data.code
        } catch (error) {
            console.log(error);
            codeBase.value = new Error("Failed to fetch code")
        } finally {
            isModalOpen.value = false
            setTimeout(() => {
                isCodeGenerating.value = false
                isModal2Open.value = true
            }, 2000)
        }
    }

  return (
    <div ref={modalRef} className="generation_modal p-6 rounded-3xl min-w-[66vw] max-w-[80vw]">
      <h3 className="text-2xl ml-6">Generation settings</h3>
      <div className="grid grid-cols-2 w-full gap-6">
        <div className="flex flex-col bg-white rounded-2xl p-6 w-full mt-6">
          <h3 className="text-2xl mt-2 mb-6">Description</h3>
          <label className="flex flex-col">
            <h6 className="font-bold">Business name</h6>
            <input ref={nameInputRef} className="rounded-lg w-full bg-[#E3E4E9] p-2" type="text" placeholder="Write artists or styles..." />
          </label>
          <label className="flex flex-col my-6">
            <h6 className="font-bold">Image prompts</h6>
            <input ref={imgInputRef} className="rounded-lg w-full bg-[#E3E4E9] p-2" type="text" placeholder="Write artists or styles..." />
          </label>
          <label className="flex flex-col">
            <h6 className="font-bold">Prompts</h6> (maximum 40)
            <textarea ref={inputRef} className="rounded-lg w-full bg-[#E3E4E9] p-2 min-h-[15rem]" placeholder="Write prompt..." />
          </label>
        </div>
        <div>
            <div className="flex flex-col bg-[#DBC5FF] rounded-2xl py-2 px-6 w-full mt-6">
                <div className="flex flex-col">
                    <h4 className="text-xl">Topic</h4>
                    <p className="font-light">
                        Select theme of an expected output
                    </p>
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                    {
                        outputs.map(item => (
                            <OutputCard selected={item.value === template.value} key={item.value} {...item} />
                        ))
                    }
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl w-full mt-6 overflow-hidden h-40 bg-white">
                    <img src={stepsImage} className="object-cover" />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="rounded-2xl w-full mt-6 p-2 bg-white">
                        <div className="grid grid-cols-7 gap-1">
                            {
                                colors.slice(0, -3).map(color => (
                                    <div onClick={() => handleColorChange(color)} className="rounded-md w-full aspect-square h-auto" key={color} style={{background: color}}>

                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex gap-1 mt-1">
                            {
                                colors.slice(-3).map(color => (
                                    <div onClick={() => handleColorChange(color)} className="rounded-md w-10 aspect-square h-auto" key={color} style={{background: color}}>

                                    </div>
                                ))
                            }
                            <div className="rounded-md w-1/2 overflow-hidden flex text-slate-600 border border-solid border-[#f0f0f0]">
                                <div className="w-10 aspect-square flex justify-center items-center h-auto bg-[#f0f0f0]">#</div>
                                <input className="p-1 rounded-r-md" type="text" value={selectedColor.value.replace("#", "")} defaultValue="AB313A" />
                            </div>
                        </div>
                    </div>
                    <button 
                        className="p-2 bg-purple rounded-xl text-white text-center flex gap-2 justify-center items-center"
                        onClick={() => fetchCode()}
                    >
                        <MagicIcon /> Generate
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
