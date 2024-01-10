import { ReactNode } from 'react';

type PillProps = {
  caption: string | ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

export default function Pill({ caption, isSelected, onClick }: PillProps) {
  return (
    <button
      className={`py-2 whitespace-nowrap flex-1 px-4 text-primary-50 text-xs font-bold rounded-[50px] transition-colors duration-100 active:enabled:scale-95 ${
        isSelected
          ? 'bg-primary-500'
          : 'bg-primary-800 text-primary-500 hover:text-primary-400 active:enabled:bg-primary-700 '
      }`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
}
