import React from 'react';
import  {LocalShipping,LibraryAddCheck,AccountBalance} from "@mui/icons-material";
import {Stepper, Step,Typography ,StepLabel } from '@mui/material';
const CheckoutSteps = ({activeStep}) => {
    const steps =[
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShipping />
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheck />
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalance />
        }
    ]
  return (
    <div>
        <Stepper alternateLabel activeStep={activeStep} style={{boxSizing:"border-box"}}>
            {steps.map((item,index)=>(
                <Step
                
                key={index}
                active ={activeStep === index ? true:false}
                completed = {activeStep >= index ? true:false}
                >
                <StepLabel
                icon={item.icon}
                style={{
                    color:activeStep >= index ? "tomato":"rgba(0,0,0,0.45)"
                }}
                >
                    {item.label}
                </StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
  )
}

export default CheckoutSteps