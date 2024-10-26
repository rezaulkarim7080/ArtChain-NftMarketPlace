// import HomePage from "./components/HomePage";
import HomeApp from "./HomeApp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Account from "./Pages/Account";
import Blog from "./Pages/Blog";

import ConnectWallet from "./Pages/ConnectWallet";
import ContactUs from "./Pages/ContactUs";
import Disconnect from "./Pages/Disconnect";
import Edit from "./Pages/Edit";
import Help from "./Pages/Help";
import MyItems from "./Pages/MyItems";
import NFTDetails from "./Pages/NFTDetails";
import UploadNft from "./Pages/UploadNft";
import Subcription from "./Pages/Subcription";
import SearchPage from "./Pages/SearchPage";
import About from "./Pages/About";
import Collection from "./Pages/Collection";
import SellerCollection from "./CollectionPage/SellerCollection";
import Footer from "./Pages/Footer";
import GoToHomePage from "./Pages/GoToHomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/collection" element={<Collection />} />
          <Route
            path="/collection/:sellerAddress"
            element={<SellerCollection />}
          />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/disconnect" element={<Disconnect />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/help" element={<Help />} />
          <Route path="/my-items" element={<MyItems />} />
          <Route path="/nft/:tokenId" element={<NFTDetails />} />
          <Route path="/upload-nft" element={<UploadNft />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/subcription" element={<Subcription />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<GoToHomePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
