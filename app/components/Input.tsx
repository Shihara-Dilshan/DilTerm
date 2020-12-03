import React, { Component } from "react";
const { exec } = require("child_process");


class Input extends Component<{}, { command: String, results: String[] }> {

    constructor(props: Object) {
        super(props);
        this.state = { command: "", results: [] };
    }

    test = (e: React.MouseEvent<HTMLButtonElement>): void => {


    };

    execute = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let inputValue = e.target.value;
        this.setState({ command: inputValue });
    };

    finalFunc = (e: React.KeyboardEvent<FormControl>): void => {
        if (e.key === "Enter") {
            if (this.state.command.length !== 0) {
                exec(`${this.state.command}`.trim(), (error, stdout, stderr) => {
                    if(stdout){
                       let view: Array = stdout.split(`\n`);
                       this.setState({ results: view });                    
                    }else if(stderr){
                       let view: Array = [];
                       view.push(stderr);
                       this.setState({ results: view });    
                    }else if(error){
                       let view: Array = [];
                       view.push(stderr);
                       this.setState({ results: view });  
                    }
                    
                });

            }
        }
    }

    styleLine = (): Object => {
        return {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overFlow: "auto",
            marginBottom: "-5px",
        }
    }

    render(): JSX.Element {
        const { command, results } = this.state;
        return (
            <div>
                <div style={this.styleLine()}>

                    <h3 style={{ color: "red" }}>root@dilbash:~# </h3>
                    {" "}<input autoFocus style={{ height: "2em", fontSize: "15px", marginLeft: "1%", width: "90%", color: "white", backgroundColor: "black", outLine: "none", border: "none" }} type="text" onChange={this.execute} value={command} onKeyUp={this.finalFunc} />
                </div>
                {results.map((result, index) => <h4 key={index}>{result}</h4>)}
		
            </div>
        );

    }

}

export default Input;

