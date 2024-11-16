import { MdVerified } from "react-icons/md";
import React, { userState, useEffect, useContext, useState } from 'react';
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { TiRefreshOutline } from "react-icons/ti";
import Image from 'next/image';

import { ToDoListContext } from '@/context/ToDolistApp';
import Style from '@/styles/index.module.css';
import Loading from '@/loading.gif';
import Data from '@/components/Data';

const Home = () => {

  const [message, setMessage] = useState('');

  const {
    checkIfWalletIsConnect, // function to check if wallet connected to wallet
    connectWallet,  // function to connect wallet
    getToDoList,  // function to get all messages to the state myList 
    toDoList, // function to add todo message
    change, // function to toggle the message to done/undone 
    currentAccount, // state that stores address of current account
    error,  // state that stores the error
    allToDoList,  // 
    myList, // state that stores all messages
    allAddress  // state that stores all user addresses
  } = useContext(ToDoListContext);

  // runs every time the below react code rerenders
  // any state change or page reload triggers the rerender
  useEffect(() => {
    checkIfWalletIsConnect();
    getToDoList();
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
            <h2>ToDo History List <TiRefreshOutline onClick={() => getToDoList()} /> </h2>

            {myList.map((el) => (

              <div className={Style.home_completed_list}>
                <MdVerified className={Style.iconColor} />
                <h3>{el.slice(0, 30)}</h3>
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
              allAddress={allAddress}
              myList={myList}
              change={change}
            />

          </div>
        </div>

      </div>

    </div>
  )
}

export default Home