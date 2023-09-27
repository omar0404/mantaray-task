export interface EventResponse {
  id: number;
  date: Date;
  title: string;
  img: string;
  latitude: number;
  longitude: number;
  street: string;
  capacity: number;
  users: number[];
  price: number;
}
export interface Event {
  id: number;
  date: Date;
  title: string;
  img: string;
  location: {
    latitude: number;
    longitude: number;
    street: string;
  };
  capacity: number;
  users: number[];

  price: number;
}
export interface UserResponse {
  id: number;
  email: string;
  password: string;
  events: EventResponse[];
}

export interface User {
  id: number;
  email: string;
  password: string;
}
