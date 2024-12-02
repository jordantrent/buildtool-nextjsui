'use client'

import { useState } from "react"
import { Job, columns } from "./columns" 
import { DataTable } from "./data-table" 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

async function fetchJenkinsJobs(jenkinsDetails: { url: string; username: string; password: string }): Promise<Job[]> {
    const requestPayload = {
        jenkinsUrl: jenkinsDetails.url,
        jenkinsUsername: jenkinsDetails.username,
        jenkinsApiToken: jenkinsDetails.password,
    }

    console.log("Sending request with payload:", requestPayload)

    const response = await fetch("http://localhost:8080/api/jenkins/jobs/names", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
    })

    if (!response.ok) {
        console.error("Failed to fetch Jenkins jobs", response.statusText)
        return []
    }

    const data = await response.json()
    console.log("Received data:", data)

    return data || []
}

export default function JenkinsDetailsForm() {
    const [jenkinsDetails, setJenkinsDetails] = useState({
        url: '',
        username: '',
        password: '',
    });
    const [jobs, setJobs] = useState<Job[]>([])
    const [editing, setEditing] = useState<boolean>(false);

    const handleSave = async () => {
       
        console.log("Saved Jenkins Details:", jenkinsDetails);
        const jobsData = await fetchJenkinsJobs(jenkinsDetails);
        setJobs(jobsData);
        setEditing(false); 
    };

    const handleEdit = () => {
        setEditing(true);  
    };

    const handleRefresh = async () => {
        if (jenkinsDetails.url && jenkinsDetails.username && jenkinsDetails.password) {
            const jobsData = await fetchJenkinsJobs(jenkinsDetails);
            setJobs(jobsData);
        } else {
            console.error("Please save Jenkins details first.");
        }
    };

    return (
        <div className="grid container mx-auto py-10">
            <div className="grid grid-cols-2 mb-10">
                
                    <div className="grid grid-cols-4 items-center gap-4 ">
                        
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={jenkinsDetails.username}  
                            onChange={(e) => setJenkinsDetails({ ...jenkinsDetails, username: e.target.value })}  
                            className="col-span-3"
                            disabled={!editing} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            value={jenkinsDetails.password} 
                            onChange={(e) => setJenkinsDetails({ ...jenkinsDetails, password: e.target.value })}  
                            type="password"
                            className="col-span-3"
                            disabled={!editing} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                            Jenkins URL
                        </Label>
                        <Input
                            id="url"
                            value={jenkinsDetails.url}
                            onChange={(e) => setJenkinsDetails({ ...jenkinsDetails, url: e.target.value })}
                            className="col-span-3"
                            disabled={!editing}
                        />

                    </div>
                    {editing ? (
                        <Button className="justify-self-end ml-auto" size="sm" variant="outline" onClick={handleSave}>Save Details</Button>
                    ) : (
                        <Button className="justify-self-end ml-auto" size="sm" variant="outline" onClick={handleEdit}>Edit Details</Button>
                    )}
              
            </div>
            <Button variant="outline" size="icon" onClick={handleRefresh}><RefreshCcw /></Button>
            <DataTable columns={columns} data={jobs} />
        </div>
    )
}
