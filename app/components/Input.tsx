import React, { Component } from "react";
const { exec } = require("child_process");

class Input extends Component<{}, { command: String, results: String[], currentWD: String }> {

    constructor(props: Object) {
        super(props);
        this.state = { command: "", results: [], currentWD: localStorage.getItem("cwd") === null ? "/" : localStorage.getItem("cwd") };
    }

    test = (e: React.MouseEvent<HTMLButtonElement>): void => {


    };

    execute = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let inputValue = e.target.value;
        this.setState({ command: inputValue });
    };

    finalFunc = (e: React.KeyboardEvent<FormControl>): void => {

        const options: Object = {
            cwd: localStorage.getItem("cwd") === null ? this.state.currentWD : localStorage.getItem("cwd"),
            env: null,
            encording: 'utf-8',
            timeout: 0,
            maxBuffer: 200 * 1024,
            killSignal: 'SIGTERM'

        };


        if (e.key === "Enter") {
            e.target.setAttribute("disabled", true);
            
            //exit command
            if(this.state.command === "exit"){
                
                return;
            }
            
            

            if (this.state.command.length !== 0 && this.state.command !== "clear" && !this.state.command.includes("history")) {
                exec(`${this.state.command}`.trim(), options, (error, stdout, stderr) => {
                    if (stdout) {
                        let view: Array = stdout.split(`\n`);
                        this.setState({ results: view });
                        return;
                    } else if (stderr) {
                        let view: Array = [];
                        view.push(stderr);
                        this.setState({ results: view });
                        return;
                    } else if (error) {
                        let view: Array = [];
                        view.push(stderr);
                        this.setState({ results: view });
                        return;
                    }


                    if (this.state.command === "cd ~" || this.state.command === "cd") {
                        this.setState({ currentWD: "/" });
                        localStorage.setItem("cwd", "/");
                        return;
                    }

                    if (this.state.command.includes("cd")) {
                        let CCommand: String[] = this.state.command.split(" ");
                        CCommand.shift();

                        let currentCWD = this.state.currentWD;
                        console.log(currentCWD);
                        this.setState({ currentWD: `${currentCWD}/${CCommand[0]}` });
                        localStorage.setItem("cwd", this.state.currentWD);

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

                    <h3 style={{ color: "#00c853" }}>root@dilbash<span style={{ color: "white" }}>:</span><span style={{ color: "#03a9f4" }}>{localStorage.getItem("cwd") !== null ? localStorage.getItem("cwd").replace("/", "") : "~"}</span><span style={{ color: "white" }}>$</span> </h3>
                    {" "}<input autoFocus style={{ height: "2em", fontSize: "15px", marginLeft: "1%", width: "90%", color: "white", backgroundColor: "#212121", outLine: "none", border: "none" }} type="text" onChange={this.execute} value={command} onKeyUp={this.finalFunc} />
                </div>
                {results.map((result, index) => <h4 key={index}>{result}</h4>)}

            </div>
        );

    }

}

export default Input;

