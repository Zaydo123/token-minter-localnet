//Card.tsx
import { useEffect, useState } from 'react'
import { Web3ReactSelectedHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'

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
      Promise.resolve(connector.activate(0))
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
    <div className="flex flex-col items-center gap-3 mt-10">

    <p className='text-2xl font-bold'>{name.toUpperCase()}</p>
    <h4 className='text-lg overflow-x-hidden'>Status: {(error?.message) ? ("Error: " + error.message) : connectionStatus}</h4>
    <h4 className='text-lg overflow-x-hidden' style={{ maxWidth: '200px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>Address: {account ? account : "No Account Detected"}</h4>
    <h4 className='text-lg overflow-x-hidden'>ChainId:  {chain ? chain : 'N/A'}</h4>


    <button onClick={handleToggleConnect} disabled={false} className='bg-blue-500 text-white rounded-lg text-sm w-1/3 p-2'>
      {isActive ? "Disconnect" : "Connect"}
    </button>

  </div>
  )
}