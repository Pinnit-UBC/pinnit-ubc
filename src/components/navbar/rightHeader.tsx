"use client";
import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search} from "lucide-react"

export default function RightHeader() {
  return (
    <div className="flex items-center gap-4">
        <form className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search events..."
                className="pl-8 w-[200px] lg:w-[300px]"
            />
        </form>
        <Button className="bg-[#556cd6] text-primary-foreground hover:bg-primary/90">
              Login
        </Button>
    </div>
  )
}
