import { DateInput } from '@nextui-org/react';
import React from 'react'
import { Controller } from 'react-hook-form';
import { CalendarDate } from "@internationalized/date";

interface formDateProps {
    control: any,
    error: string | undefined,
    setValue: (name: string, value: any) => void,
    name: string,
    label: string,
}

const FormDate = ({ control, error, setValue, name, label }: formDateProps) => {

    const handleChange = (date: any) => {
        if (date instanceof CalendarDate) {
            const jsDate = new Date(
                date.year,
                date.month - 1,
                date.day
            );
            setValue(name, jsDate);
        }
    }

    return (
        <Controller
            name="dob"
            control={control}
            render={({ field }) => (
                <DateInput
                    isInvalid={error ? true : false}
                    labelPlacement="outside"
                    label={label}
                    radius="sm"
                    size="lg"
                    isRequired
                    errorMessage={error}
                    value={field.value instanceof Date ? new CalendarDate(field.value.getFullYear(), field.value.getMonth() + 1, field.value.getDate()) : undefined}
                    onBlur={field.onBlur}
                    onChange={(calendarDate) => handleChange(calendarDate)}
                />
            )}
        />
    )
}

export default FormDate