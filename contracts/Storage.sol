// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

/** 
 * @title Storage
 * This is the storage contract
 */

contract Storage is Initializable, ReentrancyGuardUpgradeable, PausableUpgradeable, OwnableUpgradeable  {

    CountersUpgradeable.Counter public _itemIds;
    
    /* This value expresses a percentage service fee we'll take when user withdraws */
    /* It can be updated by owner only using the updateFee() method below */
    uint public platformPercentageFee;

    uint public postingPrice;
    uint public jackpot;

    uint public firstPrize;
    uint public secondPrize;
    uint public thirdPrize;
    uint public fourthPrize;
    uint public fifthPrize;

    enum Status {
        OPEN, 
        CLOSED
    }

    struct Post {
        uint itemId;
        string tokenUrl;
        uint votes;
        address payable artist;
        Status status;
        string description;
    }

    Post[] public posts;

    mapping (address => uint) public balances;
    mapping (address => Post[]) public usersPosts; // maybe we can get rid of this
    mapping (uint => Post) public itemIdToPost; // change back to internal after test
    mapping (address => mapping (uint => bool)) public hasVoted;

    mapping (string => uint) _uintStorage;
    mapping (string => address) _addressStorage;
    mapping (string => bool) _boolStorage;
    mapping (string => string) _stringStorage;
    mapping (string => bytes4) _bytes4Storage;

    event PostCreated (
        uint itemId,
        string tokenUrl,
        uint votes,
        address artist,
        Status status
    );

    event PayoutTopHalf (
        Post[] artists,
        uint amount
    );

    event PayoutTop5 (
        Post[] artists
    );

    event PayoutTop1 (
        address artist
    );

    event depositSuccessful (
        address artist,
        uint amount
    );

    event withdrawSuccessful (
        address artist,
        uint amount
    );

    event compSuccessful (
        address artist,
        uint amount
    );

    event donationSuccessful (
        address sender,
        address receiver,
        uint amount
    );

}