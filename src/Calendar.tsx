//MOMENT
import { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Typography } from 'antd';

moment.locale('pl'); // Ustawienie języka

const { Title, Text } = Typography;

const daysShort = moment.weekdaysShort(); // ["ndz", "pon", ...]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());

  // Zmiana miesiąca
  const prevMonth = () => setCurrentDate(prev => moment(prev).subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(prev => moment(prev).add(1, 'month'));

  // Początek i koniec siatki kalendarza
  const startOfMonth = moment(currentDate).startOf('month');
  const endOfMonth = moment(currentDate).endOf('month');
  const startDate = moment(startOfMonth).startOf('week'); // pierwszy dzień siatki (niedziela)
  const endDate = moment(endOfMonth).endOf('week'); // ostatni dzień siatki (sobota)

  const day = moment(startDate);
  const calendar: moment.Moment[][] = [];

  while (day.isBefore(endDate, 'day')) { // iterujemy przez dni
    const week: moment.Moment[] = []; // tydzień jako tablica momentów
    for (let i = 0; i < 7; i++) { // 7 dni w tygodniu
      week.push(moment(day)); // dodajemy dzień do tygodnia
      day.add(1, 'day'); // przechodzimy do następnego dnia
    }
    calendar.push(week);// dodajemy tydzień do kalendarza
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        {currentDate.format('MMMM YYYY')}
      </Title>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Button onClick={prevMonth}>← Poprzedni</Button>
        </Col>
        <Col>
          <Button onClick={nextMonth}>Następny →</Button>
        </Col>
      </Row>

      {/* Nagłówki dni tygodnia */}
      <Row gutter={[8, 8]} style={{ fontWeight: 'bold' }}>
        {daysShort.map(day => (
          <Col key={day} span={3} style={{ textAlign: 'center' }}>
            <Text>{day}</Text>
          </Col>
        ))}
      </Row>

      {/* Dni kalendarza */}
      {calendar.map((week, i) => (
        <Row gutter={[8, 8]} key={i} justify="start"> 
          {week.map(date => {
            const isToday = moment().isSame(date, 'day');
            const isCurrentMonth = date.month() === currentDate.month();

            return (
              <Col
                key={date.format('YYYY-MM-DD')}
                span={3}
                style={{
                  padding: 10,
                  background: isToday ? '#bae7ff' : isCurrentMonth ? '#e6f7ff' : '#f5f5f5',
                  borderRadius: 4,
                  border: '1px solid #d9d9d9',
                  color: isCurrentMonth ? 'black' : '#bfbfbf', 
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                <Text strong={isToday}>{date.date()}</Text>
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
}
