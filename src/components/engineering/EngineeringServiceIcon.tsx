import React from 'react';
import { 
  Building2, 
  DraftingCompass, 
  Calculator, 
  FileSpreadsheet, 
  HardHat, 
  Compass,
  Layers
} from 'lucide-react';

interface EngineeringServiceIconProps {
  name: 'building' | 'drafting' | 'calculator' | 'spreadsheet' | 'hardhat' | 'compass' | string;
  className?: string;
}

export const EngineeringServiceIcon: React.FC<EngineeringServiceIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'building':
      return <Building2 className={className} />;
    case 'drafting':
      return <DraftingCompass className={className} />;
    case 'calculator':
      return <Calculator className={className} />;
    case 'spreadsheet':
      return <FileSpreadsheet className={className} />;
    case 'hardhat':
      return <HardHat className={className} />;
    case 'compass':
      return <Compass className={className} />;
    default:
      return <Layers className={className} />;
  }
};
