import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex08.png';
// import GRAY_IMG from './icons/ex08-gray.png';
// import GOOGLE_IMG from './icons/ex08-quatro.png';
// import HI_GIF from './imgs/giphy.gif';

/* const searchResults = [
  {
    title: 'Types of Clouds | NOAA SciJinks - All About Weather',
    link: 'https://scijinks.gov/clouds/',
    description:
      'Mammatus clouds. Mammatus clouds are actually altocumulus, cirrus,\
      cumulonimbus, or other types of clouds that have these pouch-like shapes hanging \
      out of the bottom. The pouches are created when cold air within the cloud sinks down \
      toward the Earth. Weather prediction: Severe weather might be on its way!',
  },
  {
    title: 'Clouds—facts and information - Science',
    link: 'https://www.nationalgeographic.com/science/article/clouds-1',
    description:
      'Altostratus clouds may portend a storm. Nimbostratus clouds are thick \
      and dark and can produce both rain and snow. Low clouds fall into four divisions: \
      cumulus, stratus, cumulonimbus, and ...',
  },
  {
    title: 'Types of Clouds | Live Science',
    link: 'https://www.livescience.com/29436-clouds.html',
    description:
      'Clouds of great vertical development: These are the cumulonimbus clouds, \
      often called a thunderhead because torrential rain, vivid lightning and thunder come \
      from it. The tops of such clouds may ...',
  },
]; */

@Injectable
export default class GoogleFeature {
  // LP: insert the correct adapter
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  @Inject('') public adapter: any; // LP end

  activate(): void {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      MENU: () =>
        button({
          initial: 'RESULTS',
          // LP: 5. implement two states:
          //          a. replace search results with HI_GIF
          //          b. return to default results

          // LP end
        }),
      SEARCH_RESULT: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Get data',
            tooltip: 'Show in the alert',
            img: EXAMPLE_IMG,
            // LP: 4. add the execution - allert with search results: title, link, description

            // LP end
          },
        }),
      // LP: 9. Add "result" to WIDGETS.

      // LP end
      // LP: 10. Implement the insertion of buttons into our widget.

      // LP end
    });
  }
}
