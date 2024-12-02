"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Build = {
    id: string
    result: string
    timestamp: number
    duration: number
}

export const columns: ColumnDef<Build>[] = [
    {
        accessorKey: "id",
        header: "Build ID",
    },
    {
        accessorKey: "timestamp",
        header: "Date Started",
        cell: ({ row }) => {
            const timestamp = row.getValue<number>("timestamp");
            return new Date(timestamp).toLocaleString(); 
        },
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => {
            const durationMs = row.getValue<number>("duration"); 
            const seconds = Math.floor(durationMs / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (hours > 0) {
                return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
            } else if (minutes > 0) {
                return `${minutes}m ${seconds % 60}s`;
            } else {
                return `${seconds}s`;
            }
        },
    },
    {
        accessorKey: "result",
        header: "Result",
    },
 
];
