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
    this.animationInstance = null;
    this.props = props;
  }

//   makeShot = (particleRatio, opts) => {
//     this.animationInstance &&
//       this.animationInstance({
//         ...opts,
//         origin: { y: 0.7 },
//         particleCount: Math.floor(200 * particleRatio),
//       });
//   };

  //   fire = () => {
  // this.makeShot(0.25, {
  //   spread: 26,
  //   startVelocity: 55,
  // });

  // this.makeShot(0.2, {
  //   spread: 60,
  // });

  // this.makeShot(0.35, {
  //   spread: 100,
  //   decay: 0.91,
  //   scalar: 0.8,
  // });

  // this.makeShot(0.1, {
  //   spread: 120,
  //   startVelocity: 25,
  //   decay: 0.92,
  //   scalar: 1.2,
  // });

  // this.makeShot(0.1, {
  //   spread: 120,
  //   startVelocity: 45,
  // });
  //   }

  //   handlerFire = (e) => {
  //       console.log(e);
  //     this.fire();
  //   };

//   getInstance = (instance) => {
//     this.animationInstance = instance;
//   };

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
