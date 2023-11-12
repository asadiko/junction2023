import { AdobeIcon, ChatGTPIcon, MidjourneyIcon } from "../../assets"

export const BlockA = () => {
    return (
        <div className="block_a p-5 flex blck">
            <div className="text flex flex-col w-2/3">
                <h2 className="text-white text-2xl">AI tools</h2>
                <p className="text-[#CBCBCB] mt-4">
                    <b>creo</b> provides latest AI tools for the best available quality of building a platform
                </p>
            </div>
            <div className="icons">
                <div><ChatGTPIcon /></div>
                <div className="adobe"><AdobeIcon /></div>
                <div className="mdj"><MidjourneyIcon /></div>
            </div>
        </div>
    )
}