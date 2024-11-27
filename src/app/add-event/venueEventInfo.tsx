import React, { useState, useRef, useEffect } from 'react'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';

interface locationLatLon {
    lat: number,
    lng: number
}

interface venueEventInfoProps {
    isEventLocationOnline: boolean;
    addEventsFormData: FormData;
}

const VenueEventInfo: React.FC<venueEventInfoProps> = ({ isEventLocationOnline, addEventsFormData }) => {
    const [locationPosition, setLocationPosition] = useState<locationLatLon>({ lat: 49.2606, lng: -123.2460 })
    const [venueLocationName, setVenueLocationName] = useState<String>('')
    const [eventLocationDescription, setEventLocationDescription] = useState<String>('')
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
    const locationRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        addEventsFormData.append("venueAddress", "Vancouver, BC V6T 1Z4")
        addEventsFormData.append("venueLat",  49.2606)
        addEventsFormData.append("venueLng",  -123.2460)
    }, [])


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
        libraries: ["places"]
    })

    const updateAddEventsFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
        addEventsFormData.set(event.target.name, event.target.value)
    }

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();

            if (place.geometry && place.geometry.location) {
                setLocationPosition({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
                addEventsFormData.set("venueAddress", place.formatted_address)
                addEventsFormData.set("venueLat",  place.geometry.location.lat())
                addEventsFormData.set("venueLng",  place.geometry.location.lng())
            } else {
                console.error("Place geometry is not available.");
            }
        }
    };

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className="w-full py-8">
            <div className="relative pb-2">
                <input
                    id="venue-location-field"
                    required={isEventLocationOnline}
                    name="venueLocationName"
                    onChange={(e) => {
                        setVenueLocationName(e.target.value)
                        updateAddEventsFormData(e)
                    }}
                    className="peer/venue-location w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                />
                <label
                    htmlFor="venue-location-field"
                    className={`absolute cursor-text bg-white px-1 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/venue-location:-top-1.5 peer-focus/venue-location:left-2.5 peer-focus/venue-location:text-xs peer-focus/venue-location:text-slate-400 peer-focus/venue-location:scale-90 ${(venueLocationName === '') ? 'left-2.5 top-2.5' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
                >
                    Event location Name<span className="text-red-400">*</span>
                </label>
            </div>
            <div className="w-full py-2">
                <div className="relative">
                    <textarea
                        id="location-description-field"
                        name="venueLocationDescription"
                        onChange={(e) => {
                            setEventLocationDescription(e.target.value)
                            updateAddEventsFormData(e)
                        }}
                        className="peer/location-description-field resize-none w-full h-16 bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    />
                    <label
                        htmlFor="location-description-field"
                        className={`absolute cursor-text bg-white px-1 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/location-description-field:-top-1.5 peer-focus/location-description-field:left-2.5 peer-focus/location-description-field:text-xs peer-focus/location-description-field:text-slate-400 peer-focus/location-description-field:scale-90 ${(eventLocationDescription === '') ? 'left-2.5 top-2.5' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
                    >
                        Location Notes (eg. Room number, Class name, General directions)
                    </label>
                </div>
            </div>
            <div className="w-full py-2">
                <Autocomplete onLoad={(autoC) => { setAutocomplete(autoC) }} onPlaceChanged={onPlaceChanged}>
                    <input
                        id="venue-location-field"
                        required={isEventLocationOnline}
                        name="venueAddress"
                        className="peer/venue-location w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                        placeholder="Event Address"
                        ref={locationRef}
                    />
                </Autocomplete>
                <span className='text-xs font-medium font-inter py-0.5'>Start typing your location, select it from the dropdown menu and we will Pinnit for you!</span>
            </div>
            {(isLoaded) ?
                <GoogleMap
                    center={locationPosition}
                    zoom={16}
                    mapContainerStyle={{ width: '100%', height: '300px' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false
                    }}
                >
                    <Marker position={locationPosition} />
                </GoogleMap>
                :
                <div>Loading</div>
            }
        </div>
    )
}

export default VenueEventInfo;
