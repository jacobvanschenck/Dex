import { minidenticon } from 'minidenticons';
import { useCallback } from 'react';

type AvatarProps = {
  username: string;
  size?: number;
};

export default function Avatar({ username, size = 40 }: AvatarProps) {
  const createAvatar = useCallback((username: string) => {
    const res = minidenticon(username);
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(res);
  }, []);

  return (
    <div className="rounded-full bg-neutral-50">
      <img width={size} height={size} alt="" src={createAvatar(username)} />
    </div>
  );
}
