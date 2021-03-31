/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default class covid_summary_page extends Component {
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
        this.setState(
          {
            covid_singapore_data: response.data,
            raw_date: response.data.lastUpdatedAtApify,
          },
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <div id="covid_summary_page" className="container">
        <h1 className="page_title">Global COVID-19 Cases</h1>

        <div id="sgcases">
          <h3>
            COVID-19 case Summary in Singapore
          </h3>
          <h3>
          Last Updated{" "}on {" "} 
            {moment(this.state.covid_singapore_data.lastUpdatedAtApify).format("YYYY-MM-DD @ HH:mm")}
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
      </div>
    );
  }
}
