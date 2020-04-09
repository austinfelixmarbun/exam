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
    RowVersion: any;

    constructor() { this.VendorAddrId = 0; }
}