export const allStepsCompleted = (
    completedSteps: any,
    completed: any,
    totalSteps: any,
    steps: any
) => {
    return completedSteps(completed) === totalSteps(steps);
};