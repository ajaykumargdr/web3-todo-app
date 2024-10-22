import React, { userState, useEffect, useContext } from 'react';
// import {MdVerified} from 

import { ToDoListContext } from '@/context/ToDolistApp';

const Home = () => {

  const { checkIfWalletIsConnect, connectWallet, toDoList, error } = useContext(ToDoListContext);

  // runs every time the below react code rerenders
  // any state change or page reload triggers the rerender
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <div>
      Home

      <br />
      <text>{error}</text>

      <br />
      <button onClick={connectWallet}> Connect to MetaMask</button>

    </div>
  )
}

export default Home