'use client' 

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewsletterFormSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button';
import {Input } from '@/components/ui/input';
import { Card,CardContent } from '@/components/ui/card';
import { subscribe } from '@/lib/actions'

type Inputs = z.infer<typeof NewsletterFormSchema>

export default function NewsletterForm(){

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting }
    } = useForm<Inputs>({
        resolver: zodResolver(NewsletterFormSchema),
        defaultValues:{
            email:'',
        }
    })

    const processForm: SubmitHandler<Inputs> = async data =>{
        const result = await subscribe(data) ;

        if(result?.error){
            toast.error('An error occured! Please try again')
        }

      toast.success('Subscribed successfully')
      reset()
    }

    return (
        <section className="relative isolate">
            <Card className="rounded-lg boarder-0 dark:boarder">
                <CardContent className="flex flex-col gap-8 pt-6 md:flex-row md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Subscribe to my newsletter</h2>
                        <p className="text-muted-foreground">
                            Get updates on my workd and projects.
                        </p>
                    </div>
                     {/* Form */}
        <div className="relative">
            <form 
                onSubmit={handleSubmit(processForm)}
                className='mt-16 lg:flex-auto'
                noValidate
            
            >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    
                     {/* Email */}
                    <div>
                        <Input 
                            id='email'
                            type='text'
                            placeholder='Email'
                            autoComplete='email'
                            {...register('email')}
                        />
                        {
                            errors.email?.message && (
                                <p className="ml-1 mt-2 text-sm text-rose-400">
                                    {errors.email.message}
                                </p>
                            )
                        }
                    </div>
                    
                    <div className="mt-6">
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full disabled:opacity-50'
                        >
                            {isSubmitting ? 'Submitting ...' : 'Subscribe'}
                        </Button>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                        By submitting this form, I agree to the {' '}
                        <Link href='/privacy' className='font-bold' >
                        privacy&nbsp;policy.
                        </Link>
                    </p>
                </div>
            </form>
        </div>
                </CardContent>
            </Card>
        {/* Backgroun pattern */}
       
        
        </section>
    )


}