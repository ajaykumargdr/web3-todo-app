// import { useState } from "react";
import { useState, createContext, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// INTERNAL IMPORT
import { TODO_LIST_CONTRACT_ADDRESS, TODO_LIST_CONTRACT_ABI } from './constants';

/*
If you pass a provider, you can read data from the contract (e.g., call view or pure functions).
If you pass a signer, you can send transactions to the contract (e.g., call functions that modify state on the blockchain).
*/
const fetchContract = (singerOrProvider) => new ethers.Contract(TODO_LIST_CONTRACT_ADDRESS, TODO_LIST_CONTRACT_ABI, singerOrProvider);

export const ToDoListContext = createContext();

export const ToDoListProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [error, setError] = useState("");
    const [allToDoList, setAllToDoList] = useState([]);
    const [myList, setMyList] = useState([]);

    const [allAddress, setAllAddress] = useState([]);

    //------ CONNECTING METAMASK
    const checkIfWalletIsConnect = async () => {
        if (!window.ethereum) return setError("please install metamask");

        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        console.log(accounts);

        if (accounts.length) {
            setCurrentAccount(accounts[0]);
            // console.log("current account:" + accounts[0])
        } else {
            setError("Please connect the app to metamask!");
            console.log("metamask disconnected!")
        }
    };

    // CONNECT WALLET
    const connectWallet = async () => {
        if (!window.ethereum) return setError("please install metamask");

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        window.location.reload(false);
    }

    // INTERACTING WITH SMART CONTRACT
    const toDoList = async (message) => {

        try {
            // CONNECTING WITH SMART CONTRACT
            const w3provider = await new Web3Modal().connect();
            const provider = new ethers.BrowserProvider(w3provider);

            const signer = await provider.getSigner();
            console.log("signer:" + signer.address);

            const contract = fetchContract(signer);

            console.log(contract);
        } catch (error) {
            setError("something wrong with creating list:" + error);
        }

    }

    return (
        <ToDoListContext.Provider value={{ checkIfWalletIsConnect, connectWallet, toDoList, error }}>
            {children}
        </ToDoListContext.Provider>
    )
}
