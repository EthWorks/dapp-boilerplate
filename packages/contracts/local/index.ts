import { Wallet } from "ethers"
import { deploy } from "./deploy"
import { startGanache } from "./provider"

const PRIVATE_KEY = '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'
const PORT = 8545

startAndDeploy().catch(e => {
  console.error(e)
  process.exit(1)
})

async function startAndDeploy() {
  const provider = await startGanache(PRIVATE_KEY, PORT)
  const wallet = new Wallet(PRIVATE_KEY, provider)
  const contracts = await deploy(wallet)
  console.log(contracts)
}
