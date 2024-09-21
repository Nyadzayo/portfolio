'use client'

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { ProjectRequestFormSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/lib/actions';



type Inputs = z.infer<typeof ProjectRequestFormSchema>;

export default function ProjectRequestForm() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>({
        resolver: zodResolver(ProjectRequestFormSchema),
        defaultValues: {
            name: '',
            projectDescription: '',
            category: '',
            budget: '',
            customBudget: '',
            email: '',
            phone: '',
            documentation: false
        }
    });

    const selectedBudget = watch('budget');

    const processForm: SubmitHandler<Inputs> = async data => {
        const result = await sendEmail(data, 'project-request');

        if (result?.error) {
            toast.error('An error occurred! Please try again');
        } else {
            toast.success('Project request sent successfully');
            reset();
        }
    };

    return (
        <section className="relative isolate">
            {/* Background pattern */}
            <svg>
                {/* Add your SVG pattern here */}
            </svg>
            {/* Form */}
            <div className="relative">
                <form
                    onSubmit={handleSubmit(processForm)}
                    className='mt-16 lg:flex-auto'
                    noValidate
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Name */}
                        <div>
                            <Input
                                id='name'
                                type='text'
                                placeholder='Name'
                                autoComplete='given-name'
                                {...register('name')}
                            />
                            {errors.name?.message && (
                                <p className="ml-1 mt-2 text-sm text-rose-400">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        {/* Project Description */}
                        <div className="sm:col-span-2">
                            <Textarea
                                id='projectDescription'
                                rows={4}
                                placeholder='Project Description'
                                {...register('projectDescription')}
                            />
                            {errors.projectDescription?.message && (
                                <p className="ml-1 mt-2 text-sm text-rose-400">
                                    {errors.projectDescription.message}
                                </p>
                            )}
                        </div>
                        {/* Category */}
                        <div>
                            <select
                                id='category'
                                {...register('category')}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category?.message && (
                                <p className="ml-1 mt-2 text-sm text-rose-400">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>
                        {/* Budget */}
                        <div>
                            <select
                                id='budget'
                                {...register('budget')}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Budget</option>
                                <option value="50">50</option>
                                <option value="60">60</option>
                                <option value="80">80</option>
                                <option value="custom">Custom</option>
                            </select>
                            {errors.budget?.message && (
                                <p className="ml-1 mt-2 text-sm text-rose-400">
                                    {errors.budget.message}
                                </p>
                            )}
                        </div>
                        {/* Custom Budget */}
                        {selectedBudget === 'custom' && (
                            <div>
                                <Input
                                    id='customBudget'
                                    type='text'
                                    placeholder='Custom Budget'
                                    {...register('customBudget')}
                                />
                                {errors.customBudget?.message && (
                                    <p className="ml-1 mt-2 text-sm text-rose-400">
                                        {errors.customBudget.message}
                                    </p>
                                )}
                            </div>
                        )}
                        {/* Email */}
                        <div>
                            <Input
                                id='email'
                                type='text'
                                placeholder='Email'
                                autoComplete='email'
                                {...register('email')}
                            />
                            {errors.email?.message && (
                                <p className="ml-1 mt-2 text-sm text-rose-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        {/* Phone */}
                        <div>
                            <Input
                                id='phone'
                                type='text'
                                placeholder='Phone'
                                autoComplete='tel'
                                {...register('phone')}
                            />
                            {errors.phone?.message && (
                                <p className="ml-1 mt-2 text-sm text-rose-400">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        {/* Documentation Checkbox */}
                         <div className="sm:col-span-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('documentation')}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">Request documentation for the project (additional fee)</span>
                            </label>
                        </div>
                        <div className="mt-6">
                            <Button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full disabled:opacity-50'
                            >
                                {isSubmitting ? 'Submitting ...' : 'Submit Project Request'}
                            </Button>
                        </div>
                         
                        <p className="mt-4 text-xs text-muted-foreground">
                            By submitting this form, I agree to the {' '}
                            <Link href='/privacy' className='font-bold'>
                                privacy&nbsp;policy.
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}