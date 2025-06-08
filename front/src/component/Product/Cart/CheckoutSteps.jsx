import React,{useState,useEffect} from 'react';
import { LocalShipping, LibraryAddCheck, AccountBalance } from '@mui/icons-material';
import { Stepper, Step, Typography, StepLabel } from '@mui/material';
import './steps.scss';
const CheckoutSteps = ({ activeStep }) => {
    const [FlexColoumn, setFlexColoumn] = useState(false)
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />,
        },
    ];
    const [flexColumn, setFlexColumn] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setFlexColumn(window.innerWidth <= 659);
        };

        // Initial check on mount
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
              <Stepper alternatelabel="true" activeStep={activeStep} style={{ boxSizing: 'border-box', display: flexColumn ? 'column' : 'row' ,WebkitFlexDirection:flexColumn?"column":"row",gap:flexColumn?"20px":'' }}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index}
                        completed={activeStep >= index}
                    >
                        <StepLabel
                            icon={item.icon}
                            style={{
                                color: activeStep >= index ? 'tomato' : 'rgba(0,0,0,0.45)',
                            }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default CheckoutSteps;
