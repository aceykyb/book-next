"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Spacer,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Select,
    SelectItem,
    Input,
} from "@nextui-org/react";
import { Staff } from "@/util/types";
import { SelectionJob } from "../add/page";

export default function MyTable() {
    const [staffs, setStaffs] = useState<Staff[]>([]);

    const [jobs, setJobs] = useState<string[]>([]);

    const [staff, setStaff] = useState<Staff>();

    const [score, setScore] = useState<number>(0);

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
    ]

    useEffect(() => {
        fetch(process.env.API_ADDRESS + "/staff", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setStaffs(data as Staff[]);
            });
    }, []);

    const scoreContent = (
        <PopoverContent className="w-[240px]">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
                    <Input
                        type="number"
                        label="请评分"
                        placeholder="0"
                        labelPlacement="outside"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                    ✨
                                </span>
                            </div>
                        }
                        value={String(score)}
                        onChange={(e) => {
                            setScore(Number(e.target.value));
                        }}
                    />
                    <Spacer x={2} />
                    <Button
                        color="primary"
                        onClick={() => {
                            fetch(process.env.API_ADDRESS + "/staff/score", {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    id: staff?.id,
                                    score: score,
                                }),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    setStaffs(
                                        staffs.map((s) => {
                                            if (s.id === staff?.id) {
                                                return { ...s, score: score };
                                            }
                                            return { ...s };
                                        })
                                    );
                                });
                        }}
                    >
                        确定
                    </Button>
                </div>
            )}
        </PopoverContent>
    );

    const jobContent = (
        <PopoverContent className="w-[240px]">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
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
                    <Spacer x={2} />
                    <Button
                        color="primary"
                        onClick={() => {
                            fetch(process.env.API_ADDRESS + "/staff/job", {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    id: staff?.id,
                                    job: jobs[0],
                                }),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    setStaffs(
                                        staffs.map((s) => {
                                            if (s.id === staff?.id) {
                                                return { ...s, job: jobs[0] };
                                            }
                                            return { ...s };
                                        })
                                    );
                                });
                        }}
                    >
                        确定
                    </Button>
                </div>
            )}
        </PopoverContent>
    );

    const deleteContent = (
        <PopoverContent className="w-[240px]">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
                    <p
                        className="text-small font-bold text-foreground"
                        {...titleProps}
                    >
                        是否删除改员工?
                    </p>
                    <div className="flex">
                        <Button
                            color="primary"
                            onClick={() => {
                                fetch(process.env.API_ADDRESS + "/staff", {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        id: staff?.id,
                                    }),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        setStaffs(
                                            staffs.filter(
                                                (s) => s.id !== staff?.id
                                            )
                                        );
                                    });
                            }}
                        >
                            确定
                        </Button>
                    </div>
                </div>
            )}
        </PopoverContent>
    );

    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>姓名</TableColumn>
                <TableColumn>职位</TableColumn>
                <TableColumn>得分</TableColumn>
                <TableColumn>操作</TableColumn>
            </TableHeader>
            <TableBody>
                {staffs?.map((staff) => {
                    return (
                        <TableRow key={staff.id}>
                            <TableCell>{staff.name}</TableCell>
                            <TableCell>{staff.job}</TableCell>
                            <TableCell>{staff.score}</TableCell>
                            <TableCell className="flex">
                                <div>
                                    <Popover
                                        key={"score"}
                                        showArrow
                                        offset={10}
                                        placement="bottom"
                                        backdrop={"transparent"}
                                    >
                                        <PopoverTrigger>
                                            <Button
                                                color="primary"
                                                variant="flat"
                                                className="capitalize"
                                                onClick={() => {
                                                    setStaff(staff);
                                                }}
                                            >
                                                评分
                                            </Button>
                                        </PopoverTrigger>
                                        {scoreContent}
                                    </Popover>
                                </div>
                                <Spacer x={2} />
                                <div>
                                    <Popover
                                        key={"job"}
                                        showArrow
                                        offset={10}
                                        placement="bottom"
                                        backdrop={"transparent"}
                                    >
                                        <PopoverTrigger>
                                            <Button
                                                color="secondary"
                                                variant="flat"
                                                className="capitalize"
                                                onClick={() => {
                                                    setStaff(staff);
                                                }}
                                            >
                                                职位
                                            </Button>
                                        </PopoverTrigger>
                                        {jobContent}
                                    </Popover>
                                </div>
                                <Spacer x={2} />
                                <div>
                                    <Popover
                                        key={"delete"}
                                        showArrow
                                        offset={10}
                                        placement="bottom"
                                        backdrop={"blur"}
                                    >
                                        <PopoverTrigger>
                                            <Button
                                                color="danger"
                                                variant="flat"
                                                className="capitalize"
                                                onClick={() => {
                                                    setStaff(staff);
                                                }}
                                            >
                                                删除
                                            </Button>
                                        </PopoverTrigger>
                                        {deleteContent}
                                    </Popover>
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
