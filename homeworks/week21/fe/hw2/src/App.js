import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './style.css';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const Container = styled.ul`
  margin: 0 auto;
  width: 651px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Cells = styled.li`
  width: 5.263%;
  height:34.2px;
  border: 1px solid #afafaf;
  text-align: center;
  line-height: 36px;
`;

const Center = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 30px;
  line-height: 80px;
`;

const ResetBtn = styled.button`
  height: 30px;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 20px 1em;
  padding: 0.25em 1em;
  transition: 0.3s all ease-out;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

function createGrids() {
  let grids = [];

  for (let row = 0; row < 19; row += 1) {
    grids = [...grids, Array(19).fill(0)];
  }
  return grids;
}

const App = () => {
  const [grids, setGrids] = useState({ cells: createGrids(), player: 1, winner: 0 });
  const { cells, player, winner } = grids;

  const moveAPiece = ([yIdx, xIdx]) => {
    if (winner !== 0) return;
    if (cells[yIdx][xIdx] !== 0) return;
    cells[yIdx][xIdx] = grids.player;
    setGrids({ ...grids, player: -player });
  };

  const reset = () => {
    setGrids({ cells: createGrids(), player: 1, winner: 0 });
  };

  const toSynbol = (thePlayer) => {
    switch (thePlayer) {
      case 0: return '';
      case 1: return '○';
      case -1: return '●';
      default:
        break;
    }
  };

  const checkLine = (y, yOper, yMax, x, xOper, xMax, xMin = -1) => {
    let coordinates = Array(5).fill({ y, x });

    if (yOper === '++') {
      coordinates = coordinates.map(({ y, x }, idx) => ({ y: y + idx, x }));
    }

    if (xOper === '++') {
      coordinates = coordinates.map(({ y, x }, idx) => ({ y, x: x + idx }));
    }

    if (xOper === '--') {
      coordinates = coordinates.map(({ y, x }, idx) => ({ y, x: x - idx }));
    }

    const count = coordinates.reduce((acc, { y, x }) => {
      if (y < yMax && x < xMax && x > xMin) {
        return acc + cells[y][x];
      }
      return 0;
    }, 0);

    if (count === 5 || count === -5) return count / 5;
    return 0;
  };

  const getWinner = () => {
    for (let y = 0; y < cells.length; y += 1) {
      for (let x = 0; x < cells[y].length; x += 1) {
        if (cells[y][x] !== 0) {
          const xLine = checkLine(y, '', 19, x, '++', 15); // 橫線
          const yLine = checkLine(y, '++', 15, x, '', 19); // 直線
          const backslash = checkLine(y, '++', 15, x, '++', 15); // 左上-右下
          const slash = checkLine(y, '++', 15, x, '--', 19, 3); // 右上-左下
          const win = xLine + yLine + backslash + slash;
          if (win) return win;
        }
      }
    }
    return 0;
  };

  useEffect(() => {
    setGrids({ ...grids, winner: getWinner() });
  }, [getWinner()]);

  return (
    <Wrapper>
      <Container>
        { cells.map((yLine, yIdx) => (
          yLine.map((xLine, xIdx) => (
            <Cells key={xIdx} onClick={() => moveAPiece([yIdx, xIdx])}>
              { toSynbol(xLine) }
            </Cells>
          ))
        )) }
      </Container>
      <Container>
        <Center>
          { !winner && `現在輪到： ${toSynbol(player)} 玩家` }
          { winner !== 0 && `本局贏家： ${toSynbol(winner)}`}
          <ResetBtn onClick={reset}>Reset</ResetBtn>
        </Center>
      </Container>
    </Wrapper>
  );
};

export default App;
