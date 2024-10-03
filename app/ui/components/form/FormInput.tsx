import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@nextui-org/react'
import React from 'react'

interface formInputProps {
    icon?: IconDefinition,
    type: string,
    label: string,
    placeholder?: string,
    iconColor?: string,
    isRequire?: boolean,
    name: string,
    error: string | undefined,
    register: any,
    value?: string,
    onChange?: (prm: any) => void,
}

const FormInput = ({ onChange, type, label, placeholder, icon, iconColor = 'text-sky-400', isRequire = true, name, error, register, value }: formInputProps) => {
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
            onChange={onChange ? onChange : null}
        />
    )
}

export default FormInput