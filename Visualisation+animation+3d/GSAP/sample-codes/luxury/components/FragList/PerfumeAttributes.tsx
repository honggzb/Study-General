import {  CrownIcon, Droplet, FlameIcon, GemIcon, TreesIcon, ZapIcon, LucideIcon } from 'lucide-react';

type scentProfileType = "spicy" | "woody" | "fresh";
type moodProfileType = "bold" | "grounded" | "refreshing";
type AttributeData = {
  label: string;
  icon: LucideIcon;
};
const SCENT_PROFILES: Record<scentProfileType, AttributeData> = {
  "spicy": { label: "Spicy & Smoky", icon: <FlameIcon  className="size-6" /> },
  "woody": { label: "Woody & Herbal", icon: <TreesIcon  className="size-6" />},
  "fresh": { label: "Fresh & Aquatic", icon: <Droplet  className="size-6" /> },
};
const MOODS: Record<moodProfileType, AttributeData> = {
  "bold": { label: "Bold & Seductive", icon: <CrownIcon  className="size-6" />},
  "grounded": { label: "Grounded & Sophisticated", icon: <GemIcon  className="size-6" /> },
  "refreshing": { label: "Refreshing & Invigorating", icon: <ZapIcon  className="size-6" /> },
};

type PerfumeAttributesProps = {
  scentProfile: scentProfileType;
  mood: moodProfileType;
  className?: string;
};

const PerfumeAttributes = ({
  mood,
  scentProfile,
  className,
}: PerfumeAttributesProps) => {
  const scentProfile1 = SCENT_PROFILES[scentProfile];
  const mood1 = MOODS[mood];

  return (
    <div className={className}>
      <p className="mb-2 text-base uppercase">Features</p>
      <div className="grid gap-2">
        <p className="flex items-center gap-2">
          {scentProfile1.icon}
          {scentProfile1.label}
        </p>
        <p className="flex items-center gap-2">
          {mood1.icon}
          {mood1.label}
        </p>
      </div>
    </div>
  )
}

export default PerfumeAttributes