import toast, { Toast } from 'react-hot-toast';

export type DisplayToastOptions = {
  type: 'success' | 'error' | 'warning';
  duration?: number;
};

function SuccessToast({ t, message }: { t: Toast; message: string }) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-exit'
      } max-w-md w-full bg-neutral-800 rounded-[50px] pointer-events-auto flex items-center p-4 ring-1 ring-black ring-opacity-5`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="pr-2 w-8 h-8 stroke-green-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <div className="flex-1 pl-2 w-0 border-l-[1.5px] border-l-green-500 h-fit">{message}</div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex justify-center items-center w-full text-sm font-medium hover:text-neutral-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function WarningToast({ t, message }: { t: Toast; message: string }) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-exit'
      } max-w-md w-full bg-neutral-800 rounded-[50px] pointer-events-auto flex items-center p-4 ring-1 ring-black ring-opacity-5`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="pr-2 w-8 h-8 stroke-yellow-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
      <div className="flex-1 pl-2 w-0 border-l-[1.5px] border-l-yellow-500 h-fit">{message}</div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex justify-center items-center w-full text-sm font-medium hover:text-neutral-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ErrorToast({ t, message }: { t: Toast; message: string }) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-exit'
      } max-w-md w-full bg-neutral-800 rounded-[50px] pointer-events-auto flex items-center p-4 ring-1 ring-black ring-opacity-5`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="pr-2 w-8 h-8 stroke-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <div className="flex-1 pl-2 w-0 border-l-2 border-l-red-500 h-fit">{message}</div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex justify-center items-center w-full text-sm font-medium hover:text-neutral-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
export function displayToast(message: string, opts: DisplayToastOptions) {
  switch (opts.type) {
    case 'success':
      toast.custom((t) => <SuccessToast t={t} message={message} />, { id: message, duration: opts.duration ?? 3000 });
      break;
    case 'error':
      toast.custom((t) => <ErrorToast t={t} message={message} />, { id: message, duration: opts.duration ?? 3000 });
      break;
    case 'warning':
      toast.custom((t) => <WarningToast t={t} message={message} />, { id: message, duration: opts.duration ?? 3000 });
      break;
  }
}
