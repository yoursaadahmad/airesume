import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {

    const [loading,setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();
    const [educationalList, setEducationalList]= useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:'',
        }
    ])


    const handleChange=(e,index) => {
        const newEntries=educationalList.slice();
        const {name,value} = e.target;
        newEntries[index][name]= value;
        setEducationalList(newEntries);
    }
    const AddNewEducation=()=>{
        setEducationalList([...educationalList,{
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:'',
        }])
    }
    const RemoveEducation=()=>{
        setEducationalList(educationalList=>educationalList.slice(0,-1))
    }
    const onSave=()=>{
        setLoading(true)
        const data= {
            data:{
                education:educationalList.map(({id, ...rest}) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(params.resumeid,data).then(resp=>{
            console.log(resp)
            setLoading(false)
            toast('Details Updated')
        }, (error)=>{
            setLoading(false);
            toast('Error Happened')
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList
        })
    }, [educationalList])
  return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Educational Details</h2>
        <p className='text-muted-foreground'>Fill in the fields with your Educational Details</p>
        <div>
            {educationalList.map((item,index)=> (
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label>University Name</label>
                            <Input name="universityName" onChange={(e)=> handleChange(e,index)} defaultValue={item?.universityName} />
                        </div>
                        <div>
                            <label>Degree</label>
                            <Input name="degree" onChange={(e)=> handleChange(e,index)}  defaultValue={item?.degree} />
                        </div>
                        <div>
                            <label>Major Subjects</label>
                            <Input name="major" onChange={(e)=> handleChange(e,index)}  defaultValue={item?.major} />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <Input type="date" name="startDate" onChange={(e)=> handleChange(e,index)}  defaultValue={item?.startDate} />
                        </div>
                        <div>
                            <label>End Date</label>
                            <Input placeholder="Write Present if still studying" name="endDate" onChange={(e)=> handleChange(e,index)}  defaultValue={item?.endDate} />
                        </div>
                        <div className='col-span-2'>
                            <label>Description About Degree</label>
                            <Textarea placeholder="Describe shortly about your degree here, not Mandatory." name="description" onChange={(e)=> handleChange(e,index)}  defaultValue={item?.description} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button onClick={AddNewEducation} variant="outline" className="text-primary transition-all hover:scale-105 hover:shadow-sm"> + Add More Education</Button>
            <Button onClick={RemoveEducation} variant="destructive" className="transition-all hover:scale-105 hover:shadow-sm">Remove</Button>
            </div>
            
            <Button className="transition-all hover:scale-105 hover:shadow-sm" disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Education