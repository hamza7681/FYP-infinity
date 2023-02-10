import React from 'react'

const PaymentInput = ({type, placeholder, name,change}) => {
  return (
    <>
        <input
            className='w-full border p-[6px] rounded-md'
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={change}
        />
    </>
  )
}

export default PaymentInput;