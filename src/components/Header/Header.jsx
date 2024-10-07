import CompanyLogo from "./CompanyLogo";
import Control from "./Control";
import { HeartSVG, BoxSVG, BasketSVG, EyeSVG } from "../../images/SVGAssets";

function Header(params) {
    return (
        <header className="lg:w-full flex items-center justify-between lg:gap-8 lg:px-40 lg:py-4">
            <CompanyLogo />
            <div className="flex justify-evenly items-center gap-3.5">
                <Control name={"Streams"} icon={<EyeSVG />} />
                <Control name={"Favorites"} icon={<HeartSVG />} />
                <Control name={"Orders"} icon={<BoxSVG />} />
                <Control name={"Basket"} icon={<BasketSVG />} />
            </div>
        </header>
    );
}

export default Header;
