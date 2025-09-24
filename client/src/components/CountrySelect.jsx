import React from "react";

export default function CountrySelect({ countries, value, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
      <label className="font-medium min-w-[80px]">Country:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {countries.map((c) => (
          <option key={c.countryCode} value={c.countryCode}>  
            {c.countryCode} - {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
