import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import JobTable from "@/app/jobs-table/job-table"

export function MainCard() {
    return (
        <Card className="w-[800px]">
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
