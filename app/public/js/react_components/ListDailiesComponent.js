import React, { Component } from 'react';
import DailyComponent from './DailyComponent'

export default class ListDailiesComponent extends Component{
    renderRow(daily){
        return (<DailyComponent daily={daily}/>)
    }

    render(){
        let rows = this.props.dailies;

        return (
            <div>  
                {rows.map(this.renderRow)}    
            </div>
        )
    }
  }