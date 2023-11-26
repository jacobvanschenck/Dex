import { Dispatch, SetStateAction } from 'react';
import Dropdown from './Dropdown';
import { DexContract, TokenStructType } from './utils';

type HeaderProps = {
  selectedToken: TokenStructType;
  setSelectedToken: Dispatch<SetStateAction<TokenStructType>>;
  tokens: Array<TokenStructType>;
  dex: DexContract;
};

function Header({ tokens, dex, selectedToken, setSelectedToken }: HeaderProps) {
  return (
    <header>
      <div>
        <div>
          <Dropdown
            items={tokens.map((token) => ({
              label: token.name,
              value: token,
            }))}
            activeItem={{
              label: selectedToken.name,
              value: selectedToken,
            }}
            onSelect={setSelectedToken}
          />
        </div>
        <div className="">
          <h1 className="">
            Dex -
            <span className="contract-address">
              Contract Address: <span className="address">{dex.address}</span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
