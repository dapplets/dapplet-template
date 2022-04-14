// LP: 1. Import dependencies

// LP end

export interface IButtonProps {
    img: string;
    label: string;
    loading: boolean;
    disabled: boolean;
    hidden: boolean;
    tooltip: string;
    isActive: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exec: (ctx: any, me: IButtonProps) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init: (ctx: any, me: IButtonProps) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx: any;
    insPointName: string;
}

// LP: 2. Declare custom element class
export class Button {

    // LP: 8. Stylize the widget by CSS
    
    // LP end

    // LP: 3. Declare a map between contexts and insertion points
    
    // LP end

    // LP: 4. Implement IButtonProps interface
    
    // LP end

    // LP: 5. Add init callback
    
    // LP end

    // LP: 6. Add click handler function

    // LP end

    // LP: 7. Write HTML code of the widget
    
    // LP end
}
// LP end