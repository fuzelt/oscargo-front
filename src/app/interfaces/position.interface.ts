import Marker from "./marker.interface";

export default interface FirestorePosition {
  capacity: number,
    color: string,
    datetime?: string,
    destination: string,
    icon: string,
    id: number,
    lat: number,
    lng: number,
    loaded: number,
    name: string,
    patent: string,
    phone: string,
    return: string,
    infoWindow?: string,
    marker?: Marker
  }
 
