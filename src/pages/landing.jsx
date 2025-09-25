import { ArrowRight, CheckCircle, Clock, FlaskConical, Mail, MapPin, Phone, Shield, Star, Users } from "lucide-react";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-vh-100">
      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <div className="bg-primary rounded-circle p-2 me-2">
              <FlaskConical className="text-white" size={24} />
            </div>
            <span className="fw-bold fs-4 text-primary">Medilab</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#services" className="nav-link">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="btn btn-primary text-white px-4 ms-2">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Hero section */}

      <section
        className="bg-primary text-white"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Advanced Laboratory Management System
              </h1>
              <p className="lead mb-4">
                Streamline your medical labratory operations with our
                comrehensive management system. Track samples, manage staff and
                unsure quality results eith ease.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <a href="" className="btn btn-light btn-lg text-primary px-4">
                  Get Started <ArrowRight size={20} className="ms-2" />
                </a>
                <a href="" className="btn btn-outline-light btn-lg px-4">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white bg-opacity-10 rounded-3 p-5 mt-5 mt-lg-0">
                <FlaskConical size={120} className="mb-3" />
                <h3 className="mb-3">Laboratory Excellence</h3>
                <p>Trusted by healthcare professionals world-wide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features section */}
      <section className="py-5" id="services">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              Our Services
            </h2>
            <p className="lead text-muted">
              Comprehensive solutions for modern laboratories
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Users className="text-primary" size={24} />
                  </div>
                  <h5 className="card-title">Staff Management</h5>
                  <p className="card-text text-muted">
                    Efficiently manage nurses, technicians and laboratory staff.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <FlaskConical className="text-success" size={32} />
                  </div>
                  <h5 className="card-title">Lab Testing</h5>
                  <p className="card-text text-muted">
                    Track and manage all lab tests with automation.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Shield className="text-warning" size={32} />
                  </div>
                  <h5 className="card-title">Quality Control</h5>
                  <p className="card-text text-muted">
                    Ensure accurracy and compliance with built-in quality
                    control measures and reporting.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Clock className="text-info" size={32} />
                  </div>
                  <h5 className="card-title">Real Time Tracking</h5>
                  <p className="card-text text-muted">
                    Monitor lab opertions in real time with Comprehensive
                    dashboards and analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us section */}

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold text-primary mb-4">
                Why Choose Medilab?
              </h2>
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">HIPAA Compliant</h5>
                </div>
                <p className="text-muted ms-5">
                  Full compliance with healthcare data protection regulations
                </p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">24/7 Support</h5>
                </div>
                <p className="text-muted ms-5">
                  Round-the-clock technical support for uninterrupted operations
                </p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">Easy Integration</h5>
                </div>
                <p className="text-muted ms-5">
                  Seamless integration with existing laboratory equipment and
                  systems
                </p>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">Cloud-Based</h5>
                </div>
                <p className="text-muted ms-5">
                  Access your data anywhere, anytime with secure cloud
                  infrastructure
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-white rounded-3 p-4 shadow-sm">
                <h3 className="text-center mb-4">
                  Trusted by Healthcare Professionals
                </h3>
                <div className="row text-center">
                  <div className="col-4">
                    <h2 className="text-primary fw-bold">500+</h2>
                    <small className="text-muted">Labs Connected</small>
                  </div>
                  <div className="col-4">
                    <h2 className="text-primary fw-bold">50K+</h2>
                    <small className="text-muted">Tests Processed</small>
                  </div>
                  <div className="col-4">
                    <h2 className="text-primary fw-bold">99.9%</h2>
                    <small className="text-muted">Uptime</small>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-light rounded">
                  <div className="d-flex align-items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-warning"
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                    <span className="ms-2 small text-muted">5.0 out of 5</span>
                  </div>
                  <p className="small text-muted mb-0">
                    "Medilab has transformed our laboratory operations. The
                    interface is intuitive and the support team is exceptional."
                  </p>
                  <small className="text-muted">
                    - Dr. Sarah Johnson, Lab Director
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5" id="contact">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              Get In Touch
            </h2>
            <p className="lead text-muted">
              Ready to modernize your laboratory? Contact us today!
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-8 mx-auto">
              <div className="row g-4">
                <div className="col-md-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <h5>Call Us</h5>
                  <p className="text-muted">+1 (555) 123-4567</p>
                </div>

                <div className="col-md-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <h5>Email Us</h5>
                  <p className="text-muted">info@medilab.com</p>
                </div>

                <div className="col-md-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <h5>Visit Us</h5>
                  <p className="text-muted">
                    123 Medical Center Dr
                    <br />
                    Healthcare City, HC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle p-2 me-2">
                  <FlaskConical className="text-white" size={20} />
                </div>
                <span className="fw-bold">Medilab</span>
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <small className="text-muted">
                © 2025 Medilab. All rights reserved. | Privacy Policy | Terms of
                Service
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
