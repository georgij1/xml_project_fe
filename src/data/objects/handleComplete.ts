export const handleComplete = (
    completed: any,
    activeStep: any,
    setActiveStep: any,
    setCompleted: any,
    handleNext: any,
    isLastStep: any,
    totalSteps: any,
    steps: any,
    allStepsCompleted: any,
    completedSteps: any
) => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext(isLastStep,
        activeStep,
        totalSteps,
        steps,
        allStepsCompleted,
        completedSteps,
        completed,
        setActiveStep
    );
};