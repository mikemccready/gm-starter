import { Address, useAccount, useBalance, useToken } from 'wagmi'
import contractAddresses from '@/contracts/addresses.json'

export function TokenBalance() {
  const tokenAddress = contractAddresses.Token as Address
  const { address, isConnected } = useAccount()

  const {
    data: token,
    isError,
    isLoading,
  } = useToken({
    enabled: isConnected,
    address: tokenAddress,
  })

  const { data: tokenBalance } = useBalance({
    address,
    enabled: isConnected,
    token: tokenAddress,
  })

  if (!isConnected)
    return <div className="py-6">Please connect your account</div>
  if (isLoading) return <div className="py-6">Fetching token balance…</div>
  if (isError) return <div className="py-6">Error fetching token</div>

  return (
    <div className="py-6">
      {token?.symbol} Balance: {tokenBalance?.formatted}
    </div>
  )
}
