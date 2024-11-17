// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "hardhat/console.sol";

contract ToDoListApp {
    // stores the addresses of users who creates todolist on this Dapp
    address[] public creators;

    struct ToDoUser {
        address account;
        uint256 userId;
        string[] messages;
        bool[] completed;
    }

    event ToDoEvent(address indexed account, string message, bool completed);
    event Toggled(address indexed account, string message, bool completed);

    mapping(address => ToDoUser) public toDoUsers;

    function createList(string calldata _message) public {
        ToDoUser storage toDo = toDoUsers[msg.sender];

        if (toDo.account == address(0)) {
            creators.push(msg.sender);
            toDo.account = msg.sender;
        }

        toDo.messages.push(_message);
        toDo.completed.push(false);

        emit ToDoEvent(msg.sender, _message, false);
    }

    function getCreatorData(
        address _address
    ) public view returns (address, uint256, string[] memory, bool[] memory) {
        ToDoUser memory singleUserData = toDoUsers[_address];

        return (
            singleUserData.account,
            singleUserData.userId,
            singleUserData.messages,
            singleUserData.completed
        );
    }

    function getAllUsers() public view returns (address[] memory) {
        return creators;
    }

    function toggle(address creator, uint256 messageIndex) public {
        if (creator != msg.sender) {
            revert("sender is not the owner of message");
        }

        ToDoUser storage singleUserData = toDoUsers[creator];

        if (messageIndex >= singleUserData.messages.length) {
            revert("message index out of bound");
        }

        bool state = singleUserData.completed[messageIndex];

        singleUserData.completed[messageIndex] = !state;

        emit Toggled(creator, singleUserData.messages[messageIndex], !state);
    }
}
