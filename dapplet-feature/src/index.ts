import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex16.svg';

@Injectable
export default class GoogleFeature {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  @Inject('example-google-adapter.dapplet-base.eth') public adapter: any;

  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      SEARCH_RESULT: (ctx) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Get data',
            tooltip: 'Show in the alert',
            img: EXAMPLE_IMG,
            exec: () => {
              const { title, link, description } = ctx;
              alert(`title: ${title}\nlink: ${link}\ndescription: ${description}`);
            },
          },
        }),
    });
  }
}
