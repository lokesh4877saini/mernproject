import './about.scss';
const About = () => {
    return (<>
        <div className="Aboutcontainer" style={{ padding: "5rem" }}>
            <div className="Aboutheading1" style={{ textAlign: "center" }}>
                <h3>Welcome to About page</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "50px" }}>
                    <li>How</li>
                    <li>About</li>
                    <li>Ecomm</li>
                    <li>Products</li>
                </ul>
            </div>
            <div className="Aboutheading2" style={{ textAlign: "center" }}>
                <h3>Easy to use</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <li>i </li>
                    <li>hope</li>
                    <li>you</li>
                    <li>will</li>
                    <li>come</li>
                    <li>back soon</li>

                </ul>
            </div>

        </div>
    </>)

}
export default About;