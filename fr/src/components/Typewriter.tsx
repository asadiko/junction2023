import Typewriter from "typewriter-effect";

const introText =
  "AI powered solution for the real-time business decisions optimization";

export const TypewriterComponent = () => {

  return (
    <div className="flex justify-center items-center min-h-screen abyssinica text-5xl backdrop-blur-md">
      <div className="w-1/3 abyssinica">
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(introText).start();
          }}
          options={{
            delay: 3000 / introText.length,
            wrapperClassName: "typewriter_text",
          }}
        />
      </div>
    </div>
  );
};
