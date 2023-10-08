import { Dispatch, SetStateAction, useState } from 'react';
import { TokenStructType } from './utils';

type DropdownProps = {
  onSelect: Dispatch<SetStateAction<TokenStructType>>;
  activeItem: { label: string; value: TokenStructType };
  items: Array<{ label: string; value: TokenStructType }>;
};

function Dropdown({ onSelect, activeItem, items }: DropdownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selectItem = (item: TokenStructType) => {
    setDropdownVisible(!dropdownVisible);
    onSelect(item);
  };

  return (
    <div className="">
      <button className="" type="button" onClick={() => setDropdownVisible(!dropdownVisible)}>
        {activeItem.label}
      </button>
      <div className={``}>
        {items &&
          items.map((item, i) => (
            <button key={i} onClick={() => selectItem(item.value)}>
              {item.label}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Dropdown;
