// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
pragma abicoder v2;

import "./Storage.sol";

contract BestXV2 is Storage {

    using SafeMathUpgradeable for uint;
    using CountersUpgradeable for CountersUpgradeable.Counter; 

    function initialize() public initializer {
        __ReentrancyGuard_init();
        __Pausable_init();
        __Ownable_init();
        platformPercentageFee = 10; 
        postingPrice = 100 wei; 
    }

    /**
     * @dev Checks the balance of the caller address
     */

    function getMyBalance () public view returns (uint) {
        return balances[msg.sender];
    }



    /**
     * @dev Checks the balance of the input address 
     * @notice Most likely not needed, unless we think of a specific use case for it
     */
    
    function artistBalance(address _artist) public view returns (uint) {
        return balances[_artist];
    }



    /** 
     * @dev Gets contract balance
     * 
     */

    function contractBalance () public view onlyOwner returns (uint) {
        return address(this).balance;
    }



    /**
     * @dev Updates platform's service fee
     */

    function updateFee(uint _newFee) public onlyOwner returns (uint) {
        platformPercentageFee = _newFee;
        return platformPercentageFee;
    }



    /**
     * @dev Calculates fee amount based on the platformPercentageFee (which is a percentage) and an amount  
     */

    function _calculateFeeAmount(uint _amount) internal view returns (uint) {
        uint _feeAmount = (_amount.div(100)).mul(platformPercentageFee);
        return _feeAmount;
    }


    /**
     * @dev Allows an address to deposit ETH into the wallet
     * @notice We're just using ETH for testing pursposes. This might change in the future. 
     */

    function deposit() public payable whenNotPaused returns (bool _success) {
        require(msg.value != 0, "Cannot have a zero deposit");
        balances[payable(msg.sender)] = balances[payable(msg.sender)].add(msg.value);
        emit depositSuccessful(payable(msg.sender), msg.value);
        _success = true;
    }



    /**
     * @dev Allows an address to deposit ETH into the wallet
     * @notice We're just using ETH for testing pursposes. This might change in the future. 
     */

    function donateTo(address payable _to) public payable whenNotPaused returns (bool _success) {
        require( balances[payable(msg.sender)] >= msg.value, "not enough balance");
        require(_to != address(0));
        balances[payable(msg.sender)] = balances[payable(msg.sender)].sub(msg.value); 
        balances[payable(_to)] = balances[payable(_to)].add(msg.value); 
        payable(_to).transfer(msg.value); 
        emit donationSuccessful(msg.sender, _to, msg.value);
        _success = true;
    }



    /**
     * @dev Allows an address to withdraw their funds
     * @notice Function should be safe, but thourough testing still needed
     * @dev This function allows the user to withdraw all funds 
     */

    function withdrawAll () public nonReentrant whenNotPaused returns (bool _success) {
        require (balances[payable(msg.sender)] > 0, "Insufficient funds");
        uint _grossBalance = balances[payable(msg.sender)];
        uint _fee = _calculateFeeAmount(_grossBalance);
        uint _amountToWithdraw = _grossBalance.sub(_fee);
        balances[payable(msg.sender)] = 0;
        (bool success, ) = payable(msg.sender).call{value:_amountToWithdraw}("");
        if (!success) revert();
        assert(balances[payable(msg.sender)] == 0);
        emit withdrawSuccessful(payable(msg.sender), _amountToWithdraw);
        _success = true;
    }



    /**
     * @dev Allows owner to withdraw funds from contract
     */

    function ownerWithdraw(uint _amount) public onlyOwner returns (bool _success) {
        require (_amount <= address(this).balance);
        (bool success, ) = payable(msg.sender).call{value:_amount}("");
        if (!success) revert();
        _success = true;
    }



    /** 
     * @dev Creates a Post 
     * @dev QUESTION: let's think about transfer of ownership here
     * as things stand the sender is the owner and that's what we want? Do we need it?
     * @dev QUESTION: Royalties for the future? 
     */

    function createPost (string memory _tokenUrl) public payable nonReentrant returns (bool _success) {

        uint itemId = _itemIds.current();

        Post memory post = Post({
            itemId: itemId,
            tokenUrl: _tokenUrl,
            votes: 0,
            artist: payable(msg.sender),
            status: Status.OPEN
        });

        require (balances[payable(msg.sender)] >= postingPrice, "need to make a deposit");
        balances[msg.sender] = balances[msg.sender].sub(postingPrice);

        posts.push(post);

        itemIdToPost[itemId] = post;

        _itemIds.increment();

        emit PostCreated(itemId, _tokenUrl, 0, payable(msg.sender), Status.OPEN);

        _success = true;

    }



    /** 
     * @dev Updates the posting price
     * 
     */

    function updatePostingPrice (uint _newPrice) public onlyOwner returns (uint) {
        postingPrice = _newPrice;
        return postingPrice;
    }



    /** 
     * @dev Fetches all posts 
     * 
     */

    function fetchPosts () public view returns (Post[] memory) {
        return posts;
    }



    /** 
     * @dev Gets posting price 
     * 
     */

    function getPostingPrice () public view returns (uint) {
        return postingPrice;
    }



    /** 
     * @dev Upvote for a post using its itemId
     * 
     */

    function upVote (uint itemId) public {
        // make sure the same address cannot vote more than once for the same video
        require (hasVoted[msg.sender][itemId] == false, "You have already voted for this video");
        itemIdToPost[itemId].votes = itemIdToPost[itemId].votes.add(1);
        posts[itemId] = itemIdToPost[itemId];
        hasVoted[msg.sender][itemId] = true;
    }



    /** 
     * @dev Closes a post based on its itemId
     * 
     */

    function closeSinglePost (uint itemId) public  onlyOwner {
        require (itemIdToPost[itemId].status == Status.OPEN, "can only close open posts");
        itemIdToPost[itemId].status = Status.CLOSED;
        posts[itemId] = itemIdToPost[itemId];
    }



    /** 
     * @dev Fetches posts based on their status
     * 
     */

    function fetchPostsByStatus (Status _status) public view returns (Post[] memory) {

        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (itemIdToPost[i].status == _status) {
                itemCount += 1;
            }
        }

        Post[] memory items = new Post[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (itemIdToPost[i].status == _status) {
                uint currentId = i;
                Post storage currentItem = itemIdToPost[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
    
        return items;

    }



    /** 
     * @dev Fetches posts for a specific user
     *  
     */

    function postsByUser () public view returns (Post[] memory) {

        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (itemIdToPost[i].artist == msg.sender) {
                itemCount += 1;
            }
        }

        Post[] memory items = new Post[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (itemIdToPost[i].artist == msg.sender) {
                uint currentId = i;
                Post storage currentItem = itemIdToPost[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
    
        return items;

    }



    /** 
     * @dev Internal function uses quicksort algo on array of posts 
     * 
     */

    function _quickSort(Post[] memory arr, uint left, uint right) internal {
        uint i = left;
        uint j = right;
        if(i==j) return;
        Post memory pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint(i)].votes > pivot.votes) i++;
            while (pivot.votes > arr[uint(j)].votes) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j) _quickSort(arr, left, j);
        if (i < right) _quickSort(arr, i, right);

    }


    
    /** 
     * @dev Sorts the posts based on votes 
     *
     */

    function _sortPosts () internal returns (Post[] memory) {

        Post[] memory _posts = fetchPosts();

        _quickSort(_posts, 0, _posts.length - 1);

        return _posts; 

    }



    /** 
     * @dev Gets top10 posts all time 
     * 
     */

    function top10Posts () public returns (Post[] memory) {
        Post[] memory sortedArr = _sortPosts(); 
        uint k = 10;

        if (sortedArr.length < 10) {
            k = sortedArr.length;
        } 

        Post[] memory result = new Post[](k);
        
        for (uint i = 0; i < k; i ++) {
            result[i] = sortedArr[i];
        }

        return result;
    }

    

    /** 
     * @dev Gets active posts in the top 50% bracket
     * 
     */

    function topHalfActivePosts () public returns (Post[] memory) {
        Post[] memory activePosts = fetchPostsByStatus(Status.OPEN);

        _quickSort(activePosts, 0, activePosts.length -1);

        Post[] memory result = new Post[](uint(activePosts.length /2));

        for (uint i = 0; i < result.length; i++) {
            result[i] = activePosts[i];
        }

        return result;
    }



    /** 
     * @dev Gets active the top 5 active posts
     * 
     */

    function top5ActivePosts () public returns (Post[] memory) {
        Post[] memory activePosts = fetchPostsByStatus(Status.OPEN);
        
        _quickSort(activePosts, 0, activePosts.length -1);

        uint k = 5;

        if (activePosts.length < k) {
            k = activePosts.length;
        } 

        Post[] memory result = new Post[](k);

        for (uint i = 0; i < result.length; i++) {
            result[i] = activePosts[i];
           
        }

        return result;

    }



    /** 
     * @dev Pay out prize to top 50% of active posts 
     * @notice this is NEW version, where the payout updates the artist's balance
     *
     * Below function will return the posting amount to top 5 players as well
     * Suggestion: It sould skip top 5 players and just pay 6th post to rest of the top 50%
     *
     * PUBLIC VISIBILITY NOW FOR TESTING - SHOULD BE INTENRAL
     */
    
    function _topHalfPayout () public onlyOwner {
        Post[] memory topHalf = topHalfActivePosts();
       
        for (uint i = 0; i < topHalf.length; i ++) {
            balances[topHalf[i].artist] = balances[topHalf[i].artist].add(postingPrice);
        }

        emit PayoutTopHalf(topHalf, postingPrice);
        
    }
    


    /** 
     * @dev Calculates the top5 Payouts 
     * 
     * PUBLIC VISIBILITY NOW FOR TESTING - SHOULD BE INTENRAL
     */

    function _calculateTop5Payout() public onlyOwner returns (bool _success) {
        Post[] memory activePosts = fetchPostsByStatus(Status.OPEN);
        Post[] memory topHalf = topHalfActivePosts();

        uint _difference = uint(activePosts.length).sub(uint(topHalf.length));
        jackpot = _difference.mul(postingPrice);

        firstPrize = jackpot.mul(50).div(100);
        secondPrize = jackpot.mul(30).div(100);
        thirdPrize = jackpot.mul(10).div(100);
        fourthPrize = jackpot.mul(6).div(100);
        fifthPrize = jackpot.mul(4).div(100);
        
        assert(firstPrize.add(secondPrize).add(thirdPrize).add(fourthPrize).add(fifthPrize) <= jackpot);

        _success = true;
    }



    /** 
     * @dev Pay out prize to top 5 active posts 
     * 
     * PUBLIC VISIBILITY NOW FOR TESTING - SHOULD BE INTENRAL
     */

    function _top5Payout() public onlyOwner returns (bool _success) {
        Post[] memory top5 = top5ActivePosts(); 
        
        // if the top 5 list has less than 5 players, the first place gets the whole jackpot
        // What should happen when there are multiple videos of single artist in top 5?
        if (top5.length < 5 ) {

            balances[top5[0].artist] = balances[top5[0].artist].add(jackpot);

            emit PayoutTop1(top5[0].artist);

        } else {
            balances[top5[0].artist] = balances[top5[0].artist].add(firstPrize);
            balances[top5[1].artist] = balances[top5[1].artist].add(secondPrize);
            balances[top5[2].artist] = balances[top5[2].artist].add(thirdPrize);
            balances[top5[3].artist] = balances[top5[3].artist].add(fourthPrize);
            balances[top5[4].artist] = balances[top5[4].artist].add(fifthPrize); 
        }

        emit PayoutTop5(top5);

        _success = true;

    }



    /** 
     * @dev Closes all ACTIVE posts 
     * @notice MUST be called after the Payout functions 
     *
     *
     * PUBLIC VISIBILITY NOW FOR TESTING - SHOULD BE INTENRAL
     */

    function _closeAllPosts () public onlyOwner returns (bool _success) {
        Post[] memory _posts = fetchPostsByStatus(Status.OPEN);

        for (uint i = 0; i < _posts.length; i ++ ) {
        //    itemIdToPost[i].status = Status.CLOSED;
            closeSinglePost(_posts[i].itemId);
        }
        _success = true;
    }



    /**
     * @dev REFRESHES THE GAME 
     * @dev CAN ONLY BE CALLED BY OWNER
     * @dev CALCULATES WINNERS - UPDATES BALANCES AND CLOSES ALL POSTS
     */
    
    function refresh() public onlyOwner returns (bool _success) {

        _topHalfPayout();
        _calculateTop5Payout();
        _top5Payout();
        _closeAllPosts();

        jackpot = 0;
        firstPrize = 0;
        secondPrize = 0;
        thirdPrize = 0;
        fourthPrize = 0;
        fifthPrize = 0;

        _success = true;

    }



    // /** 
    //  * @dev Removes the post with the specified id
    //  * 
    //  */

    // function deletePost(uint _itemId) public {
    //     Post memory removeMe;
    //     removeMe = posts[_itemId];
    //     posts[_itemId] = posts[posts.length -1 ];
    //     posts[posts.length -1 ] = removeMe;
    //     delete removeMe;
    //     itemIdToPost[_itemId] = posts[_itemId];
    //     itemIdToPost[_itemId].itemId = _itemId;
    //     posts[_itemId].itemId = _itemId;
    //     posts.pop();
    // }

}