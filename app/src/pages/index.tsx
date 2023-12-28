import dynamic from 'next/dynamic'
import { Account } from '@/components/Account'
import { TokenBalance } from '@/components/TokenBalance'

function Home() {
	return (
		<main className="p-6">
			<Account />
			<TokenBalance />
		</main>
	)
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })
