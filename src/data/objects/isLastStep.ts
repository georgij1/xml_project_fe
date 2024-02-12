export const isLastStep = (
    activeStep: any,
    totalSteps: any,
    steps: any
) => {
    return activeStep === totalSteps(steps) - 1;
};