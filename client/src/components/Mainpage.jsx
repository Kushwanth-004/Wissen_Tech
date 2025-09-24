  import React, { useEffect, useState } from "react";
  import { fetchCountries, fetchHolidays } from "../api";
  import CountrySelect from "../components/CountrySelect";
  import Calendar from "../components/Calender";
  import dayjs from "dayjs";

  const Mainpage = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("US");
    const [view, setView] = useState("monthly");
    const [startDate, setStartDate] = useState(dayjs().startOf("month"));
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
      fetchCountries().then(setCountries).catch(console.error);
    }, []);

    useEffect(() => {
      const start = startDate.toDate();
      let end;
      if (view === "monthly") {
        end = startDate.endOf("month").toDate();
      } else {
        end = startDate.add(2, "month").endOf("month").toDate();
      }
      const startStr = dayjs(start).format("YYYY-MM-DD");
      const endStr = dayjs(end).format("YYYY-MM-DD");

      fetchHolidays(country, startStr, endStr)
        .then(setHolidays)
        .catch(console.error);
    }, [country, startDate, view]);

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-violet-600">
            Vacation Calendar
          </h1>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center mb-8">
            <CountrySelect
              countries={countries}
              value={country}
              onChange={setCountry}
            />

            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly (3 months)</option>
            </select>

            <input
              type="month"
              value={startDate.format("YYYY-MM")}
              onChange={(e) => setStartDate(dayjs(e.target.value + "-01"))}
              className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Calendar view={view} startDate={startDate} holidays={holidays} />
        </div>
      </div>
    );
  };

  export default Mainpage;
