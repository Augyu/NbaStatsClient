import React, { Component } from "react";
import axios from "axios";
import * as d3 from "d3";
import "./Dashboard.css";
require("dotenv").config();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { pts: [] };
  }
  render() {
    return (
      <div>
        <div ref="chart"></div>
      </div>
    );
  }
  componentDidMount() {
    let get_pts = [];
    axios
      .get("https://boiling-tor-58932.herokuapp.com/player")
      .then(res => {
        res.data.forEach(result => {
          get_pts.push(result.PTS);
        });
        this.setState({ pts: get_pts });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidUpdate() {
    this.drawChart();
  }
  drawChart() {
    const h = 500;
    const w = 800;
    const svg = d3
      .select("div")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#282c34")
      .style("border", "3px solid white");
    svg
      .selectAll("rect")
      .data(this.state.pts)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 30)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 10)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");
    svg.selectAll("text")
      .data(this.state.pts).enter()
      .append("text")
        .attr("x", (dataPoint, i) => i * 30)
        .attr("y", (dataPoint, i) => h - dataPoint * 10 - 10)
        .text(dataPoint => dataPoint)
        .style('fill', 'Orange')
  }
}

export default Dashboard;
