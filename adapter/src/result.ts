const searchResults = [
    {
        title: 'Types of Clouds | NOAA SciJinks - All About Weather',
        link: 'https://scijinks.gov/clouds/',
        description: 'Mammatus clouds. Mammatus clouds are actually altocumulus, cirrus,\
        cumulonimbus, or other types of clouds that have these pouch-like shapes hanging \
        out of the bottom. The pouches are created when cold air within the cloud sinks down \
        toward the Earth. Weather prediction: Severe weather might be on its way!',
    },
    {
        title: 'Clouds—facts and information - Science',
        link: 'https://www.nationalgeographic.com/science/article/clouds-1',
        description: 'Altostratus clouds may portend a storm. Nimbostratus clouds are thick \
        and dark and can produce both rain and snow. Low clouds fall into four divisions: \
        cumulus, stratus, cumulonimbus, and ...',
    },
    {
        title: 'Types of Clouds | Live Science',
        link: 'https://www.livescience.com/29436-clouds.html',
        description: 'Clouds of great vertical development: These are the cumulonimbus clouds, \
        often called a thunderhead because torrential rain, vivid lightning and thunder come \
        from it. The tops of such clouds may ...',
    }
];

export interface IResultState {
    hidden: boolean;
    img: string;
    title: string;
    disabled: boolean;
    exec: (ctx: any, me: IResultState) => void;
    init: (ctx: any, me: IResultState) => void;
    ctx: any;
}

export class Result {
    public el: HTMLElement;
    public state: IResultState;

    public mount() {
        if (!this.el) this._createElement();

        const { img, title, hidden } = this.state;

        if (hidden) {
            this.el.innerHTML = '';
            return;
        } else {
            this.el.innerHTML = `
                <div class="e2BEnf U7izfe mfMhoc">
                    <title-with-lhs-icon>
                        <div class="iv236">
                            <span class="iJddsb" style="height:20px;width:20px">
                                <img src="${img}" alt="image for title">
                            </span>
                        </div>
                        <div class="iJ1Kvb">
                            <h3 class="GmE3X" aria-level="2" role="heading">Dapplet Search for ${title}</h3>
                        </div>
                    </title-with-lhs-icon>
                </div>
                ${searchResults.map((searchResult) => `
                    <div class="g">
                        <h2 class="Uo8X3b">Web results</h2>
                        <div class="tF2Cxc">
                            <div class="yuRUbf">
                                <a href="${searchResult.link}">
                                    <h3 class="LC20lb DKV0Md"><span>${searchResult.title}</span></h3>
                                </a>
                            </div>
                            <div class="IsZvec">
                                <div><span class="aCOpRe">${searchResult.description}</span></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            `;
        }
    }

    public unmount() {
        this.el && this.el.remove();
    }

    private _createElement() {
        this.el = document.createElement('div');
        this.el.style.border = '1px solid #EB9EA4';
        this.el.style.borderRadius = '8px';
        this.el.style.marginBottom = '30px';
        this.el.style.padding = '28px 0 10px 28px';
        this.el.addEventListener("click", e => {
            if (!this.state.disabled) {
                this.state.exec?.(this.state.ctx, this.state);
            }
        });
        this.mount();
        this.state.init?.(this.state.ctx, this.state);
    }
}