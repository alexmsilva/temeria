pragma solidity ^0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Temeria.sol";

contract TestTemeria {
    Temeria kingdom = new Temeria();

    function testInitialStatus() public {
        address expectedKing = this;
        Assert.equal(expectedKing, kingdom.king(), "The expected king adress doesn't match deployed owner");
        Assert.equal(0x0, kingdom.duke(), "Expected Duke to be 0x0");
        Assert.equal(0x0, kingdom.marquis(), "Expected Marquis to be 0x0");
        Assert.equal(0x0, kingdom.earl(), "Expected Earl to be 0x0");
        Assert.equal(0x0, kingdom.viscount(), "Expected Viscount to be 0x0");
        Assert.equal(0x0, kingdom.baron(), "Expected Baron to be 0x0");
    }
}
