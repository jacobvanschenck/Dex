import TokenButton from './TokenButton';
import { TOKENS } from '../types';
import { useDexStore } from '../store';

export default function TokenPillsContainer() {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const setSelectedToken = useDexStore((state) => state.setSelectedToken);

  return (
    <div className="hidden gap-1 p-2 w-full bg-gray-800 md:flex rounded-[50px]">
      {TOKENS.map((t, i) => (
        <TokenButton key={i} token={t} isSelected={selectedToken === t} setSelectedToken={setSelectedToken} />
      ))}
    </div>
  );
}
