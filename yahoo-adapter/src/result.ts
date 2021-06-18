export interface IResultState {
  hidden: boolean;
  img: string;
  title: string;
  searchResults: {
    title: string;
    link: string;
    description: string;
  }[];
  disabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec: (ctx: any, me: IResultState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init: (ctx: any, me: IResultState) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: any;
}

export class Result {
  public el: HTMLElement;
  public state: IResultState;

  public static contextInsPoints = {
    WIDGETS: 'WIDGETS',
  }

  public mount(): void {
    if (!this.el) this._createElement();

    const { title, searchResults, hidden } = this.state;

    if (hidden) {
      this.el.innerHTML = '';
      return;
    } else {
      this.el.innerHTML = `
        <div class="compTitle mt-30">
          <h3 class="title" style="color: black; font-size: 20px; line-height: 1.3; margin-bottom: 10px;">
            Dapplet Search for ${title}
          </h3>
        </div>
        <div id="dapplet-search-widget" style="border: 1px solid #EB9EA4; border-radius: 8px; margin-bottom: 30px; padding: 0 28px 10px 28px;">
          ${searchResults
            .map(
              (searchResult) => `
              <div class="dd algo algo-sr relsrch-dapp Sr" style="margin-top: 20px;">
                <div class="compTitle options-toggle">
                  <h3 style="margin-bottom:-1px;" class="title ov-h">
                    <a
                      style="font-size: 20px; line-height: 1.3;"
                      class="ac-algo fz-l ac-21th lh-24"
                      href="${searchResult.link}"
                    >
                      ${searchResult.title}
                    </a>
                  </h3>
                </div>
                <div class="compText aAbs">
                    <p class="fz-ms lh-1_43x">${searchResult.description}</p>
                </div>
              </div>`,
            )
            .join('')}
        </div>
      `;
    }
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
    this.mount();
    this.state.init?.(this.state.ctx, this.state);
  }
}
