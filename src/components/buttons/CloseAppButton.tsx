import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks";
import { setSelectedChartId } from "@/features/ui/uiSlice";

interface CloseAppButtonProps {
  className?: string;
}

const CloseAppButton: React.FC<CloseAppButtonProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setSelectedChartId(null));
  };

  return (
    <Button className={className} variant="ghost" size="icon" onClick={onClose}>
      <X />
    </Button>
  );
};

export default CloseAppButton;
