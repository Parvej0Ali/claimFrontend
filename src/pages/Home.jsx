export const Home=()=>{
    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>
                                We have made claim managment system application
                            </p>
                            <h1>welcome to claim managment system </h1>
                            <p>
                                !!!!!!!!!!!!!!!here we go !!!!!!!!!!!!!!!!!!
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">connect now</button>
                                </a>
                                <a href="/services">
                                    <button className="btn secondary-btn">learn more</button>
                                </a>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                             src="1.jpg" 
                             alt="lets code"
                             width="400" 
                             height="300"/>
                        </div>
                    </div>
                </section>
            </main>
        
        </>
    )
}