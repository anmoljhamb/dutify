import { ImageBg } from "../components";

export const AssignedTask = () => {
    return (
        <div className="relative ml-[200px] flex h-full w-[calc(100%-200px)] flex-col items-center justify-center bg-bgColor">
            <ImageBg />
            <div className="z-10 bg-white p-4">Assigned Tasks</div>
        </div>
    );
};
