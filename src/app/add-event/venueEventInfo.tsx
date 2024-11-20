import React from 'react'

export default function VenueEventInfo() {
  return (
    <div className="w-full py-8">
    <div className="relative">
        <input
            id="venue-location-field"
            required
            className="peer/venue-location w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
        />
        <label
            htmlFor="venue-location-field"
            className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/venue-location:-top-1.5 peer-focus/venue-location:left-2.5 peer-focus/venue-location:text-xs peer-focus/venue-location:text-slate-400 peer-focus/venue-location:scale-90`}
        >
            Location Name<span className="text-red-400">*</span>
        </label>
    </div>
</div>
  )
}
