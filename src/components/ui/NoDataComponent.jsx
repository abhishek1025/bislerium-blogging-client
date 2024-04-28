import { twMerge } from "tailwind-merge";
import NoDataImage from "../../assets/images/NoDataImage.png";

const NoDataComponent = ({ message, imgWidth }) => {
    return (
        <div className="flex justify-center flex-col items-center">
            <img
                src={NoDataImage}
                alt="No Data"
                className={twMerge("w-full md:w-[40%]", imgWidth)}
            />
            <div className="text-center space-y-1 mt-5">
                <h2 className="text-lg font-bold">{message?.toUpperCase()}</h2>
            </div>
        </div>
    );
};

export default NoDataComponent;
