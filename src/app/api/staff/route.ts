import { Staff } from "@/util/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const staffs = await prisma.staff.findMany();
    return NextResponse.json(staffs, {status: 200});
}

export async function POST(request: NextRequest) {
    try {
        const data = (await request.json()) as Staff;
        if (!data) {
            return NextResponse.json(
                { message: "json参数不能为空" },
                { status: 400 }
            );
        }

        // staff not null
        const staff = await prisma.staff.create({
            data: {
                name: data.name,
                job: data.job,
                score: data.score,
            },
        });

        return NextResponse.json(staff, { status: 200 });
    } catch (e) {
        console.error("error ==> ", e);
        return NextResponse.json({ message: "Error" }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const {id} = (await request.json()) as Staff;
        if (!id) {
            return NextResponse.json(
                { message: "json参数不能为空" },
                { status: 400 }
            );
        }

        const staff = await prisma.staff.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(staff, { status: 200 });
    } catch(e) {
        console.error("error ==> ", e);
        return NextResponse.json({ message: "Error" }, { status: 400 });
    }
}
