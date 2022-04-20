import CLOSE_ICON from './close_cross.svg';

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
  };

  public mount(): void {
    if (!this.el) this._createElement();
    // LP: 3. Implement the popup HTML with "text", "link", "img" and "closed".
    const { text, link, img, closed } = this.state;
    const htmlString = `
      <style>
        .dapplet-widget-basic-container {
          position: absolute;
          overflow-wrap: break-word;
          width: 380px;
          min-height: 60px;
          top: 80px;
          left: 50%;
          margin-left: -212px;
          padding: 20px;
          background-color: #fff;
          color: #d10019;
          border: 2px solid #d10019;
          border-radius: 15px;
          text-align: center;
          box-shadow: 2px 2px 3px #999;
          box-sizing: content-box;
          font-size: 19px;
          font-weight: 600;
          font-family: system-ui, -apple-system, sans-serif, BlinkMacSystemFont, Roboto, Ubuntu;
          z-index: 9998;
        }
        .dapplet-widget-close {
          position: initial;
        }
        .dapplet-widget-close-icon {
          width: 18px;
          height: 18px;
          position: absolute;
          right: 12px;
          top: 12px;
          cursor: pointer;
        }
        .dapplet-widget-mascot-img {
          position: initial;
        }
        .dapplet-widget-mascot-img img {
          width: 18px;
          height: 18px;
          position: absolute;
          left: 12px;
          top: 12px;
          cursor: pointer;
        }
        .dapplet-widget-basic-container a {
          text-decoration: none;
          color: #d10019;
        }
        .dapplet-widget-basic-container a:active {
          text-decoration: none;
          color: #d10019;
        }
        .dapplet-widget-basic-container a:visited {
          text-decoration: none;
          color: #d10019;
        }
        .displayed {
          display: block;
        }
        .no-displayed {
          display: none;
        }
      </style>
      <div class='dapplet-widget-basic-container ${closed ? 'no-displayed' : 'displayed'} '>  
        <div class='dapplet-widget-close'>
          <img src="${CLOSE_ICON}" class='dapplet-widget-close-icon' alt='close icon'>
        </div>
        <div class='dapplet-widget-mascot-img'>
          <img src='${img}' alt='CLOSE'>
        </div>
        <div>
          <a href='${link}' target='_blank'>${text}</a>
        </div>
      </div>
    `;
    this.el.innerHTML = htmlString;
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
