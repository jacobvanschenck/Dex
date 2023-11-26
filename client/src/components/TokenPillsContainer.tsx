import { useState } from 'react';
import TokenButton from './TokenButton';

export default function TokenPillsContainer() {
  const tokens = ['DAI', 'BAT', 'REP', 'ZRX'];
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  return (
    <div className="flex gap-1 p-2 w-full bg-gray-800 rounded-[50px]">
      {tokens.map((t, i) => (
        <TokenButton key={i} token={t} isSelected={selectedToken === t} setSelectedToken={setSelectedToken} />
      ))}
    </div>
  );
}
