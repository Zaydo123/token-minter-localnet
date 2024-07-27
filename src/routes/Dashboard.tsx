/// <reference types="vite-plugin-svgr/client" />
import { useWeb3React } from "@web3-react/core";
import Card from "../components/Card";

function rpcInputField() {
  return (
    <div className="m-10 flex flex-col">
      <h3 className="text-white">RPC URL (optional)</h3>
      <div className="p-1 m-auto bg-stone-800 rounded-lg flex gap-2">
        <input type="text" placeholder="https://api.mainnet-beta.solana.com/" className="rounded-lg text-center" />
        <button className="bg-red-500 text-white p-1 rounded-lg w-1/3 text-sm">Submit</button>
      </div>
    </div>
  )
}

function connectPhantomButton(connector, hooks) {  
  return (
    <div className="m-5 flex flex-col text-left">
        <Card connector={connector} hooks={hooks} name='phantom' />
    </div>
  )
}

function settingsBox( {connector, hooks} ) {
  return (
    <div className="bg-stone-900 flex flex-col items-center rounded-xl">
      <h2 className="pt-10">Settings</h2>
      {connectPhantomButton(connector, hooks)}
      {rpcInputField()}
    </div>
  )
}

function Dashboard() {
  
  const { connector, hooks } = useWeb3React();
  return (
    <>
      {settingsBox({connector, hooks})}
    </>
  )
}


export default Dashboard;