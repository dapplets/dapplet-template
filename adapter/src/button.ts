let stylesAdded = false;

const addStyles = (): void => {
  const styleTag: HTMLStyleElement = document.createElement('style');
  styleTag.innerHTML = `
    .dapplet-widget-menu {
      display: inline-block;
    }

    .dapplet-widget-results {
      display: block;
    }
  `;
  document.head.appendChild(styleTag);
};

export interface IButtonState {
  img: string;
  label: string;
  loading: boolean;
  disabled: boolean;
  hidden: boolean;
  tooltip: string;
  isActive: boolean;
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

  public static contextInsPoints = {
    MENU: 'MENU',
    SEARCH_RESULT: 'SEARCH_RESULT',
  }

  public mount(): void {
    if (!this.el) this._createElement();
    if (!stylesAdded) {
      addStyles();
      stylesAdded = true;
    }

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
