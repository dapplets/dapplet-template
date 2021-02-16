export interface IButtonState {
    img: string;
    label: string;
    loading: boolean;
    disabled: boolean;
    hidden: boolean;
    tooltip: string;
    exec: (ctx: any, me: IButtonState) => void;
    init: (ctx: any, me: IButtonState) => void;
    ctx: any;
    insPointName: string;
}

export class Button {
    public el: HTMLElement;
    public state: IButtonState;
    insPointName: string;

    public mount() {
        if (!this.el) this._createElement();

        const { img, label, hidden, tooltip } = this.state;

        if (hidden) {
            this.el.innerHTML = '';
            this.el.style.display = 'none';
            return;
        } else {
            this.el.style.removeProperty('display');
        }

        // LP: 2. implement the button HTML with label, image and tooltip for two insert points: MENU and SEARCH_RESULT

        // LP end
    }

    public unmount() {
        this.el && this.el.remove();
    }

    private _createElement() {
        this.el = document.createElement('div');
        // LP: 3. add styles for the element depending on the insertion point

        // LP end
        this.el.addEventListener('click', e => {
            if (!this.state.disabled) {
                this.state.exec?.(this.state.ctx, this.state);
            }
        });
        this.mount();
        this.state.init?.(this.state.ctx, this.state);
    }
}
