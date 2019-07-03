import BirdImage from './bird/bird.png';
import BirdAudio from './bird/bird.wav';

import TacoImage from './taco/taco.png';
import TacoAudio from './taco/taco.wav';

const EXAMPLE_COLLAGE = {
  name: 'EXAMPLE',
  bpm: 120,
  pieces: [
    {
      id: 'bird',
      image: BirdImage,
      audio: BirdAudio,
      position: {
        x: 500,
        y: 500,
      },
    },
    {
      id: 'taco',
      image: TacoImage,
      audio: TacoAudio,
      position: {
        x: 200,
        y: 200,
      },
    }
  ],
};

export default EXAMPLE_COLLAGE;
