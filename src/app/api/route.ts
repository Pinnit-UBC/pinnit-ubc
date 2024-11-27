import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({
        Hello: "World"
    })
}

export async function POST(req: Request){
    return NextResponse.json({
        Hello: "World"
    })
}