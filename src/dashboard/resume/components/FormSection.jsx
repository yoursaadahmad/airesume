import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, HomeIcon, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';


function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const[enableNext, setEnableNext] = useState(false);
  const {resumeid} = useParams();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
          <Button><Home/></Button>
          </Link>
          <ThemeColor/>
        </div>
        
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button variant='outline' size='sm' onClick={() => setActiveFormIndex(activeFormIndex - 1)}> Back <ArrowLeft/> </Button>}
          <Button className="flex gap-2" size="sm" onClick={() => setActiveFormIndex(activeFormIndex + 1)}> Next <ArrowRight/> </Button>
        </div>
      </div>
      {activeFormIndex==1? <PersonalDetail enableNext={(v) => setEnableNext(v)} />
       :activeFormIndex==2? <Summary enableNext={(v) => setEnableNext(v)}/>
       :activeFormIndex===3? <Experience enableNext={(v) => setEnableNext(v)} />
       :activeFormIndex===4? <Education enableNext={(v) => setEnableNext(v)} />
       :activeFormIndex===5? <Skills enableNext={(v) => setEnableNext(v)} />
       :activeFormIndex===6? <Navigate to={'/my-resume/'+resumeid+'/view'} />
       : null}
       
    </div>
  )
}

export default FormSection
