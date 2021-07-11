import React, { useEffect, useState } from 'react'
import * as fcl from '@onflow/fcl'
import * as t from "@onflow/types"

const getMessageScript = `
import MessageBoard from 0xa71cbec87013c09f

pub fun main(): String {
    return MessageBoard.getMessage()
}
`;

const setMessageTransaction = `
import MessageBoard from 0xa71cbec87013c09f

transaction(message: String) {
    prepare() {
        MessageBoard.setMessage(message: message)
    }
}
`;

const Message = () => {
    const [message, setMessage] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const updateMessage = () => {
        fcl.send([
            fcl.script(getMessageScript)
        ])
            .then(fcl.decode)
            .then(setMessage)
    }

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleSubmit = () => {
        setIsProcessing(true);

        fcl.send([
            fcl.transaction(setMessageTransaction),
            fcl.args([
                fcl.arg(newMessage, t.String),
            ]),
            fcl.proposer(fcl.currentUser().authorization),
            fcl.payer(fcl.currentUser().authorization),
            fcl.limit(100),
        ])
            .then(({ transactionId }) => {
                const unsub = fcl
                    .tx({ transactionId })
                    .subscribe(transaction => {
                        if (fcl.tx.isSealed(transaction)) {
                            updateMessage();
                            unsub();
                            setIsProcessing(false);
                        }
                    });
            })
    }

    useEffect(updateMessage, []);

    return (
        <div>
            <div>Message: {message}</div>
            <div>
                <input onChange={handleInputChange} />
                <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    )
}

export default Message;
