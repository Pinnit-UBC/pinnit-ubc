"use client";
import React, { useState, useRef } from 'react';
import { Upload, X, FileText } from "lucide-react";

interface imageUploadProps {
    addEventsFormData: FormData;
}

const ImageUploadButton: React.FC<imageUploadProps> = ({ addEventsFormData }) => {
    const [eventPoster, setEventPoster] = useState<File | null>(null);
    const eventImageUploadRef = useRef<HTMLInputElement | null>(null);

    const handleEventImageUpload = (e) => {
        e.preventDefault();
        if (eventImageUploadRef !== null) {
            eventImageUploadRef!.current.click();
        }
    }

    const showFileLoaded = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setEventPoster(file)

            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                addEventsFormData.set("eventImageString", fileReader.result as string)
              };
        }
    }

    return (
        <div>
            <input
                type='file'
                ref={eventImageUploadRef}
                className='hidden'
                onChange={(e) => showFileLoaded(e)}
            />
            <div className='w-full flex justify-between pb-12 pt-4 gap-8'>
                <div className='flex flex-col'>
                    <h1 className='text-xl font-semibold font-inter'>Upload event poster<span></span></h1>
                    <p className='text-xs font-medium py-0.5 font-inter'>Accepted file types: .pdf,  .png, .xyz</p>
                </div>
                <div className=''>
                    {(eventPoster == null) ?
                        <button
                            onClick={(e) => handleEventImageUpload(e)}
                            className='flex items-center justify-content bg-[#556cd6] h-full w-full rounded-md text-primary-foreground p-2 transition duration-200 ease hover:bg-[#3f4b8c]'
                        >
                            <Upload /> <span className='pl-3 font-inter'>Upload Poster</span>
                        </button>
                        :
                        <div className='flex rounded-md border border-[#556cd6] text-primary-foreground p-2 justify-content items-center hover:text-red-500'>
                            <FileText color='black' />
                            <div className='flex flex-col'>
                                <span className='px-3 text-[#556cd6] text-xs peer-hover/remove-file:bg-red-500'>{eventPoster.name.substring(0, eventPoster.name.length - 4)}</span>
                                <span className='px-3 text-slate-700 text-[0.5rem] uppercase'>{eventPoster.name.substring(eventPoster.name.length - 3, eventPoster.name.length)}</span>
                            </div>

                            <button
                                className='peer/remove-file transition duration-200 ease rounded-md hover:bg-red-300 hover:bg-opacity-25'
                                onClick={() => setEventPoster(null)}
                            >
                                <div className='opacity-50 text-red-500 transition duration-200 ease hover:text-red-500 hover:opacity-75'><X /></div>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageUploadButton;