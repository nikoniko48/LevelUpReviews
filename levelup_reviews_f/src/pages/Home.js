import Header from "../components/Header";
import HomePanel from "../components/HomePanel";
import Footer from "../components/Footer";
import '../assets/ContentPane.css'

function Home() {
    return (
        <div className="home-page">
            <Header />
            <div className="content-pane">
                <HomePanel />
            </div>
            <Footer />
        </div>
    );
}

export default Home;