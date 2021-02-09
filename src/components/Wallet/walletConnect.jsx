import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import MewConnect from "@myetherwallet/mewconnect-web-client";
import Authereum from "authereum";
import { Button } from "reactstrap";


import s from "./walletConnect.module.scss"; // eslint-disable-line css-modules/no-unused-class


export const ProviderContext = React.createContext(null);

const providerOptions = {
    /*injected: {
        display: {
          logo: "data:image/gif;base64,INSERT_BASE64_STRING",
          name: "Injected",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },*/
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
        infuraId: "4372ea8a08ea4629bf10104f4c86a900" // required
        }
    },
    fortmatic: {
        package: Fortmatic, // required
        options: {
            key: "FORTMATIC_KEY" // required
        }
    },
    mewconnect: {
        package: MewConnect, // required
        options: {
          infuraId: "4372ea8a08ea4629bf10104f4c86a900" // required
        }
    },
    authereum: {
        package: Authereum // required
    }
  };
  
  const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    // cacheProvider: true, // optional
    providerOptions // required
  });



function connect(callBack) {
    web3Modal.connect().then(result => {
        callBack(result)
    })
}

export function WalletConnect({children}) {

  const [account, setAccount] = useState(false)
  const [provider, setProvider] = useState(false)

  if(provider) {
    let web3 = new Web3(provider)
    web3.eth.getAccounts().then(accounts => {
      setAccount(accounts[0].slice(0,8) + "...")
    })
  }

  return (<div>
    {!account?

      <Button id="button-connect" className={`btn btn-bordered ml-auto ${s.fullVersionBtn}`} onClick={() => {connect((p) => {setProvider(p)});}}>Connect Wallet</Button>
    :
    <Button id="button-connected" className={`btn btn-bordered ml-auto ${s.fullVersionBtn}`} onClick={() => {connect((p) => {setProvider(p)});}}>{account}</Button>
    }
    <ProviderContext.Provider value={provider}>
      {children}
    </ProviderContext.Provider>

    </div>);
  }