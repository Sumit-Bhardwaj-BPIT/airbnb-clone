import Images from "./Images.jsx";

export default function PlaceImg({place,index=0,className=null}) {
  if (!place.addedPhotos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <Images className={className} src={place.addedPhotos[index]} alt=""/>
  );
}