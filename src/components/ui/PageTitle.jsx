import { twMerge } from "tailwind-merge";

const PageTitle = ({ title, className }) => {
    return <h1 className={twMerge("text-3xl font-bold", className)}>{title}</h1>;
};

export default PageTitle;
