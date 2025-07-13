// Zbudowanie widoku kalendarza z wykorzystaniem dayjs
// Cel: Wizualizacja harmonogramu spotkań lub transakcji
//  Technologie: dayjs, Antd DatePicker, React
//  Zakres:
// Formatowanie i porównywanie dat
// Obsługa kalendarza i range-picker
// Wyświetlenie wydarzeń w wybranym dniu

import { useState } from 'react';
import { DatePicker, Card, List, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

const { Title } = Typography;
const { RangePicker } = DatePicker;

type Event = {
  id: string;
  title: string;
  date: string; 
};

const mockEvents: Event[] = [
  { id: '1', title: 'Spotkanie z klientem', date: '2025-06-25' },
  { id: '2', title: 'Demo produktu', date: '2025-06-26' },
  { id: '3', title: 'Call z zespołem', date: '2025-06-27' },
  { id: '4', title: 'Szkolenie zespołu', date: '2025-06-28' },
];

export default function CalendarView() {
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null); 

  const filteredEvents = mockEvents.filter(event => { 
    if (!range) return false;
    const eventDate = dayjs(event.date);
    return eventDate.isSameOrAfter(range[0], 'day') &&
           eventDate.isSameOrBefore(range[1], 'day');
  });

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <Title level={3}>Wybierz zakres dat</Title>
      <RangePicker
        onChange={(dates) => setRange(dates as [Dayjs, Dayjs])}
        style={{ marginBottom: 24 }}
      />

      {range && (
        <>
          <Title level={4}>
            Wydarzenia od {range[0].format('YYYY-MM-DD')} do {range[1].format('YYYY-MM-DD')}
          </Title>

          {filteredEvents.length > 0 ? (
            <List
              dataSource={filteredEvents}
              renderItem={item => <List.Item key={item.id}>{item.title}</List.Item>}
            />
          ) : (
            <p>Brak wydarzeń w tym zakresie.</p>
          )}
        </>
      )}
    </Card>
  );
}
