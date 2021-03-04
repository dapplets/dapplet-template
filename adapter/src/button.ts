export interface IButtonState {
  img?: string;
  disabled?: boolean;
  tooltip?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec?: (ctx: any, me: IButtonState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init?: (ctx: any, me: IButtonState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
}

export class Button {
  public el: HTMLElement;
  public state: IButtonState;
  public insPointName: string;

  public static contextInsPoints = {
    BODY: 'BODY',
  }

  public mount(): void {
    if (!this.el) this._createElement();
    // LP: 2. implement the button HTML with "image" and "tooltip".

    // LP end
  }

  public unmount(): void {
    this.el && this.el.remove();
  }

  private _createElement() {
    this.el = document.createElement('div');
    this.el.addEventListener('click', () => {
      if (!this.state.disabled) {
        this.state.exec?.(this.state.ctx, this.state);
      }
    });
    this.state.init?.(this.state.ctx, this.state);
  }
}
