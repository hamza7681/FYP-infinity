import React from 'react'
import GlobalButton from '../../Reuseables/GlobalButton';
import GlobalInput from '../../Reuseables/GlobalInput';
const Payment = () => {
  return (
    <>
      <div className='w-full flex justify-center h-screen items-center relative bg-gray-300'>
        <div className='w-[80%] gap-2 flex flex-col relative'>
          <div className='flex justify-center'>
            <h2 className='text-[22px] '>Payment Details</h2>
          </div>
          <div className='flex flex-col'>
            <h3 className='text-[18px]'>Select Card Type</h3>
            <div className='gap-2'>
              <input 
              type="radio"
              name="Card-type"
              value="visa"
              placeholder="VISA"
              />
            <label>VISA</label><br/>
            <input 
            type="radio"
            name="Card-type"
            value="versa"
            placeholder="VERSA"
            />
            <label>Versa</label>
            </div><br/>
            <div className='flex flex-col'>
              <label>Name on Card</label>
              <GlobalInput
                type="text"
                placeholder="Santhosh Sivan"
              /><br/>
            </div>
            <div className='flex flex-col'>
              <label>Card Number</label>
              <GlobalInput
                type="number"
                placeholder='xxxx-xxxx-xxxx'
              />
            </div><br/>
            <div className='flex flex-col'>
              <label>Expiry Date</label>
              <GlobalInput
                type="date"
              />
            </div><br/>
            <div className='bg-red-400 gap-3'>
              <GlobalButton
                click='Checkout'
                title='Checkout'
                styleClass='bg-[#f5822a] w-full py-[7px] text-white rounded-[3px]'
              />
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Payment;