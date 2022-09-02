### Welcome to BestX

- Install dependencies with `npm install`

- Add Ganache Network to your Metamask

![ganache network add](https://user-images.githubusercontent.com/77351244/188028219-65d48021-9866-44fe-a32b-77434711c5a3.png)

- Open Ganache GUI and import an account in your metamask wallet.

- At root level run `truffle migrate --reset --network development` (if the compilation fails, eliminate the `build` folder at root and try again. 

- After the contracts have been deployed you'll see a message like this in the console: `Deployed 0x764668dbCd8cea557c3ac3b91f07cd39D4dCDb1A`

- Copy the address and update the `config-keys.js` file: 

```javascript
export const bestxAddress = <YOUR ADDRESS>;
export const ownerAddress = "";
```

- Run `npm start` 

- The app will display at `http://localhost:3000/`

The Explore page is seeded with some content, it's actually my cousin playing guitar :-) 

Connect your wallet and browse through the app !!  
