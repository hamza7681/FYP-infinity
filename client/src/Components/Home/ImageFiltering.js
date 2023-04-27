import React, {useState} from 'react'
import web from '../../Assets/I.png';
import graphics from '../../Assets/pic3.png';
import cloudComputing from '../../Assets/course.jpg';
import digitalMarketing from '../../Assets/pic1.jpg';
import seo from '../../Assets/pic2.jpg';
const ImageFiltering = () => {
    const [filter, setFilter] = useState('all');
    const images = [
    {
      id: 1,
      category: 'Computer',
      src: web,
    },
    {
      id: 2,
      category: 'Computer',
      src: graphics,
    },
    {
      id: 3,
      category: 'Computer',
      src: cloudComputing,
    },
    {
      id: 4,
      category:'Science',
      src:  digitalMarketing,
    },
    {
        id: 5,
        category:'Biology',
        src:  seo,
    },
    {
        id: 6,
        category: 'History',
        src: graphics,
    },
  ];
  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);
  return (
    <>
    <div className="flex flex-wrap justify-center">
      <div className="w-full mb-8 mt-8">
        <div className="flex justify-center">
          <button className="mr-4 border-2 w-[100px] p-[5px] bg-green font-bold text-black border-green rounded-md hover:bg-white
           hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('all')}> All</button>
          <button className="mr-4 border-2 w-[100px] bg-green font-bold text-black border-green rounded-md hover:bg-white 
          hover:text-green hover:drop-shadow-xl " onClick={() => setFilter('Computer')}>Computer</button>
          <button className="mr-4 border-2 w-[100px] bg-green font-bold text-black border-green rounded-md hover:bg-white
           hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('Science')}>Science</button>
          <button className="mr-4 border-2 w-[100px] bg-green font-bold text-black border-green rounded-md hover:bg-white 
          hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('Biology')}>Biology</button>
          <button className="mr-4 border-2 w-[100px] bg-green font-bold text-black border-green rounded-md hover:bg-white
           hover:text-green hover:drop-shadow-xl" onClick={() => setFilter('History')}>History</button>        
        </div>
      </div>
      {filteredImages.map(img => (
        <div key={img.id} className="w-1/4 mx-20 h-1/4 gap-y-1 bg-pink-400">
          <img src={img.src} alt={img.category} className="w-1/2 h-1/2 gap-y-1 bg-yellow-300" />
        </div>
      ))}
    </div>
    </>
    
  )
}
export default ImageFiltering;