pragma solidity ^0.4.23;

contract Temeria {
    address private owner;
    struct Title {
        address account;
        uint256 value;
    }
    Title[6] private titles;

    constructor() public payable {
        owner = msg.sender;
        titles[0] = Title({account: msg.sender, value: msg.value});
    }

    function shiftPositions(uint startPosition) private {
        for (uint position = startPosition; position > 0; position--) {
            titles[position] = titles[position-1];
        }
    }

    function checkPositionByAccount(address _account) private view returns (uint) {
        uint position;
        for (uint index = 0; index < titles.length; index++) {
            position = index;
            if (titles[index].account == _account) {
                break;
            }
        }

        return position;
    }

    function beTheKing() public payable {
        require(msg.value > titles[0].value, "Low amount to be King");

        uint position = checkPositionByAccount(msg.sender);
        shiftPositions(position);
        titles[0] = Title({account: msg.sender, value: msg.value});
    }

    function king() public view returns (address) {
        return titles[0].account;
    }

    function getKingValue() public view returns (uint256) {
        return titles[0].value;
    }

    function duke() public view returns (address) {
        return titles[1].account;
    }

    function marquis() public view returns(address) {
        return titles[2].account;
    }

    function earl() public view returns(address) {
        return titles[3].account;
    }

    function viscount() public view returns(address) {
        return titles[4].account;
    }

    function baron() public view returns(address) {
        return titles[5].account;
    }
}
