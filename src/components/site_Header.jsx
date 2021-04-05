/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from "react";
import ".././components/site_Header.css";

class site_Header extends Component {

  render() {
    return (
      <div id="site-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#sgcase">Singapore Cases</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#globalcase">Global Cases</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#resultsbycountry">Select Country</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>

    );
  }
}

export default site_Header;
