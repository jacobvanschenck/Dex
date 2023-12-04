type PillProps = {
  caption: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function Pill({ caption, isSelected, onClick }: PillProps) {
  return (
    <button
      className={`py-2 flex-1 px-4 text-primary-50 text-xs font-bold rounded-[50px] transition-colors duration-100 ${
        isSelected ? 'bg-primary-500' : 'bg-primary-800 text-primary-500'
      }`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
}
