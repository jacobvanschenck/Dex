import { ReactNode } from 'react';

type NavButtonProps = {
  isSelected: boolean;
  onClick: () => void;
  children: ReactNode;
};
export default function NavButton({ isSelected, onClick, children }: NavButtonProps) {
  return (
    <button
      className={`p-3 aspect-square rounded-full transition-all duration-100 active:enabled:scale-90 ${
        isSelected ? 'bg-neutral-100 stroke-neutral-900' : 'bg-neutral-700 stroke-neutral-400'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
