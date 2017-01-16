pragma solidity ^0.4.4;

contract test {
  string private myVar;

  function write(string str) {
    myVar = str;
  }

  function read() constant returns (string) {
    return myVar;
  }

}
