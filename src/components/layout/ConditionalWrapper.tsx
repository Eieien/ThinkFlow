interface ConditionalWrapperProps{
    condition: boolean;
    wrapper: (children: React.ReactNode) => React.ReactElement;
    children: React.ReactNode;
}
export default function ConditionalWrapper({ condition, wrapper, children }: ConditionalWrapperProps ){
    
    return condition ? wrapper(children) : <>{children}</>;
} 
  
  