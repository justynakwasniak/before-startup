//MOMENT
import { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Typography } from 'antd';
import { useDarkMode } from './context/useDarkMode'; 


moment.locale('pl'); 

const { Title, Text } = Typography;

const daysShort = moment.weekdaysShort(); 

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());
  const { darkMode } = useDarkMode(); 

  const prevMonth = () => setCurrentDate(prev => moment(prev).subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(prev => moment(prev).add(1, 'month'));

  const startOfMonth = moment(currentDate).startOf('month');
  const endOfMonth = moment(currentDate).endOf('month');
  const startDate = moment(startOfMonth).startOf('week'); 
  const endDate = moment(endOfMonth).endOf('week');

  const day = moment(startDate);
  const calendar: moment.Moment[][] = []; 

  while (day.isBefore(endDate, 'day')) { 
    const week: moment.Moment[] = []; 
    for (let i = 0; i < 7; i++) { 
      week.push(moment(day)); 
      day.add(1, 'day');
    }
    calendar.push(week);
  }
return (
  <div
    style={{
      maxWidth: 500,
      margin: '40px auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Title level={3} style={{ marginBottom: 24 }}>
      {currentDate.format('MMMM YYYY')}
    </Title>

    <Row justify="center" style={{ marginBottom: 16, width: '100%' }}>
      <Col>
        <Button onClick={prevMonth} style={{ marginRight: 8 }}>
          ← Poprzedni
        </Button>
      </Col>
      <Col>
        <Button onClick={nextMonth}>Następny →</Button>
      </Col>
    </Row>

    <Row gutter={[8, 8]} justify="center" style={{ fontWeight: 'bold', width: '100%' }}>
      {daysShort.map((day) => (
        <Col key={day} span={3} style={{ textAlign: 'center' }}>
          <Text>{day}</Text>
        </Col>
      ))}
    </Row>

    {calendar.map((week, i) => (
      <Row gutter={[8, 8]} key={i} justify="center" style={{ width: '100%' }}>
        {week.map((date) => {
          const isToday = moment().isSame(date, 'day');
          const isCurrentMonth = date.month() === currentDate.month();

          return (
            <Col
              key={date.format('YYYY-MM-DD')}
              span={3}
              style={{
                padding: 10,
                background: isToday
                  ? darkMode
                    ? '#0050b3'
                    : '#bae7ff'
                  : isCurrentMonth
                  ? darkMode
                    ? '#141414'
                    : '#e6f7ff'
                  : darkMode
                  ? '#1f1f1f'
                  : '#f5f5f5',
                color: isCurrentMonth
                  ? darkMode
                    ? '#fff'
                    : '#000'
                  : darkMode
                  ? '#777'
                  : '#bfbfbf',
                border: '1px solid ' + (darkMode ? '#303030' : '#d9d9d9'),
                borderRadius: 4,
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
)
}