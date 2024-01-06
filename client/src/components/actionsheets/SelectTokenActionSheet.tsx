import { useDexStore } from '../../store';
import { TOKENS } from '../../types';
import { PrimaryButton } from '../shared/PrimaryButton';

export default function SelectTokenActionSheet() {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const setSelectedToken = useDexStore((state) => state.setSelectedToken);

  return (
    <div className="flex flex-col gap-8 items-center">
      <p className="font-bold">Select token to trade</p>
      <div className="flex flex-wrap gap-4">
        {TOKENS.map((t, i) => (
          <PrimaryButton action={() => setSelectedToken(t)} key={i} active={t === selectedToken}>
            {t}
          </PrimaryButton>
        ))}
      </div>
    </div>
  );
}
