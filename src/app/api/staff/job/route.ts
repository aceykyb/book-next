import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface JobRequest {
    id: string;
    job: string;
}

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {

    const {id, job} = (await request.json()) as JobRequest;
    if (!id || !job) {
        return NextResponse.json({
            message: "Bad Request: id or job is null"
        }, {status: 400}); 
    }

    const staff = await prisma.staff.update({
        where: {
            id: id
        },
        data: {
            job: job
        }
    });

    return NextResponse.json({
        staff
    }, {status: 200});
}