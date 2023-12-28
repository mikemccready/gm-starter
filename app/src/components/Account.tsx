import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function Account() {
	const { address, isConnected, connector: activeConnector } = useAccount()

	const { connect, connectors, isLoading, error, pendingConnector } =
		useConnect()

	const { disconnect } = useDisconnect()

	return (
		<>
			{isConnected ? (
				<div>
					<p>Connected with {activeConnector?.name}</p>
					<p>Address {address}</p>
					<button
						className="border rounded px-2 my-1 block"
						onClick={() => disconnect()}
					>
						Disconnect
					</button>
				</div>
			) : (
				<div>
					<p>Connect with</p>
					{connectors.map(connector => {
						const { id, name, ready } = connector
						const isConnecting = isLoading && pendingConnector?.id === id
						return (
							<button
								disabled={!ready}
								key={id}
								className="border rounded px-2 my-1 block"
								onClick={() => connect({ connector })}
							>
								{`${name}${isConnecting && ' (connecting)'}`}
							</button>
						)
					})}
				</div>
			)}

			{error && <div>{error.message}</div>}
		</>
	)
}
