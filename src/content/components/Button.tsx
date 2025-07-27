interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

// const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
//   <button
//     className="h-min w-min cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm whitespace-nowrap text-white hover:bg-blue-600"
//     onClick={onClick}
//   >
//     {children}
//   </button>
// );
const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    className="h-min w-min cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 text-sm whitespace-nowrap text-white hover:bg-yellow-500"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
