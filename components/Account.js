import EthName from './EthName'

const Account = function ({accounts, connect, isLoggedIn}) {
  // TODO!!!
  // if already logged in, it should show 
  // the EthName component with the correct address
  // if not logged in, show a connect button
  // that when its clicked, will prompt us to login
  // and store the info on the page

// if account is logged in, whos account #; if not, show 'connect'
if (isLoggedIn) {
  return (
    <EthName address = {accounts[0]}  />
  )
} else {
  return(
  <button onClick={connect}>Connect</button>
    )
  }
}

export default Account;