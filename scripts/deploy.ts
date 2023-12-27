import fs from 'fs'
import path from 'path'
import { artifacts, ethers } from 'hardhat'
import { Token } from '../typechain-types'

async function main() {
	const token = await ethers.deployContract('Token', ['Test Token', 'TTX'])
	await token.waitForDeployment()

	saveFrontendFiles(token)
}

function saveFrontendFiles(token: Token) {
	const contractsDir = path.join(__dirname, '..', 'app', 'src', 'contracts')

	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir)
	}

	fs.writeFileSync(
		path.join(contractsDir, 'addresses.json'),
		JSON.stringify({ Token: token.target }, null, 2)
	)

	const TokenArtifact = artifacts.readArtifactSync('Token')
	const VaultArtifact = artifacts.readArtifactSync('BitstacksVault')

	fs.writeFileSync(
		path.join(contractsDir, 'Token.json'),
		JSON.stringify(TokenArtifact, null, 2)
	)
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
