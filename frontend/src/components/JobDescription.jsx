import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar'

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    
    // Check if user already applied
    const checkIfApplied = (job, userId) => {
        if (!job?.applications || !userId) return false;
        return job.applications.some(application => {
            const applicantId = application.applicant?._id || application.applicant;
            return applicantId?.toString() === userId?.toString();
        });
    };
    
    const isInitiallyApplied = checkIfApplied(singleJob, user?._id);
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            console.log("Applying for job:", jobId);
            console.log("User:", user?._id);

            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`, 
                {}, 
                { withCredentials: true }
            );
            
            console.log("Apply response:", res.data);
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob, 
                    applications: [...(singleJob?.applications || []), {applicant: user?._id}]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Apply error:", error.response?.data);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    const hasApplied = checkIfApplied(res.data.job, user?._id);
                    setIsApplied(hasApplied);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(jobId) fetchSingleJob(); 
    }, [jobId, dispatch, user?._id]);

    useEffect(() => {
        const hasApplied = checkIfApplied(singleJob, user?._id);
        setIsApplied(hasApplied);
    }, [singleJob, user?._id]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">
                                {singleJob?.salary}LPA
                            </Badge>
                        </div>
                    </div>
                    
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${
                            isApplied 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                
                <div className='my-4'>
                    <h1 className='font-bold my-1'>
                        Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
                    </h1>
                    <h1 className='font-bold my-1'>
                        Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
                    </h1>
                    <h1 className='font-bold my-1'>
                        Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span>
                    </h1>
                    <h1 className='font-bold my-1'>
                        Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span>
                    </h1>
                    <h1 className='font-bold my-1'>
                        Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span>
                    </h1>
                    <h1 className='font-bold my-1'>
                        Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span>
                    </h1>
                    <h1 className='font-bold my-1'>
                        Posted Date: <span className='pl-4 font-normal text-gray-800'>
                            {singleJob?.createdAt?.split("T")[0]}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription