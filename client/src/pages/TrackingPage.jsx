import TrackingComponent from "../components/TrackingComponent";

import { Footer } from "../components/Footer.jsx";

import CartDrawer from "../components/CartDrawer";




function TrackingPage() {



  return (
    <>
      <div>
        <TrackingComponent />
        <CartDrawer />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default TrackingPage;
