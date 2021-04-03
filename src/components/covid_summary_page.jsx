/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import ".././components/covid_summary_page.css";

class covid_summary_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      covid_global_summary: "",
      covid_singapore_data: "",
      raw_date: "",
      modified_last_updated_date: "",
    };
  }

  componentDidMount() {
    this.getCovidCaseSummary();
    this.getSingaporeCovidData();
    this.getPieChart();
  }

  getCovidCaseSummary() {
    return axios
      .get("https://api.covid19api.com/summary")
      .then((response) => {
        this.setState({
          covid_global_summary: response.data.Global,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSingaporeCovidData() {
    return axios
      .get(
        "https://api.apify.com/v2/key-value-stores/yaPbKe9e5Et61bl7W/records/LATEST?disableRedirect=true"
      )
      .then((response) => {
        this.setState({
          covid_singapore_data: response.data,
          raw_date: response.data.lastUpdatedAtApify,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPieChart() {
    echarts.use([
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      PieChart,
      CanvasRenderer,
    ]);

    var chartDom = document.getElementById("global_chart");
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: "Pie Chart",
        subtext: "纯属虚构",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }

  render() {
    return (
      <div id="covid_summary_page" className="">
  
        <section id="sgcase" className="hero-bg">
          <div className="first-page">
            <h3>COVID-19 case Summary in Singapore</h3>
            <h3>
              Last Updated on{" "}
              {moment(
                this.state.covid_singapore_data.lastUpdatedAtApify
              ).format("YYYY-MM-DD @ HH:mm")}
            </h3>
            <div id="firstrow" className="row">
              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Total Cases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_singapore_data.infected}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="secondrow" className="row">
              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Active Cases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_singapore_data.activeCases}
                    </th>
                  </tr>
                </tbody>
              </table>

              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Discharged</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_singapore_data.discharged}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="thirdrow" className="row">
              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Hospitalized Stable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_singapore_data.stableHospitalized}
                    </th>
                  </tr>
                </tbody>
              </table>

              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Hospitalized Critical</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_singapore_data.criticalHospitalized}
                    </th>
                  </tr>
                </tbody>
              </table>

              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Recovered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_singapore_data.recovered}
                    </th>
                  </tr>
                </tbody>
              </table>

              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Deceased</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_singapore_data.deceased}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section id="globalcase" className="hero-bg">
          <div className="second-page">
            <h3>Global Cases Summary</h3>
            <h3>
              Last Updated on{" "}
              {moment(this.state.covid_global_summary.date).format(
                "YYYY-MM-DD @ HH:mm"
              )}
            </h3>

            <div id="firstrow" className="row">
              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">World Wide Cases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_global_summary.TotalConfirmed}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="secondrow" className="row">
              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Total Deaths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_global_summary.TotalDeaths}
                    </th>
                  </tr>
                </tbody>
              </table>

              <table className="table col">
                <thead>
                  <tr>
                    <th scope="col">Total Recovered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {this.state.covid_global_summary.NewRecovered}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

            <canvas id="global_chart" height="300" width="400"></canvas>
          </div>
        </section>
      </div>
    );
  }
}

export default covid_summary_page;
