import React from 'react';

class Progress extends React.Component {
  render() {
    const { ongoingYear, completedYear } = this.props;

    const scale = 100 / 480;
    const lineWidth = 4 * scale;
    const radius = 40 / 2 * scale;
    const checkRadius = 24 / 2 * scale;
    const offset = 10;
    const sectionSpace = 60 * scale - radius * 2;

    const circleElement = (year = 0) => {
      let x = 0;

      switch (year) {
        case 1: x = offset + radius * 4 * 0; break;
        case 2: x = offset + radius * 4 * 1; break;
        case 3: x = offset + radius * 4 * 2; break;
        case 4: x = offset + radius * 4 * 3 + sectionSpace; break;
        case 5: x = offset + radius * 4 * 4 + sectionSpace; break;
        case 6: x = offset + radius * 4 * 5 + sectionSpace * 2; break;
      }

      return (
        <g>
          <circle cx={x} cy="10" r={radius - lineWidth / 2} strokeWidth={lineWidth} stroke="#000" fill="#fff" />
          {year <= ongoingYear && <circle cx={x} cy="10" r={checkRadius} stroke="none" fill="#0060a3" />}
          {year <= completedYear && (
            <g>
              <line x1={x - checkRadius * .4} y1={10} x2={x - checkRadius * .1} y2={10 + checkRadius * .3} strokeLinecap="square" stroke="#fff" strokeWidth="0.5" />
              <line x1={x - checkRadius * .1} y1={10 + checkRadius * .3} x2={x + checkRadius * .4} y2={10 - checkRadius * .4} strokeLinecap="square" stroke="#fff" strokeWidth="0.5" />
            </g>
          )}
        </g>
      )
    }

    return (
      <div className="profile-progress-wrapper">
        <svg width="100%" height="100%" viewBox="0 0 120 20">
          <rect x="10" y={10 - lineWidth / 2} width="90" height={lineWidth} />
          {circleElement(1)}
          {circleElement(2)}
          {circleElement(3)}
          <rect x={offset + radius * 4.5 * 2 + 30 * scale - lineWidth / 2} y={10 - radius} width={lineWidth} height={radius * 2} />
          {circleElement(4)}
          {circleElement(5)}
          <rect x={offset + radius * 7.5 * 2 + 90 * scale - lineWidth / 2} y={10 - radius} width={lineWidth} height={radius * 2} />
          {circleElement(6)}
        </svg>
      </div>
    );
  }
}

export default Progress;
