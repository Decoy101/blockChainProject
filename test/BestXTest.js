const { assert } = require("chai");

const BestX = artifacts.require("BestX");

contract("BestXGame", async (accounts) => {
  let bestX;

  beforeEach(async () => {
    bestX = await BestX.deployed();
  });

  it("Should correctly update the posting price", async () => {
    // check for onlyOwner requirement
    const postingPriceBefore = await bestX.getPostingPrice();
    await bestX.updatePostingPrice(1500);
    const postingPriceAfter = await bestX.getPostingPrice();
    assert(postingPriceBefore == 100);
    assert(postingPriceAfter == 1500);
  });

  it("Should correctly create a post", async () => {
    await bestX.deposit({ value: 10000 });
    await bestX.createPost("www.post0url.com", "description");
    await bestX.createPost("www.post1url.com", "description");

    const posts = await bestX.fetchPosts();
    assert(posts.length == 2);
  });

  it("Should correctly handle upvotes", async () => {
    // check for all the requirements to be met (cannot vote twice on the same post, etc...)
    await bestX.upVote(0);
    const posts = await bestX.fetchPosts();
    const post = posts[0];
    assert(post.votes == 1);
  });

  it("Should correctly fetch the right posts based on user", async () => {
    await bestX.deposit({ value: 10000, from: accounts[1] });
    await bestX.createPost("www.post2url.com", "description", { from: accounts[1] });

    const postsUser0 = await bestX.postsByUser({ from: accounts[0] });
    const postsUser1 = await bestX.postsByUser({ from: accounts[1] });

    assert(postsUser0.length == 2);
    assert(postsUser1.length == 1);
  });

  it("Should correctly close a single post", async () => {
    await bestX.closeSinglePost(2);
    const posts = await bestX.fetchPosts();
    assert(posts[2].status == 1);
  });

  it("Should correctly fetch the right posts based on status", async () => {
    const openPosts = await bestX.fetchPostsByStatus(0);
    const closedPosts = await bestX.fetchPostsByStatus(1);

    assert(openPosts.length == 2);
    assert(closedPosts.length == 1);
  });

  it("Should correctly sort the top 10 posts based on votes", async () => {
    await bestX.deposit({ value: 10000, from: accounts[2] });
    await bestX.createPost("www.post3url.com", "description", { from: accounts[2] });
    await bestX.createPost("www.post4url.com", "description", { from: accounts[2] });

    await bestX.upVote(1, { from: accounts[2] });
    await bestX.upVote(1, { from: accounts[0] });
    await bestX.upVote(3, { from: accounts[2] });
    await bestX.upVote(4, { from: accounts[1] });

    const top10 = await bestX.top10Posts.call();
    assert(top10[0].votes == 2);
  });

  it("Should correctly return the top HALF active posts", async () => {
    const topHalf = await bestX.topHalfActivePosts.call();
    assert(topHalf.length == 2);
    for (let i = 0; i < topHalf.length - 1; i++) {
      assert(topHalf[i].votes >= topHalf[i + 1].votes);
    }
  });

  it("Should correctly return the top FIVE active posts", async () => {
    await bestX.createPost("www.post5url.com", "description", { from: accounts[2] });
    await bestX.deposit({ value: 10000, from: accounts[3] });
    await bestX.createPost("www.post6url.com", "description", { from: accounts[3] });

    await bestX.upVote(6, { from: accounts[3] });
    await bestX.upVote(5, { from: accounts[3] });
    await bestX.upVote(6, { from: accounts[0] });
    await bestX.upVote(6, { from: accounts[1] });

    const top5 = await bestX.top5ActivePosts.call();
    assert(top5.length == 5);

    for (let i = 0; i < top5.length - 1; i++) {
      assert(top5[i].votes >= top5[i + 1].votes);
    }
  });

  it("Should correctly handle the TOP HALF payouts", async () => {
    const acc0BalanceBefore = await bestX.getMyBalance({ from: accounts[0] });
    const acc2BalanceBefore = await bestX.getMyBalance({ from: accounts[2] });
    const acc3BalanceBefore = await bestX.getMyBalance({ from: accounts[3] });

    await bestX._topHalfPayout();

    const acc0BalanceAfter = await bestX.getMyBalance({ from: accounts[0] });
    const acc2BalanceAfter = await bestX.getMyBalance({ from: accounts[2] });
    const acc3BalanceAfter = await bestX.getMyBalance({ from: accounts[3] });

    assert(acc0BalanceBefore == 7000 && acc0BalanceAfter == 8500);
    assert(acc2BalanceBefore == 5500 && acc2BalanceAfter == 7000);
    assert(acc3BalanceBefore == 8500 && acc3BalanceAfter == 10000);
  });

  it("Should correctly calculate the TOP 5 payouts", async () => {
    await bestX._calculateTop5Payout();

    const firstPrize = await bestX.firstPrize();
    const secondPrize = await bestX.secondPrize();
    const thirdPrize = await bestX.thirdPrize();
    const fourthPrize = await bestX.fourthPrize();
    const fifthPrize = await bestX.fifthPrize();

    const jackpot = await bestX.jackpot();

    assert(jackpot == 4500);
    assert(firstPrize == 2250);
    assert(secondPrize == 1350);
    assert(thirdPrize == 450);
    assert(fourthPrize == 270);
    assert(fifthPrize == 180);
  });

  it("Should correctly handle the TOP 5 payouts", async () => {
    const acc0BalanceBefore = await bestX.getMyBalance({ from: accounts[0] });
    const acc1BalanceBefore = await bestX.getMyBalance({ from: accounts[1] });
    const acc2BalanceBefore = await bestX.getMyBalance({ from: accounts[2] });
    const acc3BalanceBefore = await bestX.getMyBalance({ from: accounts[3] });

    await bestX._top5Payout();

    const acc0BalanceAfter = await bestX.getMyBalance({ from: accounts[0] });
    const acc1BalanceAfter = await bestX.getMyBalance({ from: accounts[1] });
    const acc2BalanceAfter = await bestX.getMyBalance({ from: accounts[2] });
    const acc3BalanceAfter = await bestX.getMyBalance({ from: accounts[3] });

    assert(acc0BalanceBefore == 8500 && acc0BalanceAfter == 10030);
    assert(acc1BalanceBefore == 8500 && acc1BalanceAfter == 8500);
    assert(acc2BalanceBefore == 7000 && acc2BalanceAfter == 7720);
    assert(acc3BalanceBefore == 10000 && acc3BalanceAfter == 12250);
  });

  it("Should correctly close all posts", async () => {
    await bestX._closeAllPosts();
    const openPosts = await bestX.fetchPostsByStatus(0);
    const closedPosts = await bestX.fetchPostsByStatus(1);

    assert(openPosts.length == 0);
    assert(closedPosts.length == 7);
  });

  //   it("Should correctly delete a post", async () => {
  //     const posts = await bestX.fetchPosts();
  //     await bestX.deletePost(4);
  //     const postsAfter = await bestX.fetchPosts();
  //     const postsByUser = await bestX.postsByUser({ from: accounts[2] });
  //     const item4 = await bestX.itemIdToPost(4);

  //     assert(posts.length == 7);
  //     assert(postsAfter.length == 6);
  //     assert(postsByUser.length == 2);
  //     assert(item4.postId == 6);
  //   });
});

contract("BestXWallet", async (accounts) => {
  let bestX;

  beforeEach(async () => {
    bestX = await BestX.deployed();
  });

  it("Should display the correct initial contract balance", async () => {
    const balance = await bestX.contractBalance();
    assert(balance == 0);
  });

  it("Should handle deposits correctly", async () => {
    const initialBalance = await bestX.getMyBalance({ from: accounts[0] });
    assert(initialBalance == 0);
    await bestX.deposit({ value: 10000 });
    const balance = await bestX.getMyBalance({ from: accounts[0] });
    assert(balance == 10000);
  });

  it("Should handle donations correctly", async () => {
    await bestX.donateTo(accounts[1], { from: accounts[0], value: 3000 });
    const balanceSender = await bestX.getMyBalance({ from: accounts[0] });
    const balanceReceiver = await bestX.getMyBalance({ from: accounts[1] });
    const contractBalance = await bestX.contractBalance();

    assert(balanceSender == 7000);
    assert(balanceReceiver == 3000);
    assert(
      contractBalance == balanceSender.toNumber() + balanceReceiver.toNumber()
    );
  });

  it("Should correctly update the platform's fee", async () => {
    const initialFee = await bestX.platformPercentageFee();
    await bestX.updateFee(20);
    const newFee = await bestX.platformPercentageFee();
    assert(newFee == 20 && newFee != initialFee);
  });

  it("Should correctly handle withdraws based on the current platform fee", async () => {
    const artistBalanceBefore = await bestX.getMyBalance({
      from: accounts[1],
    });
    await bestX.withdrawAll({ from: accounts[1] });
    const artistBalanceAfter = await bestX.getMyBalance({ from: accounts[1] });
    const contractBalance = await bestX.contractBalance();
  
    assert(artistBalanceBefore == 3000);
    assert(artistBalanceAfter == 0);
    assert(contractBalance == 7600);
  });
});
