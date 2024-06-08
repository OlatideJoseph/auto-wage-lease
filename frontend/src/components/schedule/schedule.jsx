import * as React from 'react'
import axios from 'axios'
import './schedule.css'

const Schedule = ({ apiUrl, url }) => {
	const [banks, setBanks] = React.useState([])
  const [accountName, setAccountName] = React.useState('')
  const [bankCode, setBankCode] = React.useState('')
  const [accountNumber, setAccountNumber] = React.useState('')
  // const [users, setUsers] = React.useState([])

  React.useEffect(()=>{
    axios.get(`${apiUrl}bank?currency=NGN`)
    .then(resp => resp.data)
    .then(data => {setBanks(data.data)})
    /*sets the users*/
    // axios.get(`${url}user-list/`)
    // .then(resp => resp.data)
    // .then(data => {setUsers(data)})
  }, [])
  /*Account Number Effects*/
  React.useEffect(() => {
    if (accountNumber.length == 10 && bankCode){
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
  const handleSchedulePayment = () => {
    let token = localStorage.getItem('refresh-token')
    axios.post(`${url}/`, 
      document.querySelector('#form'),
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    .then(resp => resp.data)
    .then(data => {alert(`Schedule Created`)})
    .catch(error => {alert("Sorry an error occured")})
  }
  return (
    <>
      <h1>Auto Schedule</h1>
      <form id='form'>
        <input
          className='disabled-input'
          type='text'
          name='account_name'
          placeholder='account_name'
          value={accountName}
          contentEditable={false}
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
            name='account'
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
          <br/>
          {/*<label htmlFor='created_by'>
            Select Users
          </label>
          <br/>
          <select
            name='created_by'
            id='created_by'
          >
            {
              users.map(i => (
                <option key={i.pk} value={i.pk}>{i.username}</option>
              ))
            }
          </select>*/}
        </div>
        <button onClick={handleSchedulePayment} type='button'>
          Save Payment Schedule
        </button>
      </form>
    </>
  )
}

export default Schedule