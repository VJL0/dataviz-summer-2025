interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={`h-full rounded-lg border border-slate-200 bg-white p-4 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
