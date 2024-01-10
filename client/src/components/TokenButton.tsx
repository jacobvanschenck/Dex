import { TokenType } from '../types';

type TokenButtonProps = {
  token: TokenType;
  isSelected: boolean;
  setSelectedToken: (token: TokenType) => void;
};

export default function TokenButton({ token, isSelected, setSelectedToken }: TokenButtonProps) {
  return (
    <button
      className={`py-4 flex-1 px-6 text-xs font-bold rounded-[50px] transition-all duration-100 active:enabled:scale-90 ${
        isSelected
          ? 'bg-neutral-500'
          : 'bg-neutral-800 text-neutral-500 active:enabled:bg-neutral-700 hover:text-neutral-400 '
      }`}
      onClick={() => setSelectedToken(token)}
    >
      {token}
    </button>
  );
}
