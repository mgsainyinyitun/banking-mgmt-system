import { Stepper, Step } from 'react-form-stepper';



const transaction = [
    'Input',
    'Confirm',
    'Complete',
]

interface formStepperProps {
    active: number,
    type: string,
}

const FormStepper = ({ active, type }: formStepperProps) => {
    const renderSteper = () => {
        switch (type) {
            case 'T': return transaction.map(i => <Step key={i} label={i} />)
            default: return null;
        }
    }
    return (
        <Stepper activeStep={active}>
            {renderSteper()}
        </Stepper>
    );
}

export default FormStepper