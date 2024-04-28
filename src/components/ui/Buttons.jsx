import { PropTypes } from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const ButtonWithHoverEffect = ({
  type,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        'w-full bg-black text-white my-3 h-[40px] flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#3c84ef] before:to-[rgb(104,166,237)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 text-xs',
        className
      )}>
      {children}
    </button>
  );
};

ButtonWithHoverEffect.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const NormalButton = ({ type, className, onClick, children }) => {
  return (
    <button
      type={type}
      className={twMerge(
        'bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg w-full text-xs',
        className
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};

NormalButton.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

