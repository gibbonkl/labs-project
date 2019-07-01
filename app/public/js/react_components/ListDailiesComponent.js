import React, { Component } from 'react';
let Daily = require('./DailyComponent')

class ListDailiesComponent extends Component{
    renderRow(daily){
        return (<Daily daily={daily}/>)
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

module.exports = ListDailiesComponent