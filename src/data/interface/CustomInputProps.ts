export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref: React.ForwardedRef<HTMLInputElement>;
}