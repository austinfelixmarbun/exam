export class VendorAddrObj{
    VendorAddrId: number;
    VendorId: number;
    VendorEmpId: number;
    MrAddrTypeCode: string;
    Addr: string;
    Zipcode: string;
    AreaCode2: string; //kelurahan
    AreaCode1: string; //kecamatan
    City: string;
    Province: string;
    Latitude: string;
    Longitude: string;
    RowVersion: string;
    Phn1: string;
    Phn2: string;
    PhnArea1: string;
    PhnArea2: string;
    
    constructor() { this.VendorAddrId = 0; }
}