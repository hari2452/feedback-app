# Task 13 – Feedback App with Custom Hooks

A React Feedback Application built to understand **Custom Hooks**, reusable form handling, validation, and toast notifications.

## Features

- Feedback form with Name, Email, Rating, and Message
- Reusable `useForm` custom hook
- Reusable `useToast` custom hook
- Inline form validation
- Success and error toast notifications
- Toast automatically disappears after 3 seconds
- Submitted feedback displayed as cards
- Clickable star rating
- Message character counter
- Feedback saved using localStorage
- Responsive UI
- No `alert()` used

## Project Flow

User fills feedback form  
→ `useForm` manages input values  
→ User clicks Submit  
→ Form validation runs  
→ If invalid: inline errors + error toast  
→ If valid: feedback added + success toast  
→ Form resets  
→ Feedback card displayed  
→ Feedback saved to localStorage  
→ Toast disappears automatically after 3 seconds

## Custom Hook – useForm

A custom hook is a reusable React function that contains hook-related logic.

Custom hook names start with `use`, such as `useForm` and `useToast`. This follows React's Hooks convention and allows hook rules to be checked correctly.

`useForm` manages:
- Form values
- Input changes
- Validation errors
- Form validation
- Form reset

The same hook can handle different forms because `initialValues` and the `validate` function are passed as arguments.

## useForm Code

```javascript
import { useState } from "react";

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = validate(values);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
  }

  return {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm,
  };
}