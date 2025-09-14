import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import OverlayToggle from "./buttons/OverlayToggle";
import CloseAppButton from "./buttons/CloseAppButton";
const iconPath = chrome.runtime.getURL("icon-48.png");

interface ExpertGogglesCardProps {
  moduleTitle?: string;
  items?: string[]; // expects length 6; will fall back to defaults
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
}

const defaultItems = [
  "Visualization Type",
  "Titles and Label",
  "Axes and Variable",
  "Range",
  "Marks",
  "Channel and Attributes",
];

export default function ExpertGogglesCard({
  moduleTitle = "Module 1",
  items = defaultItems,
  onPrev,
  onNext,
  onClose,
}: ExpertGogglesCardProps) {
  return (
    <Card className="w-full max-w-[880px] gap-0 overflow-hidden rounded-3xl bg-yellow-400 p-0">
      <CardHeader className="py-3">
        <div className="flex flex-col items-center gap-3">
          <CardTitle className="flex w-full justify-between text-2xl font-black uppercase">
            <div className="flex gap-4">
              <img
                src={iconPath}
                className="h-8 w-8 gap-3 rounded-full border"
              />
              Expert Goggles
            </div>

            <div>
              <OverlayToggle />
              <CloseAppButton />
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center justify-center gap-4 px-6">
              <Button
                variant="ghost"
                onClick={onPrev}
                className="h-9 w-9 rounded-full text-neutral-900 hover:bg-yellow-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="select-none text-lg font-semibold text-neutral-900">
                {moduleTitle}
              </div>
              <Button
                variant="ghost"
                onClick={onNext}
                className="h-9 w-9 rounded-full text-neutral-900 hover:bg-yellow-300"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardDescription>
        </div>
      </CardHeader>

      {/* CONTENT GRID */}
      <CardContent className="bg-white pb-8 pt-10">
        <div className="grid grid-cols-2 gap-4">
          {items.map((label) => (
            <Button
              key={label}
              variant="ghost"
              className="flex h-auto flex-col items-center gap-1"
            >
              <img src={iconPath} className="h-12 w-12" />
              <span className="text-center text-[15px] italic leading-tight text-neutral-700">
                {label}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={onClose} variant="secondary">
          <X className="h-6 w-6 text-neutral-900" strokeWidth={4} />
        </Button>
      </CardFooter>
    </Card>
  );
}
