import React from 'react'
import ReactDOM from 'react-dom';
import Login from './page/login';
import Layout from './layout/Layout';
import './css/reset.css';
import './css/index.scss';
import './css/utilities.scss';

class Ctest extends React.Component{
    constructor(props){
        super(props);
        let a = 1;
        a = 34;
        console.log(a);
    }

    render(){
        return <div>hello 33ooo233322oo!</div>
    }
}


ReactDOM.render(<Layout />,document.getElementById("react-container"));
