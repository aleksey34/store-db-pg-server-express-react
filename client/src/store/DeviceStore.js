import {makeAutoObservable} from "mobx";

export default class DeviceStore{

    constructor() {

        //data
        this._types = [
            // {id:1 , name: 'Холодильники'},
            // {id:2 , name: 'Смартфоны'},
            // {id:3 , name: 'Ноутбуки'},
            // {id:4 , name: 'Телевизоры'}
        ];
        this._brands= [
            // {id:1 , name: 'Samsung'},
            // {id:2 , name: 'Apple'},
            // {id:3 , name: 'Lenovo'},
            // {id:4 , name: 'Asus'},
        ];
        this._devices = [
            // {id:1, name:'iphone 13 pro' , price: 25000 , rating: 5 , img:'3fdfb3aa-589d-429f-b945-18475a362ef6.jpg'},
            // {id:2, name:'iphone 13 pro' , price: 25000 , rating: 5 , img:'3fdfb3aa-589d-429f-b945-18475a362ef6.jpg'},
            // {id:3, name:'iphone 13 pro' , price: 25000 , rating: 5 , img:'3fdfb3aa-589d-429f-b945-18475a362ef6.jpg'},
            // {id:4, name:'iphone 13 pro' , price: 25000 , rating: 5 , img:'3fdfb3aa-589d-429f-b945-18475a362ef6.jpg'},
            // {id:5, name:'iphone 13 pro' , price: 25000 , rating: 5 , img:'3fdfb3aa-589d-429f-b945-18475a362ef6.jpg'},
            // {id:6, name:'iphone 13 pro' , price: 25000 , rating: 5 , img:'3fdfb3aa-589d-429f-b945-18475a362ef6.jpg'},
        ];

        //selected
        this._selectedType = {}
        this._selectedBrand = {}

        // pagination
        this._page = 1;
        this._totalCount = 0;
        this._limit =  2;

        makeAutoObservable(this);
    }

    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices = devices;
    }

    setSelectedType(type){
        this._page = 1;
        this._selectedType = type;
    }
    setSelectedBrand(brand){
        this._page = 1;
        this._selectedBrand = brand;
    }

    setPage(page){
        this._page = page;
    }
    setTotalCount(totalCount){
        this._totalCount = totalCount;
    }
    setLimit(limit){
        this._limit = limit;
    }



    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
    get devices(){
        return this._devices;
    }

    get selectedType(){
        return this._selectedType;
    }
    get selectedBrand(){
        return this._selectedBrand;
    }

    get page(){
        return this._page;
    }
    get totalCount(){
        return this._totalCount;
    }
    get limit(){
        return this._limit;
    }

}