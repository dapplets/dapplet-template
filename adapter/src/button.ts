export interface IButtonState {
  img: string;
  label: string;
  loading: boolean;
  disabled: boolean;
  hidden: boolean;
  tooltip: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec: (ctx: any, me: IButtonState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init: (ctx: any, me: IButtonState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: any;
  insPointName: string;
}

export class Button {
  public el: HTMLElement;
  public state: IButtonState;
  insPointName: string;

  public mount(): void {
    if (!this.el) this._createElement();

    const { hidden } = this.state;

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

  public unmount(): void {
    this.el && this.el.remove();
  }

  private _createElement() {
    this.el = document.createElement('div');
    // LP: 3. add styles for the element depending on the insertion point

    // LP end
    this.el.addEventListener('click', () => {
      if (!this.state.disabled) {
        this.state.exec?.(this.state.ctx, this.state);
      }
    });
    this.mount();
    this.state.init?.(this.state.ctx, this.state);
  }
}
