import React from 'react';

const getActivePieceFromMouseEvent = (e, pieces) => {
  const { clientX, clientY, target } = e;
  const { x: parentX, y: parentY } = target.parentNode.getBoundingClientRect();
  const x = clientX - parentX;
  const y = clientY - parentY;
  const piece = pieces.find(piece => (
    x > piece.position.x && x < piece.position.x + piece.dimensions.width &&
    y > piece.position.y && y < piece.position.y + piece.dimensions.height
  ));
  if (!piece) return;
  return {
    id: piece.id,
    startingPosition: {
      x: piece.position.x,
      y: piece.position.y,
    },
    startingMousePosition: {
      x: clientX,
      y: clientY,
    },
  };
}

const updatePiece = (e, piece, activePiece) => {
  const xDistance = e.clientX - activePiece.startingMousePosition.x;
  const yDistance = e.clientY - activePiece.startingMousePosition.y;
  return {
    ...piece,
    position: {
      x: activePiece.startingPosition.x + xDistance,
      y: activePiece.startingPosition.y + yDistance,
    }
  };
}

const PieceMover = React.memo(({ collage, updateCollage }) => {
  const [activePiece, setActivePiece] = React.useState(null);
  return(
    <div
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      onMouseDown={e => {
        const activePiece = getActivePieceFromMouseEvent(e, collage.pieces);
        if (activePiece) setActivePiece(activePiece);
      }}
      onMouseMove={e => {
        if (activePiece) {
          updateCollage({
            ...collage,
            pieces: collage.pieces.map(piece => piece.id === activePiece.id ? updatePiece(e, piece, activePiece) : piece),
          })
        }
      }}
      onMouseUp={() => {
        setActivePiece(null);
      }}
    />
  );
})

export default PieceMover;