import { Dispatch, SetStateAction } from 'react';
import TokenButton from './TokenButton';
import { TOKENS, TokenType } from '../types';

type TokenPillsContainerProps = {
  selectedToken: TokenType;
  setSelectedToken: Dispatch<SetStateAction<TokenType>>;
};

export default function TokenPillsContainer({ selectedToken, setSelectedToken }: TokenPillsContainerProps) {
  return (
    <div className="flex gap-1 p-2 w-full bg-gray-800 rounded-[50px]">
      {TOKENS.map((t, i) => (
        <TokenButton key={i} token={t} isSelected={selectedToken === t} setSelectedToken={setSelectedToken} />
      ))}
    </div>
  );
}
