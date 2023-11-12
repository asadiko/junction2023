import { FC } from "react";
import { isModal2Open, isModalOpen } from "../pages";

interface BlurLayerProps {
  children: React.ReactNode;
}

export const BlurLayer: FC<BlurLayerProps> = ({ children }) => {
  return (
    <div
      className={[
        "absolute top-0 left-0 w-full min-h-screen z-90 dark_layer flex modal_blur_layer justify-center items-center",
        (isModalOpen.value || isModal2Open.value) ? "modal_blur_layer_open" : "modal_blur_layer_closed",
      ].join(" ")}
    >
      {children}
    </div>
  );
};
