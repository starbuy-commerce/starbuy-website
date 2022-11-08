import {useState} from "react";
import Dropdown from "../dropdown/Dropdown";
import {categories} from "../../api/category";
import Navbar from "../Navbar";
import {post_item} from "../../api/item";
import {useCookies} from "react-cookie";

export default function ItemAdd() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState<any>(undefined);
    const [stock, setStock] = useState(0);
    const [cookie, setCookie] = useCookies();

    const readImage = (e: any) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent: any) => {
            setImage(readerEvent.target.result);
        }
    }

    const post = () => {
        if(name === "" || description === "" || price === 0 || image === "" || category === 0 || stock === 0) {
            alert("Preencha todos os campos");
            return;
        }

        post_item(cookie.access_token, {title: name, price: price, stock: stock, category: category.value, description: description, image: image}, resp => {
            alert("Produto cadastrado com sucesso!")
            window.location.href = "/"
        })

    }

    return (
        <div>
            <Navbar fixed={false} bottomBar={true}/>
            <div className="w-2/3 mx-auto mt-16">
                <p className="font-inter text-2xl font-bold text-gray-700 mt-16 mb-16">Adicionar produto</p>
                <div className="mb-4">
                    <p className="font-inter text-xs">Nome do produto:</p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                    />
                </div>
                <div className="mb-4">
                    <p className="font-inter text-xs">Descrição do produto:</p>
                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-1 pl-2 rounded-md outline-none resize-none border-[1px] border-indigo-500 text-xs w-full"
                    />
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="w-1/3">
                        <p className="font-inter text-xs">Preço unitário:</p>
                        <input
                            type="number" min="0.00" max="10000.00" step="0.01"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                        />
                    </div>
                    <div className="w-1/3">
                        <p className="font-inter text-xs">Categoria:</p>
                        <Dropdown options={categories} setter={setCategory} value={category} disabled={false} placeholder="Categoria" onChange={() => {}}/>
                    </div>
                    <div className="w-1/3">
                        <p className="font-inter text-xs">Estoque disponível:</p>
                        <input
                            type="number" min="0.00" max="10000.00" step="1"
                            value={stock}
                            onChange={(e) => setStock(parseInt(e.target.value))}
                            className="p-1 pl-2 rounded-md outline-none border-[1px] border-indigo-500 text-xs w-full h-8"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <p className="font-inter text-xs">Imagem:</p>
                    <input
                        type="file"
                        onChange={(e) => readImage(e)}
                        className="rounded-md outline-none text-xs w-full h-8"
                    />
                </div>
                <div onClick={post} className="w-full border-[1px] mt-8 p-1 border-indigo-500 text-center rounded-md text-indigo-500">CADASTRAR PRODUTO</div>
            </div>
        </div>
    );
}