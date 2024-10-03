import { DateInput } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form';
import { CalendarDate, parseDate } from "@internationalized/date";

interface formDateProps {
    control: any,
    error: string | undefined,
    setValue: (name: string, value: any) => void,
    name: string,
    label: string,
    value?: string,
    onChange?: () => void,
}

const FormDate = ({ control, error, setValue, name, label, value, onChange }: formDateProps) => {
    
    useEffect(() => {
        if (value) {
            const date = parseDate(value);
            setValue(name, date);
        }
    }, [value]);

    const handleChange = (date: any) => {

        if (date instanceof CalendarDate) {
            const jsDate = new Date(
                date.year,
                date.month - 1,
                date.day
            );
            setValue(name, jsDate);
            if (onChange) {
                onChange();
            }
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
                    // value={value ? parseDate(value) : undefined}
                    onBlur={field.onBlur}
                    onChange={(calendarDate) => handleChange(calendarDate)}
                    defaultValue={value ? parseDate(value) : undefined}
                />
            )}
        />
    )
}

export default FormDate