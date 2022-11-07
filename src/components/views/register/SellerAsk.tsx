import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";

export default function SellerAsk({ setSeller, seller }: any) {

    return (

        <div className="ml-12 mt-12">
            <FormGroup>
                <FormControlLabel value={seller} onChange={(e:any) => setSeller(e.target.checked)} control={<Checkbox />} label="Pretendo ser um vendedor da plataforma" />
            </FormGroup>
        </div>
    );


}