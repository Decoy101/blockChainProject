const { deployProxy } = require("@openzeppelin/truffle-upgrades");

/** ========================= import images to test fecthPosts() ======================== */

// const AcousticSolo = require("../src/images/acoustic_solo.svg");
// const AlmostGilmour = require("../src/images/almost_gilmour.svg");
// const BlackWhite = require("../src/images/black&white.svg");
// const BlondeDude = require("../src/images/blondedude.svg");
// const JustDudes = require("../src/images/justdudes.svg");
// const RecordingSesh = require("../src/images/recording_sesh.svg");

/** ===================================================================================== */

const BestXV1 = artifacts.require("BestX");

module.exports = async function (deployer, network, accounts) {
  const bestxV1 = await deployProxy(BestXV1, { deployer });
  console.log("Deployed", bestxV1.address);

  /** =================================================================================== */
  /** ============= UNCOMMENT THIS TO RUN SCRIPTS ONLY, LEAVE OUT FOR TESTS ============= */

  // posting price gets updated to 1000 wei
  await bestxV1.updatePostingPrice(1000);

  // platform fee gests updated to 20%
  await bestxV1.updateFee(20);

  // accounts 0, 1, 2, 3, 4 deposit each 20000 wei
  await bestxV1.deposit({ value: 90000, from: accounts[0] });
  await bestxV1.deposit({ value: 90000, from: accounts[1] });
  await bestxV1.deposit({ value: 90000, from: accounts[2] });
  await bestxV1.deposit({ value: 90000, from: accounts[3] });
  await bestxV1.deposit({ value: 90000, from: accounts[4] });

  /** ========================= create posts to populate Explore page ======================== */
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[0],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[0],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[0],
    }
  );

  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[1],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[1],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[1],
    }
  );

  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[2],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[2],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[2],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[0],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[0],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[0],
    }
  );

  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[1],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[1],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[1],
    }
  );

  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[2],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[2],
    }
  );
  await bestxV1.createPost(
    "http://res.cloudinary.com/bestxdao/video/upload/v1658340175/BestXFile1658340170846.mp4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
    {
      from: accounts[2],
    }
  );
  /** ===================================================================================== */

  /** ========================= Populate posts with votes  ================================ */

  await bestxV1.upVote(8, { from: accounts[0] });
  await bestxV1.upVote(7, { from: accounts[0] });
  await bestxV1.upVote(2, { from: accounts[0] });
  await bestxV1.upVote(6, { from: accounts[0] });
  await bestxV1.upVote(4, { from: accounts[0] });
  await bestxV1.upVote(0, { from: accounts[0] });
  await bestxV1.upVote(1, { from: accounts[0] });

  await bestxV1.upVote(8, { from: accounts[1] });
  await bestxV1.upVote(7, { from: accounts[1] });
  await bestxV1.upVote(2, { from: accounts[1] });
  await bestxV1.upVote(6, { from: accounts[1] });
  await bestxV1.upVote(4, { from: accounts[1] });
  await bestxV1.upVote(0, { from: accounts[1] });
  await bestxV1.upVote(3, { from: accounts[1] });

  await bestxV1.upVote(8, { from: accounts[2] });
  await bestxV1.upVote(6, { from: accounts[2] });
  await bestxV1.upVote(2, { from: accounts[2] });
  await bestxV1.upVote(0, { from: accounts[2] });
  await bestxV1.upVote(1, { from: accounts[2] });

  await bestxV1.upVote(8, { from: accounts[3] });
  await bestxV1.upVote(4, { from: accounts[3] });
  await bestxV1.upVote(3, { from: accounts[3] });
  await bestxV1.upVote(2, { from: accounts[3] });
  await bestxV1.upVote(0, { from: accounts[3] });

  await bestxV1.upVote(8, { from: accounts[4] });
  await bestxV1.upVote(3, { from: accounts[4] });
  await bestxV1.upVote(2, { from: accounts[4] });
  await bestxV1.upVote(0, { from: accounts[4] });
  await bestxV1.upVote(1, { from: accounts[4] });
  await bestxV1.upVote(4, { from: accounts[4] });

  /** ===================================================================================== */

  /** ========================= Close a few posts ========================================= */

  await bestxV1.closeSinglePost(8);
  await bestxV1.closeSinglePost(7);
  await bestxV1.closeSinglePost(3);
  await bestxV1.closeSinglePost(1);
  await bestxV1.closeSinglePost(0);
  await bestxV1.closeSinglePost(6);
  await bestxV1.closeSinglePost(13);
  await bestxV1.closeSinglePost(14);
  await bestxV1.closeSinglePost(11);
  await bestxV1.closeSinglePost(10);

  /** ===================================================================================== */

  // const fetchPosts = await bestxV1.fetchPosts();
  // console.log("fetchPosts", fetchPosts);

  // they each create 3 posts ===> 15 posts in total
  // await bestxV1.createPost("www.post0url.com", "description", { from: accounts[0] });
  // await bestxV1.createPost("www.post1url.com", "description", { from: accounts[0] });
  // await bestxV1.createPost("www.post2url.com", "description", { from: accounts[0] });

  // await bestxV1.createPost("www.post3url.com", "description", { from: accounts[1] });
  // await bestxV1.createPost("www.post4url.com", "description", { from: accounts[1] });
  // await bestxV1.createPost("www.post5url.com", "description", { from: accounts[1] });

  // await bestxV1.createPost("www.post6url.com", "description", { from: accounts[2] });
  // await bestxV1.createPost("www.post7url.com", "description", { from: accounts[2] });
  // await bestxV1.createPost("www.post8url.com", "description", { from: accounts[2] });

  // await bestxV1.createPost("www.post9url.com", "description", { from: accounts[3] });
  // await bestxV1.createPost("www.post10url.com", "description", { from: accounts[3] });
  // await bestxV1.createPost("www.post11url.com", "description", { from: accounts[3] });

  // await bestxV1.createPost("www.post12url.com", "description", { from: accounts[4] });
  // await bestxV1.createPost("www.post13url.com", "description", { from: accounts[4] });
  // await bestxV1.createPost("www.post14url.com", "description", { from: accounts[4] });

  // // there will be some upvoting on the different posts
  // await bestxV1.upVote(11, { from: accounts[0] });
  // await bestxV1.upVote(7, { from: accounts[0] });
  // await bestxV1.upVote(2, { from: accounts[0] });
  // await bestxV1.upVote(14, { from: accounts[0] });
  // await bestxV1.upVote(4, { from: accounts[0] });
  // await bestxV1.upVote(0, { from: accounts[0] });
  // await bestxV1.upVote(9, { from: accounts[0] });

  // await bestxV1.upVote(11, { from: accounts[1] });
  // await bestxV1.upVote(7, { from: accounts[1] });
  // await bestxV1.upVote(2, { from: accounts[1] });
  // await bestxV1.upVote(14, { from: accounts[1] });
  // await bestxV1.upVote(4, { from: accounts[1] });
  // await bestxV1.upVote(0, { from: accounts[1] });
  // await bestxV1.upVote(9, { from: accounts[1] });

  // await bestxV1.upVote(9, { from: accounts[2] });
  // await bestxV1.upVote(6, { from: accounts[2] });
  // await bestxV1.upVote(2, { from: accounts[2] });
  // await bestxV1.upVote(12, { from: accounts[2] });
  // await bestxV1.upVote(1, { from: accounts[2] });

  // await bestxV1.upVote(9, { from: accounts[3] });
  // await bestxV1.upVote(4, { from: accounts[3] });
  // await bestxV1.upVote(3, { from: accounts[3] });
  // await bestxV1.upVote(11, { from: accounts[3] });
  // await bestxV1.upVote(13, { from: accounts[3] });

  // await bestxV1.upVote(9, { from: accounts[4] });
  // await bestxV1.upVote(11, { from: accounts[4] });
  // await bestxV1.upVote(2, { from: accounts[4] });
  // await bestxV1.upVote(0, { from: accounts[4] });
  // await bestxV1.upVote(1, { from: accounts[4] });
  // await bestxV1.upVote(13, { from: accounts[4] });

  // // owner will then call the refresh to end the contest
  // await bestxV1.refresh();

  // // check the balances for accounts 0, 1, 2, 3, 4
  // const balance0 = await bestxV1.getMyBalance({ from: accounts[0] });
  // console.log("balance0", balance0.toNumber());
  // const balance1 = await bestxV1.getMyBalance({ from: accounts[1] });
  // console.log("balance1", balance1.toNumber());
  // const balance2 = await bestxV1.getMyBalance({ from: accounts[2] });
  // console.log("balance2", balance2.toNumber());
  // const balance3 = await bestxV1.getMyBalance({ from: accounts[3] });
  // console.log("balance3", balance3.toNumber());
  // const balance4 = await bestxV1.getMyBalance({ from: accounts[4] });
  // console.log("balance4", balance4.toNumber());

  // // accounts 0, 1, 2, 3, 4 will each withdraw all their funds
  // await bestxV1.withdrawAll({ from: accounts[0] });
  // await bestxV1.withdrawAll({ from: accounts[1] });
  // await bestxV1.withdrawAll({ from: accounts[2] });
  // await bestxV1.withdrawAll({ from: accounts[3] });
  // await bestxV1.withdrawAll({ from: accounts[4] });

  // // check the platforms balance
  // const platformBalance = await bestxV1.contractBalance();
  // console.log("platformBalance", platformBalance.toNumber());

  /** =================================================================================== */
};
