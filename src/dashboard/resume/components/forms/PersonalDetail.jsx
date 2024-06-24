import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom'
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetail({enableNext}) {

    const params=useParams();
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

    const [formData,setFormData] = useState();
    const[loading, setLoading] = useState(false);
    useEffect(()=>{
        console.log(params)
    }, [])
    const handleInputChange = (e) => {
        enableNext(false)
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }
    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data = {
            data: formData
        }
        GlobalApi.UpdateResumeDetail(params?.resumeid,data).then(resp=>{
            console.log(resp);
            enableNext(true)
            setLoading(false);
            toast("Details Saved")
        },(error)=>{
            setLoading(false);
        })
        
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Details</h2>
        <p className='text-muted-foreground'>Get started with the basic information</p>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                </div>
                <div>
                    <label className='text-sm'>Phone No.</label>
                    <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                </div>
            </div>
            <div className='mt-3 flex justify-end'>
                <Button className="transition-all hover:scale-105 hover:shadow-sm" type='submit' disabled={loading}> {loading? <Loader2 className='animate-spin'/>: 'Save'}</Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail