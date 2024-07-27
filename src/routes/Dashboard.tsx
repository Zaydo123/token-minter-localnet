/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import Sol from '../components/Connect';
import { useWallet } from "@solana/wallet-adapter-react";

const RpcInputField = () => {
  return (
    <div className="m-10 flex flex-col">
      <h3 className="text-white">RPC URL (optional)</h3>
      <div className="p-2 m-auto bg-stone-800 rounded-lg flex gap-3">
        <input type="text" placeholder="https://api.mainnet-beta.solana.com/" className="rounded-lg pl-2 bg-stone-800" />
        <button className="bg-red-500 text-white pl-2 pr-2 pt-1 pb-1 rounded-lg w-1/3 text-sm">Submit</button>
      </div>
    </div>
  )
}

const SettingsBox = () => {
  return (
    <div className="bg-stone-900 flex flex-col rounded-xl w-full items p-10">
      <h2 className="pt-10">Settings</h2>
      <RpcInputField />
      <Sol />
    </div>
  )
}

const TokenInfoInput = ({ currentPublicKey }: { currentPublicKey: string }) => {
  const [tokenInfo, setTokenInfo] = useState({
    tokenName: '',
    ticker: '',
    decimals: 0,
    totalSupply: 0,
    mintable: false,
    freezeable: false,
    mintAuthority: currentPublicKey,
    freezeAuthority: currentPublicKey,
    metaChangeAuthority: currentPublicKey
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTokenInfo(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  return (
    <div className="bg-stone-900 flex flex-col items-center rounded-xl w-full p-10">
      <h1>Token Info</h1>
      <hr className="w-3/4 text-left ml-0 mt-2 mb-5"></hr>
      <form className="flex flex-col gap-4 pt-5">
        <h3>Meta</h3>
        <input
          type="text"
          name="tokenName"
          placeholder="Token Name"
          className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
          value={tokenInfo.tokenName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ticker"
          placeholder="Ticker: e.g BTC"
          className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
          value={tokenInfo.ticker}
          onChange={handleChange}
        />
        <h3>Contract</h3>
        <label>Decimals</label>
        <input
          type="number"
          name="decimals"
          className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
          max={9}
          min={1}
          value={tokenInfo.decimals}
          onChange={handleChange}
        />
        <label>Total Supply</label>
        <input
          type="number"
          name="totalSupply"
          className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
          min={1}
          value={tokenInfo.totalSupply}
          onChange={handleChange}
        />
        <div className="flex flex-row gap-4">
          <input
            type="checkbox"
            name="mintable"
            className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
            checked={tokenInfo.mintable}
            onChange={handleChange}
          /> Mintable
          <input
            type="checkbox"
            name="freezeable"
            className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
            checked={tokenInfo.freezeable}
            onChange={handleChange}
          /> Freezeable
        </div>
        <h3>Authorities</h3>
        <>
        <label>Meta Change Authority</label>
        <input
          type="text"
          name="metaChangeAuthority"
          placeholder="Meta Change Authority"
          className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
          value={tokenInfo.metaChangeAuthority}
          onChange={handleChange}
        />
        </>
        {tokenInfo.mintable && (<>
          <label>Mint Authority</label>
          <input
            type="text"
            name="mintAuthority"
            placeholder="Mint Authority"
            className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
            value={tokenInfo.mintAuthority}
            onChange={handleChange}
          /></>
        )}
        {tokenInfo.freezeable && (
          <>
          <label>Freeze Authority</label>
          <input
            type="text"
            name="freezeAuthority"
            placeholder="Freeze Authority"
            className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800"
            value={tokenInfo.freezeAuthority}
            onChange={handleChange}
          />
          </>
        )}
        <button className="bg-red-500 text-white pl-2 pr-2 pt-1 pb-1 rounded-lg w-1/3 text-sm">Submit</button>
      </form>
    </div>
  )
}

const Dashboard = () => {
  const wallet = useWallet();
  const [currentPublicKey, setCurrentPublicKey] = useState<string>('None');

  useEffect(() => {
    const publicKey = wallet.publicKey?.toBase58() || 'None';
    setCurrentPublicKey(publicKey);
  }, [wallet.publicKey]);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 w-full">
      <SettingsBox />
      <TokenInfoInput currentPublicKey={currentPublicKey} />
    </div>
  )
}

export default Dashboard;
