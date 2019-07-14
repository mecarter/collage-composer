import React from 'react';
import { Stage, Sprite, Graphics } from '@inlet/react-pixi';
import PieceMover from './PieceMover/PieceMover';

const Collage = ({ collage, position, updateCollage }) => (
  <div style={{ position: 'relative', display: 'inline-block', margin: '10vh auto', border: '2px solid black' }}>
    <PieceMover collage={collage} updateCollage={updateCollage} />
    <Stage width={1200} height={1200} options={{ backgroundColor: 0xaaeeff }}>
      <Graphics draw={g => {
        g.clear();

        g.lineStyle(4, 0xccaa88, 1);
        g.moveTo(0, position);
        g.lineTo(1200, position);
        g.endFill();
      }} />
      {collage.pieces.map(piece => (
        <Sprite key={piece.id} image={piece.image} x={piece.position.x} y={piece.position.y} />
      ))}
    </Stage>
  </div>
);

export default Collage;
