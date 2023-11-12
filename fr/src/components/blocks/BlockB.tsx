import MoneyIcon from "../../assets/MoneyIcon.png"

export const BlockB = () => {
    return (
        <div className="block_b p-5 flex blck relative h-[11.5rem]">
            <div className="text flex flex-col w-2/3">
                <h2 className="text-[#6D5A5A] text-2xl">Cost effective</h2>
                <p className="text-[#9D9D9D] mt-2">
                    <b>creo</b> provides latest AI tools for the best available quality of building a platform
                </p>
            </div>
            <div>
                <div className="absolute money_icon"><img src={MoneyIcon} alt="MoneyIcon" /></div>
            </div>
        </div>
    )
}