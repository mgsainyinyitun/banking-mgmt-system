import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@nextui-org/react';
import React, { useState } from 'react'

interface formPassProps {
    label: string,
    placeholder: string,
    name: string,
    error: string | undefined,
    register:any
}

const FormPassword = ({ label, placeholder, name, error,register }: formPassProps) => {
    // const [isVisible, setIsVisible] = useState(false);
    // const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Input
            {...register(name)}
            isInvalid={error ? true : false}
            name={name}
            radius='sm'
            size='lg'
            label={label}
            placeholder={placeholder}
            labelPlacement="outside"
            // endContent={
            //     <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
            //         {isVisible ? (
            //             <FontAwesomeIcon icon={faEyeSlash} className='text-sky-400' />
            //         ) : (
            //             <FontAwesomeIcon icon={faEye} className='text-sky-400' />
            //         )}
            //     </button>
            // }
            type="password"
            errorMessage={error}
        />
    )
}

export default FormPassword