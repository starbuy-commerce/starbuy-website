import CategoryButton from "../CategoryButton";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import tech from "../../images/category/tech.svg"
import clothes from "../../images/category/clothes.svg"
import books from "../../images/category/books.svg"
import bass from "../../images/test/bass.jpg"

const Home = () => (
    <>
        <Navbar fixed={true} />
        <div className="mt-28">
            <div className="flex gap-6 mx-auto justify-center">
                <CategoryButton img={tech} size="w-10 h-10" category="Eletrônico" />
                <CategoryButton img={clothes} size="w-10 h-10" category="Vestuário" />
                <CategoryButton img={books} size="w-8 h-8" category="Livros" />
            </div>

            <div className="grid grid-cols-5 gap-2 pr-24 pl-24 gap-y-7 mt-12">
                <ProductCard img={bass} name="Contrabaixo Fender 032 8900 Squier Modified Jaguar Bass 538" price={2899.00} />
            </div>
        </div>
    </>
);

export default Home;