import React from 'react';
import axios from 'axios'
import urls from "../../apis/urls";
console.log(urls)

class DemoUI extends React.Component {
  render(){
    return 'DemoUI';
  }
  componentDidMount(){
    axios.get(urls.douban)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    })

    axios.get('/charles/myapi/todolist.json')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export default DemoUI;