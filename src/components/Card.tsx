//Card.tsx
import { useEffect, useState } from 'react'
import { Web3ReactSelectedHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import PhantomSVG from "../assets/phantom_wallet.svg?react"

export default function Card({connector, hooks, name}: {connector: Connector, hooks: Web3ReactSelectedHooks, name: string}) {
  const {useSelectedAccount, useSelectedChainId, useSelectedIsActive, useSelectedIsActivating } = hooks
  const isActivating = useSelectedIsActivating(connector)
  const isActive = useSelectedIsActive(connector)
  const account = useSelectedAccount(connector)
  const chain = useSelectedChainId(connector)

  const [error, setError] = useState<Error | undefined>(undefined)
  const [connectionStatus, setConnectionStatus] = useState('Disconnected')

  const handleToggleConnect = () => {
    setError(undefined) // clear error state

    if (isActive) {
      if(connector?.deactivate) {
        void connector.deactivate()
      } else {
        void connector.resetState()
      }
    }
    else if (!isActivating) {
      setConnectionStatus('Connecting..')
        Promise.resolve(connector.activate(1))
        .catch((e) => {
          connector.resetState()
          setError(e)
        }) 
      }
  }
  useEffect(() => {
    if(isActive) {
      setConnectionStatus('Connected')
    } else {
      setConnectionStatus('Disconnected')
    }
  }
  ,[isActive])

  return (
    <div className='flex flex-row items-center w-full'>

      <PhantomSVG className='m-auto rounded-xl'/>

      <div className='flex flex-col items-left p-3 m-auto'>
        
        <p>{name.toUpperCase()}</p>
        <h4 className='max-w-52 overflow-x-hidden'>Status - {(error?.message) ? ("Error: " + error.message) : connectionStatus}</h4>
        <h4 className='max-w-52 overflow-x-hidden'>Address - {account ? account : "No Account Detected"}</h4>
        <h4 className='max-w-52 overflow-x-hidden'>ChainId -  {chain ? chain : 'No Chain Connected'}</h4>
        <button onClick={handleToggleConnect} disabled={false} className='bg-blue-500 text-white p-2 rounded-lg w-1/2 text-sm'>
          {isActive ? "Disconnect" : "Connect"}
        </button>

      </div>
      
    </div>
  )
}