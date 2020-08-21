import React, { Component } from "react";
import CollegeCard from "./components/CollegeCard/CollegeCard";
import collegeListRaw from "./assets/colleges.json";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      collegeList: [],
      from: 0,
      to: 10,
    };
  }

  componentWillMount() {
    this.loadData();
    // load more data before page ends
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.scrollingElement.scrollHeight - 150
      ) {
        this.loadMore();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
  }

  loadMore = () => {
    // increase the from and to value by 10
    const { from, to } = this.state;
    if (from < 40 && to < 50) {
      this.setState(
        (prevState) => ({
          from: prevState.from + 10,
          to: prevState.to + 10,
        }),
        this.loadData
      );
    }
  };

  loadData = () => {
    // append the next pair of college data to collegeList
    const { from, to } = this.state;
    let tempCollegeList = collegeListRaw.colleges.slice(from, to);
    this.setState((prevState) => ({
      collegeList: [...prevState.collegeList, ...tempCollegeList],
    }));
  };

  render() {
    const { collegeList } = this.state;

    let college = collegeList.map((item, index) => {
      return (
        <div key={index} className="college-card">
          <CollegeCard collegeInfo={item} />
        </div>
      );
    });

    return (
      <div>
        <p className="title">Colleges in North India</p>
        <div className="college-container">{college}</div>
      </div>
    );
  }
}

export default App;
