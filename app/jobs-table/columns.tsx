"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Job = {
    name: string
    description: string
    color: string
    url: string
}

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "name",
        header: "Job Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "color",
        header: "Status",
    },
    {
        accessorKey: "url",
        header: "Job Url",
    }
]
