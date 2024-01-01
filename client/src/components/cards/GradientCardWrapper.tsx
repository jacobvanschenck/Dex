import { ReactNode } from 'react';

type GradientCardWrapperProps = {
  className?: string;
  children: ReactNode;
};
export default function GradientCardWrapper({ className = undefined, children }: GradientCardWrapperProps) {
  return (
    <div
      className={`${
        className ? className : ''
      } flex text-primary-50 flex-grow p-8 w-full bg-gradient-to-br rounded-[50px] from-primary-500 from-60% overflow-hidden to-primary-300`}
    >
      {children}
    </div>
  );
}
