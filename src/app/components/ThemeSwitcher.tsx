"use client";

import { Button, Select, SelectItem } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const t = [
    {value: "light", label: "白天"},
    {value: "dark", label: "暗夜"}
  ]

  return (
    <div className="w-2/12">
      <Select
        items={t}
        label={"主题"}
        selectionMode="single"
        fullWidth={false}
        className="w-7/12"
        onChange={(e) => {
            setTheme(e.target.value)
        }} 
      >
        {(item) => {
            return <SelectItem key={item.value}>{item.label}</SelectItem>
        }}
      </Select>
    </div>
  )
};