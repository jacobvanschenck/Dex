import { ReactNode, useState } from 'react'
import { PulseLoader } from 'react-spinners'

type PrimaryButtonProps = {
    children: ReactNode
    disabled?: boolean
    action?: () => Promise<void>
}
export function PrimaryButton({
    action,
    disabled,
    children,
}: PrimaryButtonProps) {
    const [loading, setLoading] = useState(false)
    return loading ? (
        <div className="flex w-full justify-center items-center">
            <PulseLoader size="10px" color="lightgray" />
        </div>
    ) : (
        <button
            className="flex items-center justify-center rounded-md px-4 py-1 bg-cyan-500 text-slate-50 disabled:bg-slate-200"
            disabled={loading || disabled}
            onClick={async () => {
                if (!action) return
                setLoading(true)
                await action()
                setLoading(false)
            }}
        >
            {children}
        </button>
    )
}
