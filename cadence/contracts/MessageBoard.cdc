pub contract MessageBoard {
    access(contract) var message: String

    pub fun setMessage(message: String) {
        self.message = message
    }

    pub fun getMessage(): String {
        return self.message
    }

    init () {
        self.message = ""
    }
}
