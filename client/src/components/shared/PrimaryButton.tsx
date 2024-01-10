import { ReactNode, useState } from 'react';
import { PulseLoader } from 'react-spinners';

type PrimaryButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  asyncAction?: () => Promise<void>;
  action?: () => void;
  type?: 'button' | 'submit';
  active?: boolean;
};

export function PrimaryButton({
  action = undefined,
  asyncAction = undefined,
  type = 'button',
  active = false,
  disabled,
  children,
}: PrimaryButtonProps) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      type={type}
      className={`flex gap-2 justify-center items-center py-4 px-5 font-bold w-fit bg-neutral-800 rounded-[50px] text-primary-50 disabled:bg-slate-200 transition-all duration-200 active:enabled:scale-90 ${
        active && 'outline outline-2 outline-offset-4 outline-neutral-100'
      }`}
      disabled={disabled}
      onClick={async () => {
        if (!action && !asyncAction) return;
        if (loading) return;
        setLoading(true);
        !!asyncAction && (await asyncAction());
        !!action && action();
        setLoading(false);
      }}
    >
      {loading ? <PulseLoader size="10px" color="lightgray" /> : children}
    </button>
  );
}
