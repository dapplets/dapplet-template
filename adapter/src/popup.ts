// import CLOSE_ICON from './close_cross.svg';

export interface IPopupState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec?: (ctx: any, me: IPopupState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init?: (ctx: any, me: IPopupState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
  text?: string;
  link?: string;
  img?: string;
  closed?: boolean;
}

export class Popup {
  public el: HTMLElement;
  public state: IPopupState;
  public insPointName: string;

  public static contextInsPoints = {
    BODY: 'BODY',
  }

  public mount(): void {
    if (!this.el) this._createElement();
    // LP: 3. Implement the popup HTML with "text", "link", "img" and "closed".

    // LP end
  }

  public unmount(): void {
    this.el && this.el.remove();
  }

  private _createElement() {
    this.el = document.createElement('div');
    this.el.style.position = 'static';
    this.el.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('dapplet-widget-close-icon')) return;
      this.state.closed = true;
    });
    this.state.init?.(this.state.ctx, this.state);
  }
}
