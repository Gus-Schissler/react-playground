import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Components'
import Game from './Components/GameSystem';

export default class extends Component {
  render() {
    return <Fragment>
      <Header />
        <Game />
      <Footer />
    </Fragment>
  }
}