// import { useState } from "react";
import { useState, createContext, useEffect } from 'react';
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
        if (!window.ethereum) {
            setError("please install metamask");
            return false;
        }
        try {

            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setCurrentAccount(signer.address);
                return signer.address;
            }
        } catch {
            setError("Please connect the app to metamask!");
            console.log("metamask is not connected!");
            return false;
        }
    };

    // CONNECT WALLET
    const connectWallet = async () => {
        if (!window.ethereum) return setError("please install metamask");

        try {
            await window.ethereum.request({
                method: "wallet_requestPermissions", params: [
                    {
                        eth_accounts: {}
                    }
                ]
            });

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            window.location.reload(false);

        } catch (e) {
            setError("not able to connect to the account:" + e);
            return;
        }
    }

    const getContract = async () => {

        // Reset your provider/web3 instance when account changes
        window.ethereum.on('accountsChanged', function (accounts) {
            // Reload the page
            window.location.reload()
        });

        // CONNECTING WITH SMART CONTRACT
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        return fetchContract(signer);
    }

    // INTERACTING WITH SMART CONTRACT
    const toDoList = async (message) => {

        try {
            const contract = await getContract();
            const transactionResponse = await contract.createList(message);
            transactionResponse.wait();  // TransactionResponse.wait() which waits until the block to be mined
            window.location.reload();
        } catch (error) {
            setError("something wrong with creating list: " + error);
        }

    }

    const getToDoList = async (currentAccount) => {
        try {
            const contract = await getContract();

            // GET DATA
            const allCreatorAddress = await contract.getAllUsers();
            setAllAddress(allCreatorAddress);
            setMyList([]);
            setAllToDoList([]);

            allCreatorAddress.map(async (ele) => {
                const creatorData = await contract.getCreatorData(ele);
                setAllToDoList(allToDoList => [...allToDoList, creatorData]);

                if (creatorData[0] == currentAccount) {
                    setMyList(creatorData[2]);
                }
            });
        } catch (error) {
            setError(Date.now() + " getToDoList:" + error);
        }
    }

    // CHANGE STATE OF TODO-LIST MESSAGE
    const change = async (address, messageIndex) => {
        try {
            const contract = await getContract();
            const state = await contract.toggle(address, messageIndex);
            state.wait();
            window.location.reload();

        } catch (error) {
            setError("something went wrong in getting toggling message:" + error);
        }
    }

    const deleteMessage = async (address, messageIndex) => {
        try {
            const contract = await getContract();
            const state = await contract.deleteMessage(address, messageIndex);
            state.wait();
            window.location.reload();

        } catch (error) {
            setError("something went wrong in deleting the message:" + error);
        }
    }

    return (
        <ToDoListContext.Provider value={{
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
        }}>
            {children}
        </ToDoListContext.Provider>
    )
}
