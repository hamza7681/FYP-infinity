import React from 'react'
import pic from "../../Assets/iot 1.jpg"
import pic2 from "../../Assets/Graphics desi..jpeg"
import pic3 from "../../Assets/about.jpg"
const data = [
  {
    image: pic,
    text: 'The Internet of Things (IoT) refers to the interconnection of everyday objects, enabling them to send and receive data. This connectivity enables smart devices, sensors, and machines to communicate and collaborate seamlessly. IoT revolutionizes various industries, improving efficiency, automation, and decision-making. With IoT, devices can gather and analyze real-time data, optimizing processes, enhancing safety, and transforming how we interact with technology. From smart homes and cities to industrial applications and healthcare, IoT is shaping the future by creating a networked ecosystem of intelligent devices that simplify and enhance our lives.',
    heading: 'IOT',
  },
  {
    image: pic3,
    text: 'Web development encompasses designing, coding, and creating websites and web applications. It involves HTML, CSS, JavaScript, and various frameworks and technologies to build responsive and interactive online experiences. Developers utilize APIs, databases, and backend languages to handle data and provide functionality. The field continuously evolves, requiring developers to stay updated and proficient in new tools and techniques. Collaboration, problem-solving, and attention to detail are essential skills for successful web development projects.    ',
    heading: 'Web Development',

  },
  {
    id: 3,
    image: pic2,
    text: 'Graphics designing is a creative field that involves the creation and manipulation of visual elements to communicate messages. Designers use various tools and techniques to craft visually appealing and impactful designs for digital and print media. They combine color, typography, images, and layout to create visually stunning graphics that captivate audiences. Whether its designing logos, websites, or marketing materials, graphics designers play a crucial role in enhancing brand identity and conveying information effectively through visual storytelling.' ,
    heading: 'Graphics Designing',
  },
];


const Image = () => {
  return (
    <>
      {data.map((item, index) => (
        
        <div key={index} className="flex mx-10">

          {index % 2 === 0 ? (
            <>
              <div className='flex lg:flex-row flex-col w-full mt-5 gap-x-6'>
                <div className="w-1/2">
                  <img src={item.image} alt="Image" className='w-full' />
                </div>
                <div className="w-1/2">
                <h2 className='font-bold text-[17px] flex text-center justify-center mt-7 mb-7 '>{item.heading}</h2>
                  <p className='mt-4 flex justify-center'>{item.text}</p>
                  </div>
              </div>
            </>
          ) : (

            <>
              <div className='flex lg:flex-row flex-col w-full mt-5 gap-x-6'>
                <div className="w-1/2">
                <h2 className='font-bold text-[17px] flex text-center justify-center mt-7 mb-7 '>{item.heading}</h2>

                  {item.text}</div>
                <div className="w-1/2">
                  <img src={item.image} alt="Image" className='w-full' />
                </div>
              </div>
            </>
          )}
        </div>
      ))}

    </>
  )
}

export default Image;
