function Hero() {
  return (
    <section id="home" className="hero text-white text-center d-flex align-items-center" style={{
      background: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80) center/cover no-repeat',
      height: '500px',
      marginTop: '70px'
    }}>
      <div className="container">
        <h2 className="display-4 mb-3">Welcome to Top Tier Italzi</h2>
        <p className="lead mb-4">Fresh food, great atmosphere, happy customers</p>
        <a href="#menu" className="btn btn-primary btn-lg">View Menu</a>
      </div>
    </section>
  )
}

export default Hero