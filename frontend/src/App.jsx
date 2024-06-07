import * as React from 'react'
import axios from 'axios'
import './App.css'

/* url to make request to */
const apiUrl = 'https://api.paystack.co/'
const url = 'http://localhost:8000/'
function App() {
  const [banks, setBanks] = React.useState([])
  const [accountName, setAccountName] = React.useState('')
  const [bankCode, setBankCode] = React.useState('')
  const [accountNumber, setAccountNumber] = React.useState('')
  
  React.useEffect(()=>{
    axios.get(`${apiUrl}bank?currency=NGN`)
    .then(resp => resp.data)
    .then(data => {setBanks(data.data)})
  }, [])
  /*Account Number Effects*/
  React.useEffect(() => {
    if (accountNumber.length == 10){
      axios.get(`${url}bank-resolve/?account_number=${accountNumber}&bank_code=${bankCode}`)
      .then(resp => resp.data)
      .then(data => {
        console.log(data)
        if (data.status){
          setAccountName(data.data.account_name)
        }else{
          setAccountName('Name Not Found')
        }
      })
    }
  }, [accountNumber, bankCode])
  const handleAccountNumber = (event) => {
    const accn = event.target.value
    if (accn.length == 10){
      setAccountNumber(accn)
    }
  }
  return (
    <>
      <h1>Auto Schedule</h1>
      <form>
        <input
          className='disabled-input'
          type='text'
          name='account_name'
          placeholder='account_name'
          value={accountName}
          disabled
        /> 
        <div>
          <label htmlFor='bank'>
            Select Bank
          </label>
          <br/>
          <select
            onChange={(event) => {setBankCode(event.target.value)}}
            name='bank_code'
            id='bank'
          >
            {
              banks.map(i => i.is_deleted ? null: (
                <option key={i.id} value={i.code}>{i.name}</option>
              ))
            }
          </select>
          <br/>
          <label htmlFor='accn'>
            Account Number
          </label>
          <br/>
          <input
            id='accn'
            name='account_number'
            placeholder='account_number'
            onChange={handleAccountNumber}
            type='text'
          />
          <br/>
          <label htmlFor='date'>Schedule Date & Time</label>
          <br/>
          <input
            placeholder='Date and Time'
            id='date' name='pay_date'
            type='datetime-local'
          />
          <br/>
          <label>Amount</label>
          <br/>
          <input
            placeholder='amount'
            id='amount'
            name='amount'
            type='text'
          />
        </div>
        <button type='button'>
          Save Payment Schedule
        </button>
      </form>
    </>
  )
}

export default App
