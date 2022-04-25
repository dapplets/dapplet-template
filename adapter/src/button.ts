// LP: 1. Import dependencies
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
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
export class Button extends LitElement implements IButtonProps {
    // LP: 8. Stylize the widget by CSS
    public static override styles = css`
        .dapplet-widget-results {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .dapplet-widget-results > img {
            width: 20px;
            margin-right: 1em;
            margin-bottom: 3px;
        }
        .dapplet-widget-results > div {
            display: inline-block;
            font-size: 1.1em;
            color: #f5504a;
            font-weight: bold;
        }

        .dapplet-widget-results:hover {
            text-decoration: underline;
            text-decoration-color: #f5504a;
        }
        :host {
            border: 1px solid rgb(170, 170, 170);
            display: table;
            padding: 2px 10px;
            border-radius: 4px;
        }
    `;
    // LP end

    // LP: 3. Declare a map between contexts and insertion points
    public static contextInsPoints = {
        SEARCH_RESULT: 'SEARCH_RESULT',
    };
    // LP end

    // LP: 4. Implement IButtonProps interface
    @property() state; // required

    @property() ctx; // required

    @property() insPointName: string; // required

    @property() img: string;

    @property() label: string;

    @property() loading: boolean;

    @property() disabled: boolean;

    @property() hidden: boolean;

    @property() tooltip: string;

    @property() isActive: boolean;

    @property() exec: (ctx: any, me: IButtonProps) => void;

    @property() init: (ctx: any, me: IButtonProps) => void;
    // LP end

    // LP: 5. Add init callback
    connectedCallback() {
        super.connectedCallback();
        this.init?.(this.ctx, this.state);
    }
    // LP end

    // LP: 6. Add click handler function
    private _clickHandler(e) {
        this.exec?.(this.ctx, this.state);
        e.stopPropagation();
    }
    // LP end

    // LP: 7. Write HTML code of the widget
    override render() {
        if (this.hidden) return null;

        return html`
            <div
                @click=${this._clickHandler}
                class="dapplet-widget-results"
                title="${this.tooltip}"
            >
                <img src="${this.img}" />
                <div>${this.label}</div>
            </div>
        `;
    }
    // LP end
}
// LP end
