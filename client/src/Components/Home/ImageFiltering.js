import React, { useState } from 'react';
import web from '../../Assets/web 1.jpg';
// import web1 from '../../Assets/web.jpg';
import python from '../../Assets/python1.png';
import flutter from '../../Assets/Flutter dev..jpeg';
// import game from '../../Assets/game dev1.webp';
import game1 from '../../Assets/Game dev.jpg';
import graphics from '../../Assets/Graphics desi..jpeg';
import graphics1 from '../../Assets/ui ux-1.webp';
import iot1 from '../../Assets/iot.jpg';
import iot from '../../Assets/iot 1.jpg';
import sqa from '../../Assets/SQA.jpeg'
const ImageFiltering = () => {
  const [filter, setFilter] = useState('all');
  const images = [
    {
      id: 1,
      category: 'Development',
      src: web,
    },
    // {
    //   id: 2,
    //   category: 'Development',
    //   src: web1,
    // },
    {
      id: 3,
      category: 'Development',
      src: python,
    },
    {
      id: 4,
      category: 'Development',
      src: flutter,
    },
    {
      id: 5,
      category: 'Development',
      src: game1,
    },
    // {
    //   id: 6,
    //   category: 'Development',
    //   src: game,
    // },
    {
      id: 7,
      category: 'Designing',
      src: graphics,
    }, {
      id: 8,
      category: 'Designing',
      src: graphics1,
    }, {
      id: 9,
      category: 'IOT',
      src: iot,
    }, {
      id: 10,
      category: 'IOT',
      src: iot1,
    },
    {
      id: 11,
      category: 'SQA',
      src: sqa,
    },
  ];
  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full mb-8 mt-8">
          <div className="flex justify-center">
            <button className="mr-4 border-2 w-[100px] p-[5px] text-black border-green rounded-md hover:bg-white
           hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('all')}> All</button>
            <button className="mr-4 border-2 w-auto bg-green  text-black border-green rounded-md hover:bg-white 
          hover:text-green hover:drop-shadow-xl " onClick={() => setFilter('Development')}>Development</button>
            <button className="mr-4 border-2 w-[100px] text-black border-green rounded-md hover:bg-white
           hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('Designing')}>Designing</button>
            <button className="mr-4 border-2 w-[100px] text-black border-green rounded-md hover:bg-white 
          hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('IOT')}>IOT</button>
            <button className="mr-4 border-2 w-[100px]  text-black border-green rounded-md hover:bg-white
           hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('SQA')}>SQA</button>
          </div>
        </div>
        {filteredImages.map(img => (
          <div key={img.id} className="w-1/2 mx-5 h-1/4 gap-y-1 bg-pink-400">
            <img src={img.src} alt={img.category} className="w-1/2 h-1/2 gap-y-1 bg-yellow-300" />
          </div>
        ))}
      </div>
    </>

  )
}
export default ImageFiltering;