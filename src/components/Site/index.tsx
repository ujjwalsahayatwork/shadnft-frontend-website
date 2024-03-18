import Footer from "../Footer";
import Header from "../Header";


const Sites = ({ children }: any) => {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    
    </div>
  );
};

export default Sites;
