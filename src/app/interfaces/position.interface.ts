import Marker from "./marker.interface";

export default interface FirestorePosition {
    color: string,
    icon: string,
    id: number,
    lat: number,
    lng: number,
    patent: string,
    capacity: number,
    loaded: number,
    phone: string,
    name: string,
    infoWindow?: string,
    marker?: Marker
  }