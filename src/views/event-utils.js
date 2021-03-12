let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    // id: createEventId(),
    id: 0,
    resourceId: 0,
    title: 'All-day event',
    start: todayStr,
    backgroundColor: 'red',
    borderColor: 'red'
  },
  {
    // id: createEventId(),
    id: 1,
    resourceId: 1,
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T15:00:00',
    backgroundColor: 'green',
    borderColor: 'green'
  }
]

export function createEventId() {
  return String(eventGuid++)
}