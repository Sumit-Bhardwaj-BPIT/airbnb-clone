import axios from 'axios';
import React, { useState } from 'react'
import Images from './Images.jsx';
const PhotosUploader = ({addedPhotos,setAddedPhotos}) => {


    const [photoLink,setPhotoLink]=useState('');


    async function addPhotobyLink(ev) {
      ev.preventDefault();
      const { data: filename } = await axios.post('http://localhost:4000/upload-by-link', { link: photoLink });
      setAddedPhotos((prev) => {
        // Ensure that prev is not undefined
        console.log(prev);
        console.log(addedPhotos);
        console.log(filename);

        if (prev) {
          return [...prev, filename];
        } else {
          return [filename];
        }
      });
      setPhotoLink('');
    }
    
    function uploadPhoto(ev) {
      const files = ev.target.files;
      const data = new FormData();
    
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const timestamp = Date.now();
        const newFileName = `photo${timestamp}.jpg`;
        data.append('photos', file, newFileName);
      }
    
      axios.post('http://localhost:4000/upload', data, {
  headers: { 'Content-type': 'multipart/form-data' }
}).then((res) => {
  const { data: filenames } = res;
  const formattedFilenames = filenames.map((filePath) => {
    // Replace backslashes with forward slashes
    return filePath.replace(/\\/g, '/');
  });
  setAddedPhotos((prev) => {
    return [...prev, ...formattedFilenames];
  });
});
    }

function removePhoto(filename) {
  setAddedPhotos((prev) => prev.filter((photo) => photo !== filename));
}


    
    


  return (
    <>
        <div className="mb-4">
                <label className="text-lg text-blue-600">Photos</label>
                <p className="text-blue-400 text-sm">Photos of your place</p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Add using Link ...."
                  />


                


{
  addedPhotos.length > 0 &&
  addedPhotos.map((link, index) => {
    var filename;
    if(link.includes('https')){
      filename=link;
      console.log(filename);
    }
    else if (typeof link === 'string') {
      filename = link.split('/').pop();
    }
    return (
      <div className="rounded-2xl relative" key={index}>
        <Images src={filename} alt="" />
        <button onClick={()=>removePhoto(filename)} className='absolute bottom-2 right-2 bg-black text-white bg-opacity-50 rounded-2xl cursor-pointer p-1' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>

        </button>
      </div>
    ); // Handle non-string values, or you can return something else
  })
}



                  <button onClick={addPhotobyLink} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                    Add Photos
                  </button>
                </div>
              </div>
          
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className=" cursor-pointer flex flex-col items-center border border-blue-300 p-4 rounded-lg text-blue-600 hover:bg-blue-200"   >
                <input type="file" accept=".jpg, .jpeg" onChange={uploadPhoto} className="hidden" />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                    />
                  </svg>
                  Upload from your device
                </label>
                {/* Add more buttons for image uploads here */}
              </div>
    
    
    
    </>
  )
}

export default PhotosUploader