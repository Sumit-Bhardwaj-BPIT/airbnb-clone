import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceGallery from '../PlaceGallery';
import BookingWidget from '../BookingWidget';
const PlacePage = () => {
    const {id}=useParams();
    const [place,setPlace] = useState(null);
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`http://localhost:4000/places/${id}`).then((res)=>{
            setPlace(res.data);
        })

    },[id]);

    if(!place) return '';

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      {/* <AddressLink>{place.address}</AddressLink> */}
      <a  target='_blank' href={'https://maps.google.com/?q='+place.address}  className=' font-500 my-2 block font-semibold underline'  >{place.address}</a>
      {/* <h2>{place.address}</h2> */}
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkin}<br />
          Check-out: {place.checkout}<br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>

      

      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  )
}

export default PlacePage