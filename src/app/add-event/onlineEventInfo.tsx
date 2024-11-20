import React, { useState } from 'react'

export default function OnlineEventInfo() {
    const [onlineEventLink, setOnlineEventLink] = useState<string>('')

  return (
    <div className="w-full py-8">
        <div className="relative">
            <input
                id="online-link-field"
                required
                onChange={(e) => { setOnlineEventLink(e.target.value) }}
                className="peer/online-link w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
            />
            <label
                htmlFor="online-link-field"
                className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/online-link:-top-1.5 peer-focus/online-link:left-2.5 peer-focus/online-link:text-xs peer-focus/online-link:text-slate-400 peer-focus/online-link:scale-90`}
            >
                Event Link<span className="text-red-400">*</span>
            </label>
        </div>
        <span className='text-xs'>Link your livestream, zoom meeting or google hangout here so people know where to find you</span>
    </div>
  )
}
