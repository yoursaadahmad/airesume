import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {
    const [resumeInfo,setResumeInfo]= useState();
    const {resumeid}=useParams();

    useEffect(()=>{
        GetResumeInfo();
    }, [])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeid).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload=()=>{
        window.print();
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print" >
        <Header/>
        
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'><span className='text-primary'>Congratulations!</span> Your AI Resume is created!</h2>
            <p className='text-muted-foreground text-center '>Now you can download or share your resume</p>
            <div className='flex justify-between px-44 my-10'>
                <Button onClick={HandleDownload}>Download</Button>
                <RWebShare
        data={{
          text: "Hello Everyone, I'm Excited to share my Resume to you",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeid+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+"'s Resume",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button>Share</Button>
      </RWebShare>
            </div>
        </div>
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
                <ResumePreview/>
        </div>
        </div>

    </ResumeInfoContext.Provider>
  )
}

export default ViewResume