function Contact() {
  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row">
          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Visit Us</h3>
                <p className="mb-1">695 Park Ave,</p>
                <p className="mb-1">New York, NY 10065</p>
                <p className="mb-1"><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Hours:</strong> Mon-Sun 11am-10pm</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Send us a message</h3>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Find Us</h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6043.470822794022!2d-73.96710402431674!3f40.767843834195546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1773086260430!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact