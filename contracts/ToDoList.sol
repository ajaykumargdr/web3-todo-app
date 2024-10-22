// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract ToDoList {
    // used to create the user id
    uint256 public _idUser;

    // stores the owner who deploys the contract
    address public ownerofContract;

    // stores the addresses of users who creates todolist on this Dapp
    address[] public creators;

    // all the messages are stores ?
    string[] public messages;

    // stores all message ids
    uint256[] public messageId;

    //
    struct ToDoListApp {
        address account;
        uint256 userId;
        string message;
        bool completed;
    }

    event ToDoEvent(
        address indexed account,
        uint256 indexed userId,
        string message,
        bool completed
    );

    mapping(address => ToDoListApp) public toDoListApps;

    constructor() {
        ownerofContract = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;

        ToDoListApp storage toDo = toDoListApps[msg.sender];

        toDo.account = msg.sender;
        toDo.message = _message;
        toDo.completed = false;
        toDo.userId = idNumber;

        creators.push(msg.sender);
        messages.push(_message);
        messageId.push(idNumber);

        emit ToDoEvent(msg.sender, toDo.userId, _message, false);
    }

    function getCreatorData(
        address _address
    ) public view returns (address, uint256, string memory, bool) {
        ToDoListApp memory singleUserData = toDoListApps[_address];

        return (
            singleUserData.account,
            singleUserData.userId,
            singleUserData.message,
            singleUserData.completed
        );
    }

    function getAddress() external view returns(address[] memory){
        return creators;
    }

    function getMessage() external view returns(string[] memory){
        return messages;
    }

    function toggle(address _creator) public{
        ToDoListApp storage singleUserData = toDoListApps[_creator];
        singleUserData.completed = !singleUserData.completed;
    }
}
