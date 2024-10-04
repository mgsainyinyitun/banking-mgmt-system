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
            case 'T': return transaction.map(i => <Step label={i} />)
            default: return null;
        }
    }
    return (
        <Stepper activeStep={active}>
            {renderSteper()}
            {/* <Step label="Children Step 1" />
            <Step label="Children Step 2" />
            <Step label="Children Step 3" /> */}
        </Stepper>
    );
}

export default FormStepper