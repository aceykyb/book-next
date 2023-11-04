"use client";
import { Button, Spacer } from "@nextui-org/react";
import Link from "next/link";
import MyTable from "./components/MyTable";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export default function Home() {
    return (
        <div>
            <div className="flex align-middle justify-between">
                <Button color="success">
                    <Link href={"/add"}>+添加</Link>
                </Button>
                <ThemeSwitcher />
            </div>
            <Spacer y={4} />
            <div className="w-full h-full border-3 p-2">
                <MyTable />
            </div>
        </div>
    );
}
