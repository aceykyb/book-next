import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ScoreRequest {
    id: string;
    score: number;
}

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    const { id, score } = (await request.json()) as ScoreRequest;

    if (!id || !score) {
        return NextResponse.json(
            {
                message: "Bad Request, id or score is null",
            },
            { status: 400 }
        );
    }

    const staff = await prisma.staff.update({
        where: {
            id: id,
        },
        data: {
            score: score,
        },
    });

    return NextResponse.json(
        {
            staff,
        },
        { status: 200 }
    );
}
