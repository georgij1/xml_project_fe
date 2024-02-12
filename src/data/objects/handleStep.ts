export const handleStep = (
    step: number,
    setActiveStep: any
) => () => {
    setActiveStep(step);
};