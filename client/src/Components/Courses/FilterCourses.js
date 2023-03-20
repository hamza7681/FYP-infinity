// // import React, { useEffect, useState } from "react";
// // import pic from "../../Assets/user-logo.jpg";


// // const [itemOffset, setItemOffset] = useState(0);
// // const itemsPerPage = 6;
// // const endOffset = itemOffset + itemsPerPage;
// // const currentItems = tutors?.slice(itemOffset, endOffset);
// // const pageCount = Math.ceil(tutors?.length / itemsPerPage);


// // const FilterCourses = () => {
// //   return (
// //     <>
// //       <div className='h-full w-auto bg-red-300'>
// //       {currentItems &&
// //               currentItems.map((val) => {
// //                 return (
// //                   <>
// //                     <div
// //                       className="w-full md:w-[280px] border-[1px] rounded-[5px] border-gray-200 shadow-xl"
// //                       key={val._id}
// //                     >
// //                       <img src={pic} alt="tutor pic" className="w-full" />
// //                       <div className="px-[15px] py-[10px]">
// //                         <h1 className="text-[22px] font-semibold">
// //                           {val.firstName} {val.lastName}
// //                         </h1>
// //                         <p className="text-[16px] text-gray-500">
// //                           {val.subject}
// //                         </p>
// //                       </div>
// //                       <div className="flex flex-row justify-start w-full items-center">
// //                         <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-r-[1px] border-t-gray-300 border-r-gray-300">
// //                           {/* <AiOutlineEye /> */}
// //                           <span>View</span>
// //                         </div>
// //                         <div
// //                           className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-l-[1px] border-t-gray-300 border-l-gray-300"
// //                           onClick={() => addFollowing(val._id)}
// //                         >
// //                           {/* <FollowToggle val={val} /> */}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </>
// //                 );
// //               })}

// //       </div>
// //     </>
// //   )
// // }

// // export default Courses;




// import React, { useEffect, useState } from "react";
// import pic from "../../Assets/user-logo.jpg";

// const Courses = () => {
//   const [itemOffset, setItemOffset] = useState(0);
//   const itemsPerPage = 6;
//   const endOffset = itemOffset + itemsPerPage;
//   // const currentItems = tutors?.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(courses?.length / itemsPerPage);

//   return (
//     <>
//       <div className='h-full w-auto bg-red-300'>
//       {currentItems &&
//               currentItems.map((val) => {
//                 return (
//                   <>
//                     <div
//                       className="w-full md:w-[280px] border-[1px] rounded-[5px] border-gray-200 shadow-xl"
//                       key={val._id}
//                     >
//                       <img src={pic} alt="tutor pic" className="w-full" />
//                       <div className="px-[15px] py-[10px]">
//                         <h1 className="text-[22px] font-semibold">
//                           {val.firstName} {val.lastName}
//                         </h1>
//                         <p className="text-[16px] text-gray-500">
//                           {val.subject}
//                         </p>
//                       </div>
//                       <div className="flex flex-row justify-start w-full items-center">
//                         <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-r-[1px] border-t-gray-300 border-r-gray-300">
//                           {/* <AiOutlineEye /> */}
//                           <span>View</span>
//                         </div>
//                         <div
//                           className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-l-[1px] border-t-gray-300 border-l-gray-300"
//                           onClick={() => addFollowing(val._id)}
//                         >
//                           {/* <FollowToggle val={val} /> */}
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 );
//               })}

//       </div>
//     </>
//   )
// }

// export default FilterCourses;

