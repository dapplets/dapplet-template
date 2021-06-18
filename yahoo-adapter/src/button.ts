let stylesAdded = false;

const addStyles = (): void => {
  const styleTag: HTMLStyleElement = document.createElement('style');
  styleTag.innerHTML = `
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

    const { img, label, hidden, tooltip, isActive } = this.state;

    if (hidden) {
      this.el.innerHTML = '';
      this.el.style.display = 'none';
      return;
    } else {
      this.el.style.removeProperty('display');
    }

    // LP: 2. implement the button HTML with label, image and tooltip for two insert points: MENU and SEARCH_RESULT
    const activeNavEl: HTMLElement = document.querySelector('.compList .active');
    if (this.insPointName === 'MENU') {
      this.el.innerHTML = `
        <div style="padding: 9px 12px 10px 12px;
          ${isActive ? 'border-bottom: 2px solid #1d2228; ' : 'border-bottom: none; '}
          display: block; cursor: pointer;"
          ${tooltip ? `title="${tooltip}"` : ''}
        >
          <img style="height: 14px; width: 14px; vertical-align: top;" src="${img}"/>
          <div style="display: inline-block; font-size: 13px; line-hight: 16px; font-weight: ${
            isActive ? 'bold' : 'normal'
          }; -webkit-tap-highlight-color: rgba(0,0,0,.10); color: #1d2228;">${label}</div>
        </div>
      `;
      activeNavEl.style.borderBottom = isActive ? 'none' : '2px solid #1d2228';
    } else if (
      this.insPointName === 'SEARCH_RESULT' ||
      this.insPointName === 'DAPPLET_SEARCH_RESULT'
    ) {
      this.el.innerHTML = `
        <div 
          style="display: flex; align-items: center; cursor: pointer;"
          ${tooltip ? `title="${tooltip}"` : ''}
        >
          <img style="margin-right: 12px; margin-bottom: 3px;" src="${img}"/>
          <div style="display: inline-block; font-size: 16px; color: #F5504A; font-weight: bold;">${label}</div>
        </div>
      `;
    }
    // LP end
  }

  public unmount(): void {
    this.el && this.el.remove();
  }

  private _createElement() {
    // LP: 3. add styles for the element depending on the insertion point
    if (this.insPointName === 'MENU') {
      this.el = document.createElement('li');
      this.el.classList.add('dapplet-widget-menu');
    } else if (
      this.insPointName === 'SEARCH_RESULT'
    ) {
      this.el = document.createElement('div');
      this.el.classList.add('dapplet-widget-results');
    }
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
