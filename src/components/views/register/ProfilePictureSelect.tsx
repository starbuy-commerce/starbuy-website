import React, {useState} from 'react';

export default function ProfilePictureSelect({picture, setPicture}: any) {

    function selectPicture() {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e: any) => {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (readerEvent: any) => {
                setPicture(readerEvent.target.result);
            }
        }

        input.click();
    }

    return (
        <div>
            <div className="border-[1px] w-52 h-52 my-auto mx-auto">
                <img src={picture} alt="" className="object-cover m-auto w-52 h-52"/>
            </div>
            <p className="flex justify-center mt-4 font-bold font-rubik hover:text-indigo-800 hover:cursor-pointer" onClick={selectPicture}>Selecionar imagem</p>
        </div>
    );
}