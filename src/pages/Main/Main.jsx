import Header from "../../components/Header/Header";
import InvoiceList from "../../components/InvoiceList/InvoiceList";

function Main() {
    return (
        <>
            <Header />
            <div className="lg:w-full flex flex-col lg:gap-8 lg:px-40 lg:py-4">
                <h1 className="text-center">Main page</h1>
                <InvoiceList />
            </div>
        </>
    );
}

export default Main;
