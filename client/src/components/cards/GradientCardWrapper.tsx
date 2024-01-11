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
      } flex text-primary-50 md:grow p-8 w-full md:min-w-[360px] bg-gradient-to-br rounded-[50px] from-primary-500 from-60% to-primary-300`}
    >
      {children}
    </div>
  );
}
