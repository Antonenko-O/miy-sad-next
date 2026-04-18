'use client';

import React, { useState } from 'react';

const accent = '#5B21B6';
const cardBg = '#F5F0FF';

const DAYS = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];
const MONTHS_UA = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];

const Pin = () => (
  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill={accent}>
      <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
    </svg>
  </div>
);

const tasks = {
  today: [
    { task: 'Полив троянд', time: '09:00', icon: '💧' },
    { task: 'Обрізка лаванди', time: '14:00', icon: '✂️' },
  ],
  tomorrow: [
    { task: 'Підживлення гортензії', time: '10:00', icon: '🌱' },
  ],
  later: [
    { task: 'Полив яблуні', time: '08:00', icon: '💧', label: '8 квітня' },
  ],
};

function TaskCard({ task, time, icon, rotation }: { task: string; time: string; icon: string; rotation: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{
      position: 'relative', padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: '12px',
      backgroundColor: checked ? `${cardBg}99` : cardBg,
      transform: `rotate(${rotation})`,
      boxShadow: '2px 4px 10px rgba(91,33,182,0.10)', borderRadius: '4px',
      opacity: checked ? 0.6 : 1, transition: 'opacity 0.2s',
    }}>
      <Pin />
      <div style={{ fontSize: '20px' }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontFamily: 'Caveat, cursive', fontSize: '20px', color: accent, fontWeight: 600,
          textDecoration: checked ? 'line-through' : 'none',
        }}>{task}</h4>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: accent, opacity: 0.6 }}>{time}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        style={{ width: '20px', height: '20px', accentColor: accent, cursor: 'pointer' }}
      />
    </div>
  );
}

export function CalendarScreen() {
  const now = new Date();
  const [monthOffset, setMonthOffset] = useState(0);
  const displayMonth = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const monthLabel = `${MONTHS_UA[displayMonth.getMonth()]} ${displayMonth.getFullYear()}`;

  const todayDay = now.getDay() === 0 ? 6 : now.getDay() - 1; // Mon=0

  return (
    <div className="px-6 pt-12 pb-4">
      <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: accent, fontWeight: 600, marginBottom: '24px' }}>
        Календар догляду
      </h1>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
        <button onClick={() => setMonthOffset(o => o - 1)} style={{ color: accent, fontSize: '22px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Caveat, cursive' }}>←</button>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '26px', color: accent, fontWeight: 600, minWidth: '160px', textAlign: 'center' }}>{monthLabel}</h2>
        <button onClick={() => setMonthOffset(o => o + 1)} style={{ color: accent, fontSize: '22px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Caveat, cursive' }}>→</button>
      </div>

      {/* Week strip */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '32px' }}>
        {DAYS.map((day, i) => {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - todayDay);
          const weekDate = new Date(startOfWeek);
          weekDate.setDate(startOfWeek.getDate() + i);
          const isToday = i === todayDay && monthOffset === 0;
          return (
            <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px' }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: accent, opacity: 0.6, marginBottom: '4px' }}>{day}</div>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: isToday ? accent : 'transparent',
                color: isToday ? '#FFFFFF' : accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: isToday ? 600 : 400,
              }}>
                {weekDate.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tasks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <div>
          <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', color: accent, fontWeight: 600, marginBottom: '12px' }}>Сьогодні</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.today.map((t, i) => <TaskCard key={i} {...t} rotation={i % 2 === 0 ? '-0.8deg' : '0.5deg'} />)}
          </div>
        </div>
        <div>
          <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', color: accent, fontWeight: 600, marginBottom: '12px' }}>Завтра</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.tomorrow.map((t, i) => <TaskCard key={i} {...t} rotation="-0.5deg" />)}
          </div>
        </div>
        {tasks.later.map((section, i) => (
          <div key={i}>
            <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', color: accent, fontWeight: 600, marginBottom: '12px' }}>{section.label}</h3>
            <TaskCard task={section.task} time={section.time} icon={section.icon} rotation="0.7deg" />
          </div>
        ))}
      </div>
    </div>
  );
}
