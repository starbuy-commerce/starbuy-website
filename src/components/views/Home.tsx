import CategoryButton from "../CategoryButton";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import tech from "../../images/category/tech.svg"
import clothes from "../../images/category/clothes.svg"
import books from "../../images/category/books.svg"
import bass from "../../images/test/bass.jpg"
import ampli from "../../images/test/ampli.jpg"
import guitar from "../../images/test/guitar.jpg"
import notebook from "../../images/test/notebook.png"

const Home = () => (
    <>
        <Navbar fixed={true} />
        <div className="mt-28">
            <div className="flex gap-6 mx-auto justify-center">
                <CategoryButton img={tech} size="w-10 h-10" category="Eletrônico" />
                <CategoryButton img={clothes} size="w-10 h-10" category="Vestuário" />
                <CategoryButton img={books} size="w-8 h-8" category="Livros" />
            </div>

            <div className="flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-12 justify-center">
                <ProductCard img={bass} name="Contrabaixo Fender 032 8900 Squier Modified Jaguar Bass 538" price={2899.00} />
                <ProductCard img={ampli} name="AMPLIFICADOR COMBO FENDER MUSTANG I V2 8 POL 20W RMS C/ EFEITO" price={1890.00} />
                <ProductCard img={guitar} name="Fender Classic Series '72 Telecaster Thinline Electric Guitar Natural" price={1230.00} />
                <ProductCard img={notebook} name="ASUS ROG Zephyrus S17 (2020) Laptop para jogos, 17,3' 300Hz IPS Type FHD, NVIDIA GeForce RTX 2080S, Intel Core i7-10875H, 32GB DDR4, 1TB PCIe SSD, Per-Key RGB KB, Thunderbolt 3, Windows 10, GX701LXS-XS78" price={59340.00} />
            </div>
        </div>
    </>
);

export default Home;