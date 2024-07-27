/// <reference types="vite-plugin-svgr/client" />
import { useWeb3React } from "@web3-react/core";
import Card from "../components/Card";
import { useState } from "react";
import { useEffect } from "react";

let currPublicKey: string = '';

function rpcInputField() {
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

function settingsBox( {connector, hooks}: {connector: any, hooks: any} ) {
  
  useEffect(() => {
    if (window.phantom?.solana.isPhantom) {
      console.log( window.phantom?.solana.connect().then((res: any) => {
        console.log(res.publicKey.toString());
      }) );
    }
  });
  return (
    <div className="bg-stone-900 flex flex-col rounded-xl w-full">
      <h2 className="pt-10">Settings</h2>
        <Card connector={connector} hooks={hooks} name='Solana' />
        {rpcInputField()}
    </div>
  )
}


function tokenInfoInput(connector: any, hooks: any) {

  const [tokenName, setTokenName] = useState<string>('');
  const [ticker, setTicker] = useState<string>('');
  const [decimals, setDecimals] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [mintable, setMintable] = useState<boolean>(false);
  const [freezeable, setFreezeable] = useState<boolean>(false);
  
  const [mintAuthority, setMintAuthority] = useState<string>('');
  const [freezeAuthority, setFreezeAuthority] = useState<string>('');
  const [metaChangeAuthority, setMetaChangeAuthority] = useState<string>(connector.provider?.selectedAddress);

  return (

    <div className="bg-stone-900 flex flex-col items-center rounded-xl w-full p-10">

      <h1>Token Info</h1>
      <hr className="w-3/4 text-left ml-0 mt-2 mb-5"></hr>
      <form className="flex flex-col gap-4 pt-5">
        <h3>Meta</h3>
        <input type="text" placeholder="Token Name" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />
        <input type="text" placeholder="Ticker: e.g BTC" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" value={ticker} onChange={(e) => setTicker(e.target.value)} />
        <h3>Contract</h3>     
        
        <label>Decimals</label>
        <input type="number" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" max={9} min={1} value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} />
        
        <label>Total Supply</label>
        <input type="number" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" min={1} value={totalSupply} onChange={(e) => setTotalSupply(Number(e.target.value))} />
        
        <div className="flex flex-row gap-4">
          <input type="checkbox" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" checked={mintable} onChange={(e) => setMintable(e.target.checked)} /> Mintable
          <input type="checkbox" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" checked={freezeable} onChange={(e) => setFreezeable(e.target.checked)} /> Freezeable
        </div>
        
        <h3>Authorities</h3>
        <input type="text" placeholder="Meta Change Authority" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" value={metaChangeAuthority} onChange={(e) => setMetaChangeAuthority(e.target.value)} />
        {mintable &&
        <input type="text" placeholder="Mint Authority" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" value={mintAuthority} onChange={(e) => setMintAuthority(e.target.value)} />
        }
        {freezeable &&
        <input type="text" placeholder="Freeze Authority" className="rounded-lg pl-2 pt-1 pb-1 bg-stone-800" value={freezeAuthority} onChange={(e) => setFreezeAuthority(e.target.value)} />
        }
        <button className="bg-red-500 text-white pl-2 pr-2 pt-1 pb-1 rounded-lg w-1/3 text-sm">Submit</button>
      </form>

    </div>

  )

}


function Dashboard() {
  
  const { connector, hooks } = useWeb3React();
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 w-full">
      {settingsBox({connector, hooks})}
      {tokenInfoInput(connector, hooks)}
    </div>
  )
}


export default Dashboard;