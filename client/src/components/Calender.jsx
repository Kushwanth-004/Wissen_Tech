import React, { useState } from "react";
import dayjs from "dayjs";

const fmt = (d) => dayjs(d).format("YYYY-MM-DD");

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return new Date(d);
}

export default function Calendar({ view = "monthly", startDate, holidays = [] }) {
  const holidayDates = holidays.map((h) => ({
    date: h.date,
    name: h.localName || h.name,
  }));

  const monthCount = view === "monthly" ? 1 : 3;
  const months = Array.from({ length: monthCount }, (_, i) => startDate.add(i, "month"));

  const [hoveredHoliday, setHoveredHoliday] = useState({ monthIdx: null, holiday: null });

  return (
    <div className="space-y-6">
      {/* Guide / Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-300 border rounded-sm" /> Single holiday 
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-700 border rounded-sm" /> More than 2 holidays
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-grey-700 border rounded-sm" /> No Holiday
        </div>
      </div>

      {/* Calendar Grid */}
      <div className={`grid gap-6 ${view === "monthly" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}>
        {months.map((m, monthIdx) => (
          <div key={monthIdx} className="border rounded-lg shadow bg-white p-4 relative">
            <h3 className="text-lg font-semibold text-center mb-2">{m.format("MMMM YYYY")}</h3>

            {/* Table wrapper for scroll on mobile */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                      <th key={d} className="p-2 border text-center font-medium">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const firstOfMonth = new Date(m.year(), m.month(), 1);
                    const start = getWeekStart(firstOfMonth);
                    const weeks = [];
                    let cur = new Date(start);

                    for (let w = 0; w < 6; w++) {
                      const days = [];
                      for (let d = 0; d < 7; d++) {
                        days.push(new Date(cur));
                        cur.setDate(cur.getDate() + 1);
                      }
                      weeks.push(days);
                    }

                    return weeks.map((week, wi) => {
                      const holidayCount = week.reduce((acc, day) => {
                        const s = fmt(day);
                        return acc + (holidayDates.find((h) => h.date === s) ? 1 : 0);
                      }, 0);

                      const rowClass =
                        holidayCount === 1
                          ? "bg-green-300"
                          : holidayCount > 1
                          ? "bg-green-700 text-white"
                          : "";

                      return (
                        <tr key={wi} className={rowClass}>
                          {week.map((day, di) => {
                            const inMonth = day.getMonth() === m.month();
                            const s = fmt(day);
                            const holiday = holidayDates.find((h) => h.date === s);

                            const isHovered =
                              hoveredHoliday.monthIdx === monthIdx &&
                              hoveredHoliday.holiday?.date === s;

                            return (
                              <td
                                key={di}
                                className={`p-2 border text-center align-top relative
                                  ${inMonth ? "cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg" : "opacity-40"}
                                `}
                                onMouseEnter={() =>
                                  holiday &&
                                  setHoveredHoliday({ monthIdx, holiday })
                                }
                                onMouseLeave={() => setHoveredHoliday({ monthIdx: null, holiday: null })}
                              >
                                <div className="text-sm font-medium">{day.getDate()}</div>
                                {holiday && <div className="text-xs mt-1 italic">{holiday.name}</div>}

                                {/* Tooltip */}
                                {isHovered && (
                                  <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50">
                                    {holiday.name}
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
