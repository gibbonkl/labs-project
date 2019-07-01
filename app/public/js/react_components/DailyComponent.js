import React, { Component } from 'react';

class DailyComponent extends Component {
  render() {
    return (
        <li>
            <div class="collapsible-header">
                <i class="material-icons">face</i>
                <span class="span-margin">{this.props.daily.user}</span>
                <i class="material-icons">event</i>
                <span class="span-margin align-right">{this.props.daily.data}</span>
            </div>
            <div class="collapsible-body grey lighten-3">
                <span>Ontem: {this.props.daily.corpo.ontem}</span><br></br>
                <span>Hoje: {this.props.daily.corpo.hoje}</span><br></br>
                <span>Impedimentos: {this.props.daily.corpo.impedimentos}</span>
            </div>
        </li>
    );
  }
}

module.exports = DailyComponent