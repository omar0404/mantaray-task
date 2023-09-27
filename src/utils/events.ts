import {EventResponse} from '../types';

export const formatEventsResponse = (events: EventResponse[]) => {
  return events.map(({latitude, longitude, street, ...rest}) => ({
    ...rest,
    capacity: 3,
    location: {
      latitude,
      longitude,
      street,
    },
  }));
};
