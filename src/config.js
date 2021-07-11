import * as fcl from "@onflow/fcl"

fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org") // Flow testnet
  .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn") // Blocto testnet wallet
