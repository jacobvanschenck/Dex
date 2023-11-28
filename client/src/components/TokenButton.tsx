import { Dispatch, SetStateAction } from 'react';
import { TokenType } from '../types';

type TokenButtonProps = {
  token: TokenType;
  isSelected: boolean;
  setSelectedToken: Dispatch<SetStateAction<TokenType>>;
};

export default function TokenButton({ token, isSelected, setSelectedToken }: TokenButtonProps) {
  return (
    <button
      className={`py-4 flex-1 px-6 text-xs font-bold rounded-[50px] focus:bg-neutral-500 transition-colors duration-100 ${
        isSelected ? 'bg-neutral-500' : 'bg-neutral-800 text-neutral-500'
      }`}
      onClick={() => setSelectedToken(token)}
    >
      {token}
    </button>
  );
}
