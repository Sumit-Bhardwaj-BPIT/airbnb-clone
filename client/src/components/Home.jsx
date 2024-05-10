// import React, { useState } from 'react'
// import { Link, NavLink } from 'react-router-dom';
// const Home = () => {
//   const [places,setPlaces]= useState([]);
//   useEffect(()=>{
//     axios.get('/home').then(res=>{
//       setPlaces(res.data);
//     })
//   })
//   return (
//     <div>
//         {places.length>0 && places.map()}
//     </div>
//   )
// }

// export default Home


import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Images from "../Images.jsx";
// import Image from "../Image.jsx";

export default function Home() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/home').then(response => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid  roun gap-x-6 gap-y-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id}>
          <div className="bg-gray-500  mb-2 rounded-2xl ">
            {place.addedPhotos?.[0] && (
              // <Image className="rounded-2xl object-cover aspect-square" src={place.addedPhotos?.[0]} alt=""/>
              <Images className="rounded-2xl object-cover aspect-square" src={place.addedPhotos?.[0]} />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}
