pragma solidity ^0.4.17;

//Contract file 

contract Inbox {
    string public msg;

    function Inbox(string iniMsg) public {
        msg = iniMsg;
    }

    function setMsg(string newMsg) public {
        msg = newMsg;
    }
}