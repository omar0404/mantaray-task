import {Event, EventResponse} from '../types';
import {formatEventsResponse} from '../utils/events';
import axios from './axios';

const getEvents = async (): Promise<Event[]> => {
  const res = await axios.get<EventResponse[]>('events');

  return formatEventsResponse(res.data);
};

const getUserEvents = async (userId: number): Promise<Event[]> => {
  const events = await getEvents();
  return events.filter(evt => evt.users.includes(userId));
};

const updateEvent = async (id: number, updatedUsers: number[]) => {
  const res = await axios.put(`events/${id}`, {users: updatedUsers});
  return formatEventsResponse([res.data])[0];
};

export {getEvents, getUserEvents, updateEvent};
