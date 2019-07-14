import React from 'react';

import EXAMPLE_COLLAGE from './_collages/EXAMPLE';

import Player from './Player/Player';
import Collage from './Collage/Collage';

import './App.css';

const App = () => {
  const [collage, updateCollage] = React.useState(EXAMPLE_COLLAGE);
  const [position, setPosition] = React.useState(0);
  return (
    <div className="App">
      <Player
        bpm={collage.bpm}
        pieces={collage.pieces}
        position={position}
        setPosition={setPosition}
      />
      <Collage
        collage={collage}
        position={position}
        updateCollage={updateCollage}
      />
    </div>
  );
}

export default App;
