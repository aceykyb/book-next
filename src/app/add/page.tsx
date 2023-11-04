"use client";

import React, { useState } from "react";
import { Input, Spacer, Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

export interface SelectionJob {
    value: string;
    label: string;
}

const data: SelectionJob[] = [
    {
        value: "服务员",
        label: "服务员",
    },
    {
        value: "经理",
        label: "经理",
    },
    {
        value: "主管",
        label: "主管",
    },
    {
        value: "厨师",
        label: "厨师",
    },
];

export default function Add() {
    const [name, setName] = useState("");

    const [jobs, setJobs] = useState<string[]>([]);

    const router = useRouter();

    return (
        <div>
            <div className="flex align-middle justify-between">
                <Button
                    onClick={() => {
                        router.back();
                    }}
                >
                    返回
                </Button>
                <ThemeSwitcher />
            </div>

            <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-green-500">
                    添加员工
                </h3>
                <Spacer y={10} />
                <Input
                    label="请输入姓名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Spacer y={10} />
                <Spacer y={10} />
                <div className="flex w-full items-center justify-evenly">
                    <Select
                        label="请选择"
                        className="max-w-xs"
                        items={data}
                        selectedKeys={jobs}
                        onChange={(e) => {
                            setJobs([e.target.value]);
                        }}
                    >
                        {(job) => (
                            <SelectItem key={job.value}>{job.label}</SelectItem>
                        )}
                    </Select>
                    <Button
                        color="success"
                        size="lg"
                        onClick={() => {
                            fetch("http://localhost:3000/api/staff", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: name,
                                    job: jobs[0],
                                    score: 0,
                                }),
                            }).then((res) => res.json);
                            router.back();
                        }}
                    >
                        确定
                    </Button>
                </div>
            </div>
        </div>
    );
}
