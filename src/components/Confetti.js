import React from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

const DARK_BLUE = '#0F1D2F';
const TEAL = '#004364';
const LIGHT_BLUE = '#0D99C6';
const LIGHT_BLUE_VAR = '#5FCAF9';
const YELLOW = '#FFE06D';
const WHITE = '#FEFEFE';

const colors = [DARK_BLUE, TEAL, LIGHT_BLUE, LIGHT_BLUE_VAR, YELLOW, WHITE];

export default class Confetti extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <>
        <ReactCanvasConfetti
          fire={this.props.fire}
          colors={colors}
          style={canvasStyles}
        />
      </>
    );
  }
}
