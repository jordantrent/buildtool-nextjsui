'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
 } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    jenkinsDetails: { url: string; username: string; password: string };
    jobName: string;
}

export function BuildDataTable<TData, TValue>({ columns, data, jenkinsDetails, jobName }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    const [consoleOutput, setConsoleOutput] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchConsoleOutput = async (jobName: string, buildId: string) => {
        try {
            const requestPayload = {
                jenkinsUrl: jenkinsDetails.url,
                jenkinsUsername: jenkinsDetails.username,
                jenkinsApiToken: jenkinsDetails.password,
            };

            const requestUrl = `http://localhost:8080/api/jenkins/jobs/${jobName}/${buildId}/consoleOutput`;

            const response = await fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestPayload),
            });

            if (response.ok) {
                const data = await response.text();
                setConsoleOutput(data);
                setIsDialogOpen(true);
            } else {
                console.error("Failed to fetch console output:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching console output:", error);
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="min-h-[800px] min-w-[800px]">
                    <Textarea className="w-full h-full" value={consoleOutput} readOnly />
                </DialogContent>
            </Dialog>

       
        <div className="grid grid-cols-2">
            <div className="col-span-1"></div>
            <div className="flex justify-end"></div>
            <div className="rounded-md border col-span-2 mt-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const buildId = row.getValue("id") as string
                                                fetchConsoleOutput(jobName, buildId)
                                            }}
                                        >
                                            Console Output
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4 w-full col-span-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            </>
    )
}
