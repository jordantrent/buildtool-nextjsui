import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import JobTable from "@/app/jobs-table/job-table"

export function MainCard() {
    return (
        <Card className="w-[1200px]">
            <CardHeader>
                <CardTitle>Build Tool</CardTitle>
                <CardDescription>Simply put your account details in, all the jobs are displayed below.</CardDescription>
            </CardHeader>
            <CardContent>
                <JobTable />
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
    )
}
