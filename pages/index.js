import { MdVerified } from "react-icons/md";
import React, { useEffect, useContext, useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import Image from 'next/image';

import { ToDoListContext } from '@/context/ToDolistApp';
import Style from '@/styles/index.module.css';
import Loading from '@/loading.gif';
import Data from '@/components/Data';

const Home = () => {

  const [message, setMessage] = useState('');

  const {
    checkIfWalletIsConnect,
    connectWallet,
    getToDoList,
    toDoList,
    change,
    deleteMessage,
    currentAccount,
    error,
    allToDoList,
    myList,
    allAddress
  } = useContext(ToDoListContext);

  // runs every time the below react code rerenders
  // any state change or page reload triggers the rerender
  useEffect(() => {
    checkIfWalletIsConnect().then((currentAccount) => {
      currentAccount ?
        getToDoList(currentAccount) : {}
    });
    console.log("err: ", error);
  }, []);

  return (
    <div className={Style.home}>

      {/* ################# NavBar ################# */}
      <div className={Style.navBar}>
        <Image src={Loading} alt="Logo" width={50} height={50} />

        <div className={Style.connect}>
          {
            !currentAccount ? (
              <button onClick={() => connectWallet()}>Connect Wallet</button>
            ) : (
              <button onClick={() => connectWallet()}>
                {currentAccount.slice(0, 20)}..
              </button>
            )
          }
        </div>
      </div>

      {/* ################# Home ################# */}

      <div className={Style.home_box}>

        {/* ################# Completed List ################# */}
        <div className={Style.home_completed}>

          {/* ################# Showing List ################# */}
          <div>
            <h2>ToDo History List</h2>

            {myList.map((el, i) => (
              <div key={i} className={Style.home_completed_list}>
                <MdVerified className={Style.iconColor} />
                <h3>{el}</h3>
              </div>
            ))}

          </div>

        </div>

        {/* ################# Create Todo ################# */}
        <div className={Style.home_create}>
          <div className={Style.home_create_box}>

            {/* ################# Input ################# */}
            <h2>Create BlockChain ToDo List</h2>

            <div className={Style.home_create_input}>

              <input
                type='Text'
                placeholder='Enter your todo'
                onChange={(e) => setMessage(e.target.value)}
              />

              {
                currentAccount ? (
                  <RiSendPlaneFill
                    className={Style.iconBlack}
                    onClick={() => toDoList(message)}
                  />
                ) : (
                  <RiSendPlaneFill className={Style.iconBlack} onClick={() => connectWallet()} />
                )}
            </div>

            {/* ################# Data ################# */}
            <Data
              allToDoList={allToDoList}
              currentAccount={currentAccount}
              change={change}
              deleteMessage={deleteMessage}
            />

          </div>
        </div>

      </div>

    </div>
  )
}

export default Home