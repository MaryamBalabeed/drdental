import React, { Component } from "react";
import App from "../App";

import "../App.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div
          id="carouselExample1"
          class="carousel slide z-depth-1-half"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                class="d-block w-100"
                src="https://www.atlantic-clinic.es/wp-content/uploads/2015/06/banner-atlantic-clinic-nueva-andalucia-marbella.jpg"
                alt="First slide"
              />
              <div className="border">
                
                <span className="overlay-text">About Us</span>
                 <p id = "" className="overlay-text-P-about-us">
          Dr Dental is a website the provides many clinics, as well as services,
          are providing essential healthcare. Our greatest vision is to allow
          people to reach our services for healthcare, hospitals to reserve an
          appointment and access to professional care.
        </p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="https://gpadental.com/wp-content/uploads/2018/11/gpa-dental-group-restoration-dentistry-slider.jpg"
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="https://static.showit.co/1200/NVyu1HUlT1i7YcsOdIg2Sg/84619/fmc-dental-clinic-background.png"
                alt="Third slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1005/https://www.pearlalignbraces.com/wp-content/uploads/2020/08/Dental-braces-in-Bangalore-Pearl-Align-orthodontic-clinic-teeth-alignment.png"
                alt="Fourth slide"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExample1"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExample1"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div class="circle circle-lg bg-secondary"></div>

        
       

        <h1 className="our-services">Our Services</h1>

        <div className="Cards">
          <div
            class="card"
            style={{
              width: "22rem",
              marginBottom: "15px",
              boxShadow: "10px 10px 5px grey",
            }}
          >
            <img
              class="card-img-top"
              src="https://www.oldtownsmiles.com/wp-content/uploads/sites/49/2016/07/teeth-whitening-300x201.jpg"
              alt="Card image cap"
            ></img>

            <div className="card-body" id="Services">
              <h5 className="card-title" id="Service-One">
                Teeth Whitening.
              </h5>
              <p className="card-text" id="P-One">
                Teeth whitening involves bleaching your teeth to make them
                lighter. It can't make your teeth brilliant white, but it can
                lighten the existing colour by several shades.
              </p>
            </div>
          </div>

          <div
            class="card"
            style={{
              width: "22rem",
              marginBottom: "15px",
              boxShadow: "10px 10px 5px grey",
            }}
          >
            <img
              class="card-img-top"
              src="https://i.pinimg.com/474x/95/b8/42/95b8422593e339b05bdd0b2b2fb3e186.jpg"
              alt="Card image cap"
            ></img>

            <div className="card-body" id="Services">
              <h5 className="card-title" id="Service-Two">
                Teeth Crown.
              </h5>
              <p className="card-text" id="P-Two">
                A crown is basically a cap for a damaged tooth. It can be made
                from a variety of materials, including metal or porcelain.
              </p>
            </div>
          </div>

          <div
            class="card"
            style={{
              width: "22rem",
              marginBottom: "15px",
              boxShadow: "10px 10px 5px grey",
            }}
          >
            <img
              class="card-img-top"
              src="https://previews.123rf.com/images/gamjai/gamjai1810/gamjai181000024/109792151-tooth-model-with-metal-wire-dental-braces-on-blue-background-.jpg"
              alt="Card image cap"
            ></img>

            <div className="card-body" id="Services">
              <h5 className="card-title" id="Service-Three">
                Teeth Orthodontic
              </h5>
              <p className="card-text" id="P-Three">
                Orthodontics is a specialty of dentistry that deals with the
                diagnosis, prevention, and correction of malpositioned teeth and
                jaws, and misaligned bite patterns. It can also focus on
                modifying facial growth, known as dentofacial orthopedics..
              </p>
            </div>
          </div>
        </div>

        <footer class="bg-light text-center text-lg-start">
          <div
            class="text-center p-3"
            style={{
              backgroundColor: "darkcyan",
              marginTop: "45px",
              marginBottom: "-25px",
            }}
          >
            <h4 className="contact-us">Contact Us</h4>
            <div className="Info">
              <span>Phone: 966123456789 </span>
              <span>Tele: 0116543218</span>
              <span>Email: DrDental@gmail.com</span>
            </div>
            <div className="social-icons">
              <ul className="Social-Icon">
                <li>
                  <i class="fab fa-facebook"></i>
                </li>
                <li>
                  <i class="fab fa-twitter"></i>
                </li>
                <li>
                  <i class="fab fa-instagram"></i>
                </li>
              </ul>
            </div>

            <a className="website-rights">© 2021 Copyright: Dr. Dental</a>
          </div>
        </footer>
      </div>
    );
  }
}
