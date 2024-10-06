import { DateInput } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { Control, Controller } from 'react-hook-form';
import { CalendarDate, parseDate } from "@internationalized/date";
import { ProfileSchema, SignUpSchema } from '@/app/types/form-shema';

interface formDateProps {
    control: Control<SignUpSchema> | Control<ProfileSchema>,
    error: string | undefined,
    setValue: (name: string, value: Date) => void,
    name: string,
    label: string,
    value?: string,
    onChange?: () => void,
    signup?: boolean,
}

const FormDate = ({ control, error, setValue, name, label, value, onChange, signup = false }: formDateProps) => {
    useEffect(() => {
        if (value) {
            const date = new Date(value);
            setValue(name, date);
        }
    }, [value]);

    const handleChange = (date: CalendarDate) => {
        const jsDate = new Date(date.year, date.month - 1, date.day);
        if (jsDate instanceof Date) {
            setValue(name, jsDate);
            if (onChange) {
                onChange();
            }
        }
    }

    return (
        (signup ? <Controller
            name="dob"
            control={control as Control<SignUpSchema>}
            render={({ field }) => (
                <DateInput
                    isInvalid={error ? true : false}
                    labelPlacement="outside"
                    label={label}
                    radius="sm"
                    size="lg"
                    isRequired
                    errorMessage={error}
                    onBlur={field.onBlur}
                    onChange={(calendarDate) => handleChange(calendarDate)}
                    defaultValue={value ? parseDate(value) : undefined}
                />
            )}
        /> : <Controller
            name="dob"
            control={control as Control<ProfileSchema>}
            render={({ field }) => (
                <DateInput
                    isInvalid={error ? true : false}
                    labelPlacement="outside"
                    label={label}
                    radius="sm"
                    size="lg"
                    isRequired
                    errorMessage={error}
                    onBlur={field.onBlur}
                    onChange={(calendarDate) => handleChange(calendarDate)}
                    defaultValue={value ? parseDate(value) : undefined}
                />
            )}
        />)

    )
}

export default FormDate