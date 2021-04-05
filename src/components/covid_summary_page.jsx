/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as echarts from "echarts/core";
import { DataGrid } from "@material-ui/data-grid";

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
      all_country_data: [],
      modified_all_country_date: [],
      test: [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
      ],
      columns: [
        { field: "id", headerName: "ID", width: 100 },
        { field: "Country", headerName: "Country", width: 200 },
        { field: "TotalConfirmed", headerName: "Confirmed", width: 200 },
        { field: "TotalDeaths", headerName: "Deaths", width: 200 },
        { field: "TotalRecovered", headerName: "Recovered", width: 200 },
      ],
    };
  }

  componentDidMount() {
    this.getCovidCaseSummary();
    this.getSingaporeCovidData();
  }

  getCovidCaseSummary() {
    return axios
      .get("https://api.covid19api.com/summary")
      .then((response) => {
        this.setState({
          covid_global_summary: response.data.Global,
          all_country_data: response.data.Countries,
        });
        this.getPieChart();
        this.addIdtoArray();
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
        text: "Global Covid Pie Chart",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   orient: "vertical",
      //   left: "left",
      // },
      series: [
        {
          name: "",
          type: "pie",
          radius: "50%",
          data: [
            {
              value: this.state.covid_global_summary.TotalConfirmed,
              name: "Total Cases",
            },
            {
              value: this.state.covid_global_summary.TotalDeaths,
              name: "Total Deaths",
            },
            {
              value: this.state.covid_global_summary.TotalRecovered,
              name: "Total Recovered",
            },
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

  addIdtoArray() {
    let data = this.state.all_country_data;
    data.forEach((o, i) => (o.id = i + 1));

    this.setState({ modified_all_country_date: data });
    console.log(this.state.modified_all_country_date);
  }
  render() {
    return (
      <div id="covid_summary_page" className="">
        <section id="sgcase" className="hero-bg">
          <div className="first-page container">
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
          <div className="second-page container">
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
        <section id="resultsbycountry" className="herp-bg">
          <div className="third-page container">
            <h1>COVID Summary Table</h1>
            <div id="all-bookings-by-user-page" style={{ height: 400, width: '100%' }}>
                <DataGrid rows={this.state.modified_all_country_date} columns={this.state.columns} pageSize={10} checkboxSelection/>
                
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default covid_summary_page;
