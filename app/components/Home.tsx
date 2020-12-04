import React, { Component } from "react";
import styles from './Home.css';
const { exec } = require("child_process");

import Input from './Input';


class Home extends Component<{}, { inputs: JSX.Element[] }> {

    constructor(props: Object) {
        super(props);
        this.state = { inputs: [<Input />] };
    }
    
    componentDidMount():void{
       document.addEventListener( 'keyup' ,(e) => {
           if(e.key === "Enter"){
               let currentCount: JSX.Element[] = this.state.inputs;
               currentCount.push(<Input />);
               setTimeout( ():void => {
                   this.setState({inputs: currentCount});
               }, 100);
              
           }
       });
    
    }

    test = (e: React.MouseEvent<HTMLButtonElement>): void => {


    };

    execute = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let inputValue = e.target.value;
      
    };

    finalFunc = (e: React.KeyboardEvent<FormControl>): void => {
        if (e.key === "Enter") {
          
        }
    }

    render(): JSX.Element {
        const { inputs } = this.state;
        return (
            <React.Fragment>
                {inputs.map( input_Feild => input_Feild )}
                
		
            </React.Fragment>
        );

    }

}

export default Home;

