import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const OverlayToggle = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Button variant="ghost" size="icon" onClick={() => setVisible((v) => !v)}>
      {visible ? <EyeOff /> : <Eye />}
    </Button>
  );
};

export default OverlayToggle;
