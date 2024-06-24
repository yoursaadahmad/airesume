import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const PROMPT = "{jobTitle} , Depends on job title give me summary for my resume 3-4 lines";

function Summery() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo.summery || '');
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        setSummery(resumeInfo.summery || '');
    }, [resumeInfo.summery]);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const prompt = PROMPT.replace('{jobTitle}', resumeInfo.jobTitle);
        try {
            const result = await AIChatSession.sendMessage(prompt);
            const resp = result.response.text().replace('[{', '').replace('}]', '');
            setSummery(resp);
            setLoading(false);
        } catch (error) {
            console.error('Error generating summary:', error);
            setLoading(false);
        }
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: {
                summery: summery
            }
        };
        try {
            const resp = await GlobalApi.UpdateResumeDetail(params?.resumeid, data);
            setResumeInfo(prev => ({
                ...prev,
                summery: summery
            }));
            setLoading(false);
            toast("Details updated");
        } catch (error) {
            console.error('Error updating details:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button variant="outline" onClick={GenerateSummeryFromAI} type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' /> Generate from AI
                        </Button>
                    </div>
                    <Textarea className="mt-5" required
                        value={summery}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <p className='text-xs text-muted-foreground mt-4'>*AI generated summary can have mistakes</p>
                    <div className='mt-2 flex justify-end'>
                        <Button className="transition-all hover:scale-105 hover:shadow-sm" type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Summery;
