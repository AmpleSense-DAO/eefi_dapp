import config from "../../config";

//images
import ProductImg1 from '../../images/products/product1.png'
import ProductImg2 from '../../images/products/product2.png'
import ProductImg3 from '../../images/products/product3.png'
import ProductImg4 from '../../images/products/product4.png'
import ProductImg5 from '../../images/products/product5.png'
import ProductImg6 from '../../images/products/product6.png'
import ProductImg7 from '../../images/products/product7.png'
import ProductImg8 from '../../images/products/product8.png'
import ProductImg9 from '../../images/products/product9.png'
import ProductImg10 from '../../images/products/product10.png'
import ProductImg11 from '../../images/products/product11.png'
import ProductImg12 from '../../images/products/product12.png'


// logos
import p1 from "../../images/tokens/ample.png";
import p2 from "../../images/tokens/eefi_token_logo.png";
import p3 from "../../images/tokens/kappa_logo_kmpl.png";
import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
import p6 from "../../images/tokens/zeus_cropped_edited_sm.png";


export default [
  {
    id: 1,
    img: p1,
    title: 'AMPLEFORTH',
    token_name: 'AMPL',
    apy: '60%',
    tvl: '$ 10,345,567',
    earn_token:'EEFI/ETH',
    rewards_token_1 : 'EEFI',
    rewards_token_2 : 'ETH',
    token_price: 142.38,

    wallet_balance_amount: '83,569',
    available_to_withdraw_amount: '5,169',
    rewards_token_amount_1 : '309.23',
    rewards_token_amount_2 : '9.23',
  },
  {
    id: 2,
    img: p2,
    title: 'EEFI/ETH LP TOKENS',
    token_name: 'EEFI/ETH LP Tokens',
    apy: '400%',
    tvl: '$ 2,545,566',
    earn_token:'EEFI/ETH',
    rewards_token_1 : 'EEFI',
    rewards_token_2 : 'ETH',
    token_price: 402.38,

     wallet_balance_amount: '3,569',
     available_to_withdraw_amount: '53,169',
     rewards_token_amount_1 : '39.23',
     rewards_token_amount_2 : '90.23',

  },
  {
    id: 3,
    img: p3,
    title: 'kMPL',
    token_name: 'kMPL',
    apy: '60%',
    tvl: '$ 1,145,567',
    earn_token:'Various Token Rewards',
    rewards_token_1 : 'Various Token Rewards',
    rewards_token_2 : '',
    token_price: 42.38,
    wallet_balance_amount: '83,569',
    available_to_withdraw_amount: '5,169',
    rewards_token_amount_1 : '309.23',
    rewards_token_amount_2 : '9.23',

  },
  {
    id: 4,
    img: p4,
    title: 'Pioneer NFTs',
    price: 30520,
    token_name: 'Pioneer NFTs',
    apy: 'N/A',
    tvl: 'N/A',
    earn_token:'ETH',
    rewards_token_1 : 'ETH',
    rewards_token_2 : '',
    token_price: 402.38,
    wallet_balance_amount: '23,569',
    available_to_withdraw_amount: '5,169',
    rewards_token_amount_1 : '3.23',
    rewards_token_amount_2 : '190.23',
  },
]
