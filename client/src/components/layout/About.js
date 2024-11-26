import React, { Fragment } from "react";

const about = () => {
  return (
    <Fragment>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Catamaran:wght@500&family=Old+Standard+TT:wght@700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <header className="header">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-md-12 text-center">
              <h1>
                <strong>Welcome to Modern PowerTools Bus Travels</strong>
              </h1>
              <p>
                Experience the future of travel with Modern Powertools Bus
                Travels. We are committed to providing safe, comfortable, and
                reliable transportation for our passengers. Our fleet of modern
                buses and experienced drivers ensure a smooth and enjoyable
                journey. Whether you're traveling for business or pleasure, we
                have the perfect solution for your needs. Book your trip today
                and discover the difference!
              </p>
              <button className="btn btn-primary">Start Connecting !</button>
            </div>
          </div>
        </div>
      </header>
      <section className="message py-5">
        <div className="container text-center">
          <h1>We've got what you need!</h1>
          <p>
            Flexible Booking Options: Mention the different booking options
            available, such as online booking and phone reservations.
          </p>
          <button className="btn btn-primary">Check it out!</button>
        </div>
      </section>
      <section className="services">
        <div className="container text-center1 py-5">
          <h1>About our services</h1>

          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <i className="fa fa-bar-chart myicon"></i>
                  <h1>Become a Travel Agent</h1>
                  <p>
                    Requirements and Qualifications: Outline the requirements
                    and qualifications needed to become a travel agent, such as
                    completing a travel agent certification course or having
                    relevant experience.
                  </p>
                  <button
                    className="btn btn-primary"
                    href="bus-business.herokuapp.com"
                  >
                    Visit Site
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <i className="fa fa-bell-o myicon"></i>
                  <h1>Best Explanation</h1>
                  <p>
                    Modern Powertools Bus Travels is the leading provider of bus
                    transportation services in the region. We offer a wide range
                    of services, including bus rentals, charter services, and
                    tour packages. Our modern fleet of buses, experienced
                    drivers, and commitment to safety ensure a comfortable and
                    enjoyable journey for our passengers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <i className="fa fa-braille myicon"></i>
                  <h1>Best Explanation</h1>
                  <p>
                    Modern Powertools Bus Travels is the leading provider of bus
                    transportation services in the region. We offer a wide range
                    of services, including bus rentals, charter services, and
                    tour packages. Our modern fleet of buses, experienced
                    drivers, and commitment to safety ensure a comfortable and
                    enjoyable journey for our passengers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="message py-5">
        <div className="container text-center">
          <h1>Register and start !!</h1>
          <p>It's easy and secure!</p>
          <button className="btn btn-primary">Register</button>
        </div>
      </section>

      <section>
        <div className="container text-center">
          <h1>Let's Get In Touch!</h1>
          <i className="fa fa-phone myicon text-warning"></i>
          <p>+26077xxxx20</p>
          <p>powertools@gmail.zm</p>
        </div>
      </section>

      <section className="message py-5">
        <div className="container text-center">
          <button className="btn btn-primary">Contact Us</button>
        </div>
      </section>
    </Fragment>
  );
};

export default about;
