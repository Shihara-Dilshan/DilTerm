import React, { Component } from "react";
import Input from './Input';

class Home extends Component<{}, { inputs: JSX.Element[] }> {

    constructor(props: Object) {
        super(props);
        this.state = { inputs: [<Input />] };
    }

    componentDidMount():void{
      localStorage.getItem("cwd") !== null ? localStorage.removeItem("cwd") : null;

      document.addEventListener( 'keyup' ,(e: KeyboardEvent):any => {
           if(e.key === "Enter"){
               let currentCount: JSX.Element[] = this.state.inputs;
               currentCount.push(<Input />);
               setTimeout( ():void => {
                   this.setState({inputs: currentCount});
               }, 100);
              
           }
       });
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

