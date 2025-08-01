//DAY JS
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pl';

import { List, Checkbox, Typography, Space } from 'antd';

dayjs.extend(relativeTime); // Dodaje funkcję do obliczania czasu względnego, np. "2 dni temu"
dayjs.extend(isSameOrAfter); // Dodaje funkcję do porównywania dat, np. "czy data jest taka sama lub późniejsza"
dayjs.extend(localizedFormat); // Dodaje funkcje formatowania daty w lokalnym formacie
dayjs.locale('pl');

const { Title, Text } = Typography;

type Event = {
  id: number;
  name: string;
  date: string; 
};

const events: Event[] = [
  { id: 1, name: 'Spotkanie zespołu', date: '2025-07-20' },
  { id: 2, name: 'Demo klienta', date: '2025-07-23' },
  { id: 3, name: 'Webinar produktowy', date: '2025-07-10' },
  { id: 4, name: 'Wydanie nowej wersji', date: '2025-07-01' },
];

export default function EventList() {
  const [showRecentOnly, setShowRecentOnly] = useState(false);

  const filteredEvents = showRecentOnly
    ? events.filter(e =>
        dayjs(e.date).isSameOrAfter(dayjs().subtract(20, 'day'))
      )
    : events;

  const sorted = [...filteredEvents].sort((a, b) =>
    dayjs(b.date).diff(dayjs(a.date))
  );

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 16 }}>
      <Title level={3}>📅 Lista wydarzeń</Title>

      <Checkbox
        checked={showRecentOnly}
        onChange={e => setShowRecentOnly(e.target.checked)}
        style={{ marginBottom: 24 }}
      >
        Pokaż tylko z ostatnich 20 dni
      </Checkbox>

      <List
        bordered 
        dataSource={sorted}
        renderItem={event => (
          <List.Item style={{ borderRadius: 6 }}>
            <Space direction="vertical" size={2}>
              <Text strong>{event.name}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                📅 {dayjs(event.date).format('DD MMMM YYYY')} <br />
                🕒 {dayjs(event.date).fromNow()}
              </Text>
            </Space>
          </List.Item>
        )}
        locale={{ emptyText: 'Brak wydarzeń' }}
      />
    </div>
  );
}
