"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { columns } from "../jobs-detail-table/columns"
import { BuildDataTable } from "../jobs-detail-table/build-data-table"

export type Job = {
    name: string
    description: string
    color: string
    url: string
}

export function getColumns(jenkinsDetails: { url: string; username: string; password: string }): ColumnDef<Job>[] {
    return [
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
        },
        {
            id: "expand",
            header: "Actions",
            cell: ({ row }) => {
                const [isDialogOpen, setIsDialogOpen] = useState(false)
                const [builds, setBuilds] = useState([])
                const jobName = row.getValue<string>("name")

                const fetchBuilds = async () => {
                    try {
                        const response = await fetch(`http://localhost:8080/api/jenkins/jobs/builds/${jobName}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                jenkinsUrl: jenkinsDetails.url,
                                jenkinsUsername: jenkinsDetails.username,
                                jenkinsApiToken: jenkinsDetails.password,
                            }),
                        })
                        if (response.ok) {
                            const data = await response.json()
                            setBuilds(data)
                        } else {
                            console.error("Failed to fetch builds:", response.statusText)
                        }
                    } catch (error) {
                        console.error("Error fetching builds:", error)
                    }
                }

                return (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setIsDialogOpen(true)
                                fetchBuilds()
                            }}
                        >
                            View Builds
                        </Button>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent>
                                <BuildDataTable columns={columns} data={builds} jenkinsDetails={jenkinsDetails} jobName={jobName} />
                            </DialogContent>
                        </Dialog>
                    </>
                )
            },
        },
    ]
}
