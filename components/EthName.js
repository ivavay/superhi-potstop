import { useState, useEffect } from "react"
import { web3 } from '../lib/web3';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import ENS,{getEnsAddress} from '@ensdomains/ensjs'

// check every address on ens to see if we have it or now 
const ens = new ENS({
  provider: web3.currentProvider, 
  ensAddress: getEnsAddress("1")
})

// if it is available, set n.name = name
// mine is not availble, so it dafults to the string of numbers 
const EnsName = function ({ address }) {
  const [name, setName] = useState()
  const [avatar, setAvatar] = useState()


  useEffect(async function (){
  const n = await ens.getName(address)
  if (n.name) {
    setName(n.name)
  }
 }, [address])

// check if there is an avatar 
  useEffect(async function(){
    if (name) {
      const a = await ens.name(name).getText("avatar")
      if(a) {
        setAvatar(a)
      }
    }
  }, [name])

  // format address into the first 8 digits 
  let formatAddress = address.substr(0, 8) + "..." + address.substr(-4)
  // jazzicon 

  let icon = (
    <Jazzicon diameter={32} seed = {jsNumberForAddress(address)} />
  )

// if you have a .eth name, display the account # underneath the .eth name on posts
// if not, leave it blank
//uses tertiary operator
  return (
    <div className="eth-name">
      <div className="icon">
        { avatar ? (<img />) : icon }
      </div>

      <div className="name">
        <span className="primary">
          {/* { formatAddress } */}
          { name ? name: formatAddress  } 
        </span>
        <span className="secondary">
          { name ? formatAddress : ""}
        </span>
      </div>
     
    </div>
  )
}

export default EnsName