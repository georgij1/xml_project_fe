export const handleNext = (
    isLastStep: any,
    activeStep: any,
    totalSteps: any,
    steps: any,
    allStepsCompleted: any,
    completedSteps: any,
    completed: any,
    setActiveStep: any
) => {
    const newActiveStep = isLastStep(activeStep, totalSteps, steps) && !allStepsCompleted(completedSteps, completed, totalSteps, steps) ? steps.findIndex((step:any, i:any) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
};