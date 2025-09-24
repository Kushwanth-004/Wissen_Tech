import React from "react";
import dayjs from "dayjs";

const fmt = (d) => dayjs(d).format("YYYY-MM-DD");

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return new Date(d);
}

export default function Calendar({
  view = "monthly",
  startDate,
  holidays = [],
}) {
  const holidayDates = holidays.map((h) => ({
    date: h.date,
    name: h.localName || h.name,
  }));

  const months = [];
  const monthCount = view === "monthly" ? 1 : 3;
  for (let i = 0; i < monthCount; i++) months.push(startDate.add(i, "month"));

  return (
    <div
      className={`grid gap-6 ${
        view === "monthly" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-1"
      }`}
    >
      {months.map((m, idx) => (
        <div
          key={idx}
          className={`border rounded-lg shadow bg-white p-4 ${
            view === "monthly" ? "w-full" : "w-full"
          }`}
        >
          <h3 className="text-lg font-semibold text-center mb-2">
            {m.format("MMMM YYYY")}
          </h3>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <th key={d} className="p-2 border text-center font-medium">
                    {d}
                  </th>
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
                  const count = week.reduce((acc, day) => {
                    const s = fmt(day);
                    return (
                      acc + (holidayDates.find((h) => h.date === s) ? 1 : 0)
                    );
                  }, 0);

                  const rowClass =
                    count === 1
                      ? "bg-green-300"
                      : count > 1
                      ? "bg-green-700 text-white"
                      : "";

                  return (
                    <tr key={wi} className={rowClass}>
                      {week.map((day, di) => {
                        const inMonth = day.getMonth() === m.month();
                        const s = fmt(day);
                        const holiday = holidayDates.find((h) => h.date === s);

                        return (
                          <td
                            key={di}
                            className={`p-2 border text-center align-top ${
                              inMonth ? "" : "opacity-40"
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {day.getDate()}
                            </div>
                            {holiday && (
                              <div className="text-xs mt-1 italic">
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
      ))}
    </div>
  );
}
