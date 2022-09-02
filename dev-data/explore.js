/* 
This is the format for the "explore" page 
Each post has the following fields: 

Artist - Description - Status 

if Status is "OPEN" the post will also display OPEN
else the post will also display:  

Votes - Ranking (Ranking needs to be figured out)

Upon clicking on an OPEN post, the "video details" (from the Figma) page will open

*/

const posts = [
    {   
        postId: 0,
        artist: "@blondeDude",
        description: "super kick-ass guitar solo",
        status: "OPEN",
        votes: 7, 
        imageUrl:
    }, 
    {   
        postId: 1,
        artist: "@country_boys",
        description: "acoustic record",
        status: "CLOSED",
        votes: 30, 
        imageUrl:
    }, 
    {   
        postId: 2,
        artist: "@the_man",
        description: "country solo",
        status: "CLOSED",
        votes: 53, 
        imageUrl:
    }, 
    {   
        postId: 3,
        artist: "@just_friends",
        description: "outdoorsy jam",
        status: "OPEN",
        votes: 54, 
        imageUrl:
    }, 
    {   
        postId: 4,
        artist: "@almost_like_gilmour",
        description: "karaoke night",
        status: "CLOSED",
        votes: 21, 
        imageUrl:
    }, 
    {   
        postId: 5,
        artist: "@classic_guy",
        description: "ma latest song",
        status: "OPEN",
        votes: 17, 
        imageUrl:
    }, 
    {   
        postId: 6,
        artist: "@70's_craze",
        description: "just me screaming",
        status: "OPEN",
        votes: 22, 
        imageUrl:
    }, 
    {   
        postId: 7,
        artist: "@citar_god",
        description: "close your eyes",
        status: "CLOSED",
        votes: 26, 
        imageUrl:
    }, 

]