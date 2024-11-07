const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("ToDoList", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ToDoList = await ethers.getContractFactory("ToDoList");
    const toDoList = await ToDoList.deploy();

    return { toDoList, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { toDoList, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await toDoList.ownerofContract()).to.equal(owner.address);
    });

  });

  describe("Create & Get Todo Message", function () {

    const message = 'Hello, World!';

    it("Should create and add the message in the list", async function () {
      const { toDoList } = await loadFixture(deployOneYearLockFixture);
      await expect(await toDoList.createList(message)).not.to.be.reverted;
      expect(await toDoList.getMessage()).to.deep.equal([message]);
    });
  });

});
