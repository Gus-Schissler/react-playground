import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  square: {
    background: '#f2f4f5',
    border: '1px solid #0a0a0a',
    color: '#0b3662',
    'font-family': 'Saira, "sans-serif"',
    float: 'left',
    'font-size': '36px',
    'line-height': '34px',
    height: '64px',
    'margin-right': '-1px',
    'margin-top': '-1px',
    padding:' 0',
    'text-align': 'center',
    width: '64px',
  },
};

function Square(props) {
    return (
      <button className={props.classes.square} onClick={props.onClick}>
        {props.value}
      </button>
    );
}

export default withStyles(styles)(Square);