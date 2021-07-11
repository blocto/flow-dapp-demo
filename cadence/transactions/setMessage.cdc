import MessageBoard from "../contracts/MessageBoard.cdc"

transaction(message: String) {

    prepare(signer: AuthAccount) {
        MessageBoard.setMessage(message: message)
    }
}
