import React, { Component } from 'react';
const { remote } = require('electron')
const { app,BrowserWindow } = remote

const { exec, execSync } = require('child_process');

class Input extends Component<{}, { command: string, results: string[], currentWD: any, systemCommands: string[] }> {
  constructor(props: Object) {
    super(props);
    this.state = {
      command: '',
      results: [],
      currentWD: localStorage.getItem('cwd') === null ? '/' : localStorage.getItem('cwd'),
      systemCommands: ['help',]
    };  
  }

  execute = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;
    this.setState({ command: inputValue });
  };

  finalFunc = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const options: Object = {
      cwd: localStorage.getItem('cwd') === null ? this.state.currentWD : localStorage.getItem('cwd'),
      env: null,
      encoding: 'utf-8',
      timeout: 0,
      maxBuffer: 200 * 1024,
      killSignal: 'SIGTERM'
    };
    
    if(e.key === "Enter" && this.state.command === "help")
    {
        exec("echo classified23 | sudo chmod +x help.sh | ./help.sh", (error, stdout, stderr) => {
            let view: string[] = stdout.split(`\n`);
            console.log(view)
            this.setState({ results: view });
        });
        return;
    }

    
    if(e.key === "Enter" && this.state.command === "about")
    {
        exec("echo classified23 | sudo chmod +x about.sh | ./about.sh", (error, stdout, stderr) => {
            let view: string[] = stdout.split(`\n`);
            console.log(view)
            this.setState({ results: view });
        });
        return;
    }

    if(e.key === "Enter" && this.state.command === "exit")
    {
        app.quit();
        return;
    }


    if ((e.key === "Enter" && this.state.command.includes('exec')) || (e.key === "Enter" && this.state.command.includes('cd'))) {
      e.target.setAttribute("disabled", true);
      this.execAsync(this.state.command, options);


    } else if (e.key === "Enter" && !this.state.command.includes('exec')) {
      e.target.setAttribute("disabled", true);
      this.execSync(this.state.command, options);

    }




  };

  execSync = (command: string, options: object): void => {
    if (command.length !== 0 && command !== 'clear' && !command.includes('history')) {
      try {
        const data = execSync(`${command}`.trim(), options);
        let view: string[] = data.split(`\n`);
        this.setState({ results: view });

      } catch (err) {
        let view: string[] = err.toString().split(`\n`);
        this.setState({ results: view });
        console.log(err)
      }


    }
  }

  execAsync = (command: string, options: object): void => {
    exec(`${command}`.trim(), options, (error: any, stdout: string, stderr: string) => {
      if (stdout) {
        let view: string[] = stdout.split(`\n`);
        this.setState({ results: view });
      } else if (stderr) {
        let view: string[] = [];
        view.push(stderr);
        this.setState({ results: view });
      } else if (error) {
        let view: string[] = [];
        view.push(stderr);
        this.setState({ results: view });
      }
      
      let regexForCd: object = /^[c][d][\s][../]{1,}$/;

      if(regexForCd.test(String(`${this.state.command}`).toLowerCase())){
          let modifiedArray: string[] = `${this.state.command}`.split("/");
          modifiedArray = modifiedArray.filter(item => item.includes(".."));
          
          let local:any = localStorage.getItem("cwd");
          local = local.split("/")

          
          if(local.filter( item => item !== "").length >= modifiedArray.length){
            for(let  i=0; i < modifiedArray.length; i++){
             let letPopValue:string = "/"+ local.pop();
             let newValue = localStorage.getItem("cwd").replace(letPopValue, "");
             localStorage.setItem("cwd", newValue)
             }
          }else{
             this.setState({ currentWD: "/" });
             localStorage.setItem("cwd", "/");
          }
          
          return;
      }


      if (command === "cd ~" || command === "cd") {
        this.setState({ currentWD: "/" });
        localStorage.setItem("cwd", "/");
        return;
      }
      
      
     

      if (command.includes("cd")) {
        let CCommand: String[] = command.split(" ");
        CCommand.shift();

        let currentCWD = this.state.currentWD;
        console.log(currentCWD);
        this.setState({ currentWD: `${currentCWD}/${CCommand[0]}` });
        localStorage.setItem("cwd", this.state.currentWD);
        return;
      }
    });
  }

  render(): JSX.Element {
    const { command, results } = this.state;

    return (
      <div>
        <div style={this.styleLine()}>

          <h3 style={{ color: '#00c853' }}>root@DilTerm<span style={{ color: 'white' }}>:</span><span
            style={{ color: '#03a9f4' }}>{localStorage.getItem('cwd') !== null ? localStorage.getItem('cwd')?.replace('/', '') : '~'}</span><span
              style={{ color: 'white' }}>$</span></h3>
          {' '}<input autoFocus style={{
            height: '2em',
            fontSize: '15px',
            marginLeft: '1%',
            width: '90%',
            color: 'white',
            backgroundColor: '#212121',
            border: 'none'
          }} type="text" onChange={this.execute} value={command} onKeyUp={this.finalFunc} />
        </div>
        {results.map((result, index) => <h4 key={index}>{result}</h4>)}

      </div>
    );

  }


  styleLine = (): Object => {
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      overFlow: 'auto',
      marginBottom: '-5px'
    };
  };

}

export default Input;

