import MessageBoard from "../contracts/MessageBoard.cdc"

pub fun main(): String {
    return MessageBoard.getMessage()
}