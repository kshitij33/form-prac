// MyForm.tsx
import React from 'react';
import { useForm } from '@tanstack/react-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema, FormValues } from '../schema/schema'; // Adjust the path based on the actual location
import { Button } from '../ui/button';
import { Input } from '../ui/input';

// Define default values
const defaultValues: FormValues = {
  username: '',
  email: '',
  password: '',
};

const MyForm: React.FC = () => {
  // Setup the form with useForm
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="username">Username</label>
        <Input id="username" {...register('username')} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MyForm;
