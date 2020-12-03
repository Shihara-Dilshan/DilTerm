import React from 'react';
import styles from './Home.css';
//eslint-disable-next-line
const { exec } = require("child_process");


class Home extends React.Component {
    test = (e: React.MouseEvent<HTMLButtonElement>): void => {
        exec('ls -la'.trim(), (error, stdout, stderr) => console.log(stdout));
    };

    render(): JSX.Element {
        return (
            <div className={styles.container} data-tid="container">

            </div>
        );

    }

}

export default Home;

