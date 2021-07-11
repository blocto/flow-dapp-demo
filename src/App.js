import React, { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';

import Login from './components/Login';
import Message from './components/Message';

function App() {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    fcl.currentUser().subscribe(user => setAddress(user.addr))
  }, [])

  return (
    <div>
      <Login address={address} />
      <Message />
    </div>
  );
}

export default App;
