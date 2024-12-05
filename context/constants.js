import ToDoList from "../artifacts/contracts/ToDoList.sol/ToDoListApp.json";
import contract_address from "@/contract_address.json"

// export const TODO_LIST_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
export const TODO_LIST_CONTRACT_ADDRESS = contract_address.address;
export const TODO_LIST_CONTRACT_ABI = ToDoList.abi;