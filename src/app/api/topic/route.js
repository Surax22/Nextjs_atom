import { connect } from "@/dbConfig/dbconfig";
import Topic from '../../../models/topic';
import { NextResponse } from 'next/server';

export async function POST(request){
    const {title, description} = await request.json();
    connect();
    await Topic.create({title, description});
    return NextResponse.json({message: "Topic created"}, {status: 201});
}

export async function GET(request){
    connect();
    const topics =  await Topic.find();
    return NextResponse.json({topics });
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id")
    connect();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic deleted"}, {status: 200});
}

