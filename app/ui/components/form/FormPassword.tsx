import { Input } from '@nextui-org/react';
import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface formPassProps<T extends FieldValues> {
    label: string,
    placeholder: string,
    name: Path<T>,
    error: string | undefined,
    register: UseFormRegister<T>
}

const FormPassword = <T extends FieldValues>({ label, placeholder, name, error, register }: formPassProps<T>) => {
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