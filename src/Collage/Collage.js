import React from 'react';
import { Stage, Sprite, Graphics } from '@inlet/react-pixi';

const Collage = ({ collage, position }) => (
  <div style={{ display: 'inline-block', margin: '10vh auto', border: '2px solid black' }}>
    <Stage width={1200} height={1200} options={{ backgroundColor: 0xffeeaa }}>
      <Graphics draw={g => {
        g.clear();

        g.lineStyle(4, 0xff0000, 1);
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
