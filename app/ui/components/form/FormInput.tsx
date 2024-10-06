import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@nextui-org/react'
import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface formInputProps<T extends FieldValues> {
    icon?: IconDefinition,
    type: string,
    label: string,
    placeholder?: string,
    iconColor?: string,
    isRequire?: boolean,
    name: Path<T>,
    error: string | undefined,
    register: UseFormRegister<T>,
    value?: string,
    onChange?: () => void,
}


const FormInput = <T extends FieldValues>({ type, label, placeholder, icon, iconColor = 'text-sky-400', isRequire = true, name, error, register, value, onChange }: formInputProps<T>) => {

    return (
        <Input
            {...register(name)}
            isInvalid={error ? true : false}
            name={name}
            isRequired={isRequire}
            radius='sm'
            size='lg'
            className=''
            type={type}
            label={label}
            placeholder={placeholder ? placeholder : ''}
            labelPlacement="outside"
            startContent={
                icon && <FontAwesomeIcon icon={icon} className={iconColor} />
            }
            errorMessage={error}
            defaultValue={value ? value : ''}
            onChange={onChange}
        />
    )
}

export default FormInput