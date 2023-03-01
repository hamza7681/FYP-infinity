// import React from 'react'
// import pic from '../../Assets/dp.jpg'
// import GlobalButton from '../../Reuseables/GlobalButton'
// import GlobalInput from '../../Reuseables/GlobalInput'

// const Profile = () => {
//     return (
//       <>
//           <div className='flex flex-row '>
//               <div className='w-[30%]'>
//               <div className=' w-full flex justify-center h-screen items-center relative'>
//             <div className='w-[80%] h-[90%] gap-2 flex flex-col relative items-center border-r-2'>
//            < h2 className='text-[24px] font-bold flex items-center mt-7'>Profile</h2>
//             <div className='flex justify-center flex-col gap-2 relative items-center'>
//                 <div className='flex justify-center'>
//                     <img src={pic} alt="Profile Pic" className="rounded-full w-1/5 mr-[10px]" />
//                 </div>
//                 <div className='justify-center'>
//                     <h3 className='text-[15px]'>User Name</h3>
//                     <h3 className='text-[15px]'>Student/Tutor</h3>
//                 </div>
//                 <div className='flex justify-center items-center flex-row w-full gap-2'>
//                     <GlobalButton
//                         styleClass="bg-blue-400 w-1/3 py-[7px] text-white rounded-[3px]"
//                         title='Edit'
//                     />
//                     <GlobalButton
//                         styleClass="bg-red-400 w-1/3 py-[7px] text-white rounded-[3px]"
//                         title='Delete'
//                     />
//                 </div>
//                 <div className='flex justify-center items-center flex-col'>
//                     <h3 className='text-[20px] font-bold mt-4'>Biography</h3>
//                     <p className='text-[18px] text-center mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,quat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,quat.Lorem ipsum dolor sit amet, 
//                     consectetur adipiscing elit,quat.</p>
//                 </div>
//                 </div>
//             </div>
//         </div>

//               </div>
//               <div className='w-[70%]'>
//               <div className='w-full h-full'>
//         <div className='flex w-full mt-12'>
//           <div className='w-[70%]'>
//             <h2 className='font-bold text[18px] mx-[15px] mt-2'>Basic Info</h2>
//           </div>
//           <div className='w-[30%] gap-3'>
//           <GlobalButton
//                   title="Save"
//                   styleClass="bg-green-500 text-white border-[2px] border py-[10px] px-[30px] font-semibold"
//                 />
//             {/* <GlobalButton styleClass="bg-blue-400 w-1/3 py-[7px] text-white rounded-[3px]" title="Save" /> */}
//             <GlobalButton
//                   title="Discard"
//                   styleClass="bg-red-500 text-white border-[2px]  py-[10px] px-[30px]  mx-2 font-semibold"
//                 />
//             {/* <GlobalButton styleClass="bg-blue-400 w-1/3 py-[7px] text-white rounded-[3px] mx-[10px]" title="Discard" /> */}
//           </div>
//         </div>
//         <h2 className='border-b-2 mt-1'></h2>
//         <div className='flex mt-5'>
//           <div className='w-[40%]'><label>First name</label>
//             <GlobalInput type="text" placeholder="Type your first name" name="firstname" className="no-rounded w-[30%]" />
//           </div>
//           <div className='mx-5 w-[50%]'><label>Last name</label>
//           <GlobalInput type="text" placeholder="Type your last name" name="firstname" className="no-rounded" />
//             </div>
//         </div>
//         <div className='w-[93%]'>
//           <label>Title</label>
//           <GlobalInput type="text" placeholder="student/tutor" name="firstname" className="no-rounded" />
//         </div>
//         <div className='w-[93%]'>
//           <label>Email</label>
//           <GlobalInput type="text" placeholder="Type your email" name="firstname" className="no-rounded" />
//         </div>
//         <div>
//         <h2 className='font-bold text[18px] mx-[15px] mt-5'>About me</h2>
//         <h2 className='border-b-2 mt-1'></h2>

//         </div>
//        {/* <div><label className='mt-3 w-[93%]' >Biography</label> */}
//         {/* <GlobalInput type="text" placeholder="student/tutor" name="firstname" className="rounded-[5px] h-6" /> */}

//         {/* </div> */}
//       </div>

//               </div>
//           </div>
//       </>
//     )
//   }
  
//   export default Profile