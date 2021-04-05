import { PathConstant } from "./PathConstant";

export class NavigationConstant {
    
    public static DASHBOARD = "/" + PathConstant.LR_DASHBOARD + "/" + PathConstant.DASHBOARD; //'/Dashboard/Dash-Board'
    public static BACK_TO_PAGING = '..' + "/" + PathConstant.PAGING; //'../Paging'
    public static BACK_TO_PAGING2 = '..' + "/" + '..' + "/" + PathConstant.PAGING; //'../../Paging'
    public static BACK_TO_DETAIL = '..' + "/" + PathConstant.DETAIL; //'../Detail'
    public static BACK_TO_ADD_EDIT = '..' + "/" + PathConstant.ADD_EDIT; //'../AddEdit'
    public static BACK_TO_EDIT = '..' + "/" + PathConstant.EDIT; //'../Edit'
    public static PAGES_CHANGE_PASSWORD = "/" + PathConstant.LR_PAGES + "/" + PathConstant.CHANGE_PASSWORD; //'/Pages/ChangePassword'
    public static PAGES_LOGIN = "/" + PathConstant.LR_PAGES + "/" + PathConstant.LOGIN; //'/Pages/Login'
    public static PAGES_REQ_PASSWORD = "/" + PathConstant.LR_PAGES + "/" + PathConstant.REQ_PASSWORD; //'/Pages/RequestPassword'
    public static PAGES_CONTENT = "/" + PathConstant.LR_PAGES + "/" + PathConstant.CONTENT; //'/Pages/Content'
    public static ERROR = "/" + PathConstant.LR_ERROR; //'/Error'
    public static NOTIF = "/" + PathConstant.LR_NOTIF; //'/Notification'
    
    //#region Asset
    public static ASSET_CONFIG_PAGING = '..' + "/" + '..' + "/" + PathConstant.ASSET_CONFIG_PAGING; //'../../Configuration/Paging'
    public static ASSET_CONFIG_PAGING2 = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_CONFIG_PAGING; //'/Asset/Configuration/Paging'
    public static ASSET_MASTER_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_PAGING; //'/Asset/AssetMaster/Paging'
    public static ASSET_MASTER_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_DETAIL; //'/Asset/AssetMaster/Detail'
    public static ASSET_MASTER_UPLOAD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_UPLOAD; //'/Asset/AssetMaster/Upload'
    public static ASSET_MASTER_CHILD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_CHILD; //'/Asset/AssetMaster/Child'
    public static ASSET_MASTER_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_RVW_UPLOAD_PAGING; //'/Asset/AssetMaster/ReviewUploadPaging'
    public static ASSET_MASTER_RVW_UPLOAD_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_RVW_UPLOAD_DETAIL; //'/Asset/AssetMaster/ReviewUploadDetail'
    public static ASSET_SCHM_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_PAGING; //'/Asset/Scheme/Paging'
    public static ASSET_SCHM_ADD_MBR = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_ADD_MBR; //'/Asset/Scheme/AddMember'
    public static ASSET_SCHM_MBR_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_MBR_DETAIL; //'/Asset/Scheme/MemberDetail'
    public static ASSET_SCHM_INFO_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_INFO_DETAIL; //'/Asset/Scheme/InformationDetail'
    public static ASSET_TYPE_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_TYPE_PAGING; //'/Asset/Type/Paging'
    public static ASSET_TYPE_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_TYPE_DETAIL; //'/Asset/Type/Detail'
    public static ASSET_NEG_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_PAGING; //'/Asset/NegativeAsset/Paging'
    public static ASSET_NEG_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_DETAIL; //'/Asset/NegativeAsset/Detail'
    public static ASSET_NEG_UPLOAD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_UPLOAD; //'/Asset/NegativeAsset/Upload'
    public static ASSET_NEG_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_RVW_UPLOAD_PAGING; //'/Asset/NegativeAsset/ReviewUploadPaging'
    public static ASSET_NEG_RVW_UPLOAD_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_RVW_UPLOAD_DETAIL; //'/Asset/NegativeAsset/ReviewUploadDetail'
    public static ASSET_ACC_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ACC_PAGING; //'/Asset/Accessory/Paging'
    public static ASSET_ACC_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ACC_DETAIL; //'/Asset/Accessory/Detail'
    public static ASSET_ATTR_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ATTR_PAGING; //'/Asset/Attribute/Paging'
    public static ASSET_ATTR_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ATTR_DETAIL; //'/Asset/Attribute/Detail'
    public static ASSET_CATEGORY_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_CATEGORY_PAGING; //'/Asset/Category/Paging'
    public static ASSET_CATEGORY_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_CATEGORY_DETAIL; //'/Asset/Category/Detail'
    public static ASSET_DOC_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_PAGING; //'/Asset/Document/Paging'
    public static ASSET_DOC_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_DETAIL; //'/Asset/Document/Detail'
    public static ASSET_DOC_MASTER_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_MASTER_PAGING; //'/Asset/DocumentMaster/Paging'
    public static ASSET_DOC_MASTER_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_MASTER_DETAIL; //'/Asset/DocumentMaster/Detail'
    //#endregion

    //#region Common Setting
    public static CS_BANK_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_BANK_PAGING; //'/CommonSetting/Bank/Paging'
    public static CS_BANK_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_BANK_DETAIL; //'/CommonSetting/Bank/Detail'
    public static CS_OFFICE_BANK_ACCOUNT_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_BANK_ACCOUNT_PAGING; //'/CommonSetting/OfficeBankAcc/Paging'
    public static CS_COA_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_PAGING; //'/CommonSetting/Coa/Paging'
    public static CS_COA_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_DETAIL; //'/CommonSetting/Coa/Detail'
    public static CS_COA_DETAIL_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_DETAIL_EDIT; //'/CommonSetting/Coa/Detail/Edit'
    public static CS_COA_SCHM_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_SCHM_PAGING; //'/CommonSetting/CoaScheme/Paging'
    public static CS_COA_SCHM_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_SCHM_DETAIL; //'/CommonSetting/CoaScheme/Detail'
    public static CS_CURRENCY_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_CURRENCY_PAGING; //'/CommonSetting/Currency/Paging'
    public static CS_CURRENCY_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_CURRENCY_ADD; //'/CommonSetting/Currency/Add'
    public static CS_ECONOMIC_SECTOR_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ECONOMIC_SECTOR_PAGING; //'/CommonSetting/EconomicSector/Paging'
    public static CS_ECONOMIC_SECTOR_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ECONOMIC_SECTOR_DETAIL; //'/CommonSetting/EconomicSector/Detail'
    public static CS_GEN_SETTING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING; //'/CommonSetting/GeneralSetting'
    public static CS_GEN_SETTING_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING_DETAIL; //'/CommonSetting/GeneralSetting/Detail'
    public static CS_GEN_SETTING_ADMIN = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING_ADMIN; //'/CommonSetting/GeneralSetting'
    public static CS_GEN_SETTING_DETAIL_ADMIN = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING_DETAIL_ADMIN; //'/CommonSetting/GeneralSetting/Detail'
    public static CS_HOLIDAY = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY; //'/CommonSetting/Holiday'
    public static CS_HOLIDAY_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_ADD; //'/CommonSetting/Holiday/Add'
    public static CS_HOLIDAY_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_EDIT; //'/CommonSetting/Holiday/Edit
    public static CS_HOLIDAY_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_DETAIL; //'/CommonSetting/Holiday/Detail'
    public static CS_HOLIDAY_DETAIL_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_DETAIL_ADD; //'/CommonSetting/Holiday/Detail/Add'
    public static CS_HOLIDAY_DETAIL_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_EDIT; //'/CommonSetting/Holiday/Edit'
    public static CS_MASTER = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_MASTER; //'/CommonSetting/Master'
    public static CS_MASTER_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_MASTER_DETAIL; //'/CommonSetting/Master/Detail'
    public static CS_OFFICE_ZIPCODE_MBR = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_ZIPCODE_MBR; //'/CommonSetting/OfficeZipcodeMember'
    public static CS_OFFICE_ZIPCODE_MBR_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_ZIPCODE_MBR_PAGING; //'/CommonSetting/OfficeZipcodeMember/Paging'
    public static CS_OFFICE_ZIPCODE_MBR_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_ZIPCODE_MBR_ADD; //'/CommonSetting/OfficeZipcodeMember/Add'
    public static CS_PAYMENT_ALLOC_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_PAGING; //'/CommonSetting/PaymentAlloc/Paging'
    public static CS_PAYMENT_ALLOC_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_DETAIL; //'/CommonSetting/PaymentAlloc/Detail'
    public static CS_PAYMENT_ALLOC_GRP_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_GRP_PAGING; //'/CommonSetting/PaymentAllocGrp/Paging'
    public static CS_PAYMENT_ALLOC_GRP_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_GRP_DETAIL; //'/CommonSetting/PaymentAllocGrp/Detail'
    public static CS_PROFESSION_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PROFESSION_PAGING; //'/CommonSetting/Profession/Paging'
    public static CS_PROFESSION_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PROFESSION_DETAIL; //'/CommonSetting/Profession/Detail'
    public static CS_DISTRICT_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_DISTRICT_PAGING; //'/CommonSetting/District/Paging'
    public static CS_DISTRICT_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_DISTRICT_DETAIL; //'/CommonSetting/District/Detail'
    public static CS_REF_PROVINCE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_PROVINCE_PAGING; //'/CommonSetting/RefProvince/Paging'
    public static CS_REF_PROVINCE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_PROVINCE_DETAIL; //'/CommonSetting/RefProvince/Detail'
    public static CS_REASON_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REASON_PAGING; //'/CommonSetting/Reason/Paging'
    public static CS_REASON_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REASON_DETAIL; //'/CommonSetting/Reason/Detail'
    public static CS_INDUSTRY_TYPE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_INDUSTRY_TYPE_PAGING; //'/CommonSetting/IndustryType/Paging'
    public static CS_INDUSTRY_TYPE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_INDUSTRY_TYPE_DETAIL; //'/CommonSetting/IndustryType/Detail'
    public static CS_SCORE_CATEGORY_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SCORE_CATEGORY_PAGING; //'/CommonSetting/ScoreCategory/Paging'
    public static CS_SCORE_CATEGORY_TYPE = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SCORE_CATEGORY_TYPE; //'/CommonSetting/ScoreCategory/Type'
    public static CS_WORKING_HOUR = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_WORKING_HOUR; //'/CommonSetting/WorkingHour'
    public static CS_WORKING_HOUR_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_WORKING_HOUR_ADD; //'/CommonSetting/WorkingHour/Add'
    public static CS_WORKING_HOUR_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_WORKING_HOUR_DETAIL; //'/CommonSetting/WorkingHour/Detail'
    public static CS_ZIPCODE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ZIPCODE_PAGING; //'/CommonSetting/Zipcode/Paging'
    public static CS_ZIPCODE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ZIPCODE_DETAIL; //'/CommonSetting/Zipcode/Detail'
    public static CS_REF_STATUS_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_STATUS_PAGING; //'/CommonSetting/RefStatus/Paging'
    //#endregion

    //#region System Setting
    public static SYSTEM_SETTING_ROLE = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE; //'/SystemSetting/Role'
    public static SYSTEM_SETTING_ROLE_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE_DETAIL; //'/SystemSetting/Role/Detail'
    public static SYSTEM_SETTING_ROLE_FORM = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE_FORM; //'/SystemSetting/RoleForm'
    public static SYSTEM_SETTING_ROLE_FORM_ADD = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE_FORM_ADD; //'/SystemSetting/RoleForm/Add'
    public static SYSTEM_SETTING_ATTR_PAGING = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.SYS_ATTR_PAGING; //'/SystemSetting/Attribute/Paging'
    public static SYSTEM_SETTING_ATTR_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.SYS_ATTR_DETAIL; //'/SystemSetting/Attribute/Detail'
    public static SYSTEM_SETTING_NOTIF = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.NOTIF; //'/SystemSetting/Notification'
    public static SYSTEM_SETTING_NOTIF_APPRV = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.NOTIF_APPRV; //'/SystemSetting/NotificationApproval'
    public static SYSTEM_SETTING_NOTIF_APPRV_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.NOTIF_APPRV_DETAIL; //'/SystemSetting/NotificationApproval/Detail'
    public static SYSTEM_SETTING_REF_FORM_PAGING = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_PAGING; //'/SystemSetting/RefForm/Paging'
    public static SYSTEM_SETTING_REF_FORM_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_DETAIL; //'/SystemSetting/RefForm/Detail'
    public static SYSTEM_SETTING_REF_FORM_ROLE_MAP = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_ROLE_MAP; //'/SystemSetting/RefForm/RoleMapping'
    public static SYSTEM_SETTING_REF_FORM_ROLE_MAP_ADD = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_ROLE_MAP_ADD; //'/SystemSetting/RefForm/RoleMapping/Add'
    public static SYSTEM_SETTING_CHANGE_PASSWORD = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.CHANGE_PASSWORD; //'/SystemSetting/ChangePassword'
    public static SYSTEM_SETTING_REF_USER = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_USER; //'/SystemSetting/RefUser'
    //#endregion

    //#region View
    public static VIEW_SRVY_TASK = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_SRVY + "/" + PathConstant.VIEW_SRVY_TASK; //'/View/Survey/SurveyTask'
    public static VIEW_SRVY_ORDER = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_SRVY + "/" + PathConstant.VIEW_SRVY_ORDER; //'/View/Survey/SurveyOrder'
    public static VIEW_CUST = PathConstant.CR_VIEW + "/" + PathConstant.VIEW_CUST; //'View/Customer'
    public static VIEW_CUST_ADDR = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_ADDR; //'/View/Customer/Address'
    public static VIEW_CUST_GRP = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_GRP; //'/View/Customer/CustomerGroup'
    public static VIEW_CUST_PERSONAL_DETAIL = "/" + NavigationConstant.VIEW_CUST + "/" +PathConstant.VIEW_CUST_PERSONAL_DETAIL; //'/View/Customer/PersonalDetail'
    public static VIEW_CUST_PERSONAL_CONTACT_PERSON = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON; //'/View/Customer/PersonalContactPerson'
    public static VIEW_CUST_PERSONAL_JOB_DATA = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA; //'/View/Customer/PersonalJobData'
    public static VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF; //'/View/Customer/PersonalJobDataNonProf'
    public static VIEW_CUST_PERSONAL_JOB_DATA_EMP = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_EMP; //'/View/Customer/PersonalJobDataEmp'
    public static VIEW_CUST_PERSONAL_JOB_DATA_SME = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_SME; //'/View/Customer/PersonalJobDataSme'
    public static VIEW_CUST_PERSONAL_FINANCIAL_DATA = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA; //'/View/Customer/PersonalFinancialData'
    public static VIEW_CUST_DOC = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_DOC; //'/View/Customer/CustDocument'
    public static VIEW_CUST_COY_DETAIL = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_DETAIL; //'/View/Customer/CoyDetail'
    public static VIEW_CUST_COY_MNGMNT = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_MNGMNT; //'/View/Customer/CoyManagement'
    public static VIEW_CUST_COY_CONTACT = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_CONTACT; //'/View/Customer/CoyContact'
    public static VIEW_CUST_COY_FINANCIAL = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_FINANCIAL; //'/View/Customer/CoyFinancial'
    public static VIEW_CUST_COY_LEGAL = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_LEGAL; //'/View/Customer/CoyLegal'
    public static VIEW_NEG_CUST = "/" + NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_NEG_CUST; //'/View/NegativeCustomer'
    public static VIEW_VENDOR = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_VENDOR; //'/View/Vendor'
    public static VIEW_VENDOR_BRANCH = "/" + NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_VENDOR_BRANCH; //'/View/Vendor/VendorBranch'
    public static VIEW_VENDOR_HO = "/" + NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_VENDOR_HO; //'/View/Vendor/VendorHO'
    public static VIEW_VENDOR_HOLDING = "/" + NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_VENDOR_HOLDING; //'/View/Vendor/VendorHolding'
    public static VIEW_PRODUCT_HO = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PRODUCT_HO; //'/View/ProductHO'
    public static VIEW_OFFERING = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_OFFERING; //'/View/Offering'
    //#endregion

    //#region Upload
    public static UPLOAD_SETTING_EDIT = "/" + PathConstant.LR_UPLOAD + "/" + PathConstant.UPLOAD_SETTING_EDIT; //'/Upload/UploadSettingEdit'
    public static UPLOAD_SETTING_PAGING = "/" + PathConstant.LR_UPLOAD + "/" + PathConstant.UPLOAD_SETTING_PAGING; //'/Upload/UploadSettingPaging'
    //#endregion

    //#region SURVEY
    public static SRVY_PAGING = "/" + PathConstant.LR_SRVY + "/" + PathConstant.PAGING; //'/Survey/Paging'
    public static SRVY_TASK = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SRVY_TASK; //'/Survey/Task'
    //#endregion
    
    //#region Vendor
    public static VENDOR_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.PAGING; //'/Vendor/Paging'
    public static VENDOR_GRP_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRP_ADD; //'/Vendor/Group/Add'
    public static VENDOR_GRP_VIEW = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRP_VIEW; //'/Vendor/Group/View'
    public static VENDOR_GRP_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRP_MBR_ADD; //'/Vendor/GroupMbr/Add
    public static VENDOR_HO_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HO_DETAIL; //'/Vendor/HO/Detail'
    public static VENDOR_HO_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HO_REG; //'/Vendor/HO/Registration'
    public static VENDOR_HOLDING_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HOLDING_DETAIL; //'/Vendor/Holding/Detail'
    public static VENDOR_HOLDING_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HOLDING_REG; //'/Vendor/Holding/Registration'
    public static VENDOR_AUCTION_COY_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_AUCTION_COY_PAGING; //'/Vendor/AuctionCompany/Paging'
    public static VENDOR_AUCTION_COY_ADD_EDIT = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_AUCTION_COY_ADD_EDIT; //'/Vendor/AuctionCompany/AddEdit'
    public static VENDOR_ATPM_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_ATPM_DETAIL; //'/Vendor/ATPM/Detail'
    public static VENDOR_ATPM_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_ATPM_REG; //'/Vendor/ATPM/Registration'
    public static VENDOR_BRANCH_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_ADD; //'/Vendor/Branch/Add'
    public static VENDOR_BRANCH_EMP_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_EMP_PAGING; //'/Vendor/Branch/Employee/Paging'
    public static VENDOR_BRANCH_EMP_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_EMP_DETAIL; //'/Vendor/Branch/Employee/Detail'
    public static VENDOR_BRANCH_MBR_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_MBR_PAGING; //'/Vendor/Branch/Member/Paging'
    public static VENDOR_BRANCH_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_MBR_ADD; //'/Vendor/Branch/Member/Add'
    public static VENDOR_BRANCH_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_REG; //'/Vendor/Branch/Registration'
    public static VENDOR_SCHM_MBR = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_SCHM_MBR; //'/Vendor/VendorScheme/Member'
    public static VENDOR_SCHM_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_SCHM_MBR_ADD; //'/Vendor/VendorScheme/Member/Add'
    public static VENDOR_SCHM_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_SCHM_DETAIL; //'/Vendor/VendorScheme/Detail'
    //#endregion

    //#region Product
    public static PRODUCT_OFFERING_DEACTIVATE = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_DEACTIVATE; //'/Product/OfferingDeactivate'
    public static PRODUCT_OFFERING_DEACTIVATE_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_DEACTIVATE_EDIT; //'/Product/OfferingDeactivate
    public static PRODUCT_OFFERING_REVIEW = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_REVIEW; //'/Product/OfferingReview'
    public static PRODUCT_OFFERING_REVIEW_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_REVIEW_DETAIL; //'/Product/OfferingReview/Detail'
    public static PRODUCT_OFFERING_APPRV = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_APPRV; //'/Product/OfferingApproval'
    public static PRODUCT_OFFERING_APPRV_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_APPRV_DETAIL; //'/Product/OfferingApproval/Detail'
    public static PRODUCT_OFFERING_DEACTIVATE_APPRV = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_DEACTIVATE_APPRV; //'/Product/OfferingDeactivateApproval'
    public static PRODUCT_OFFERING_DEACTIVATE_APPRV_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.OFFERING_DEACTIVATE_APPRV_DETAIL; //'/Product/OfferingDeactivateApproval/Detail'
    public static PRODUCT_HO_DEACTIVATE = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_DEACTIVATE; //'/Product/HODeactivate'
    public static PRODUCT_HO_DEACTIVATE_APPRV = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_DEACTIVATE_APPRV; //'/Product/HODeactivateApproval'
    public static PRODUCT_HO_DEACTIVATE_DETAIL= "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_DEACTIVATE_EDIT; //'/Product/HODeactivate/Detail
    public static PRODUCT_HO_DEACTIVATE_APPRV_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_DEACTIVATE_APPRV_DETAIL; //'/Product/HODeactivateApproval/Detail'
    public static PRODUCT_HO_ADD = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_ADD; //'/Product/HOAdd'
    public static PRODUCT_HO_ADD_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_ADD_DETAIL; //'/Product/HOAddDetail'
    public static PRODUCT_HO_RTN_PAGING = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_RTN_PAGING; //'/Product/HOReturnPaging'
    public static PRODUCT_HO_PAGING = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_PAGING; //'/Product/HOPaging'
    public static PRODUCT_HO_APPRV = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_APPRV; //'/Product/HOApproval'
    public static PRODUCT_HO_APPRV_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_APPRV_DETAIL; //'/Product/HOApproval/Detail'
    public static PRODUCT_HO_REVIEW = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_REVIEW; //'/Product/HOReview'
    public static PRODUCT_HO_REVIEW_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.HO_REVIEW_DETAIL; //'/Product/HOReview/Detail'
    public static PROD_OFFERING_PAGING = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.PROD_OFFERING_PAGING; //'/Product/ProdOffering/Paging'
    public static PROD_OFFERING_ADD = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.PROD_OFFERING_ADD; //'/Product/ProdOffering/add'
    public static PROD_OFFERING_ADD_DETAIL = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.PROD_OFFERING_ADD_DETAIL; //'/Product/ProdOffering/AddDetail'
    public static PROD_OFFERING_RTN_PAGING = "/" + PathConstant.LR_PRODUCT + "/" + PathConstant.PROD_OFFERING_RTN_PAGING; //'/Product/ProdOffering/ReturnPaging'
    //#endregion
    
    //#region Organization
    public static ORG_BZ_UNIT = "/" + PathConstant.LR_ORG + "/" + PathConstant.BZ_UNIT; //'/Organization/BusinessUnit'
    public static ORG_BZ_UNIT_MEMBER = "/" + PathConstant.LR_ORG + "/" + PathConstant.BZ_UNIT_MEMBER; //'/Organization/BusinessUnit/Member'
    public static ORG_BZ_UNIT_DETAIL = "/" + PathConstant.LR_ORG + "/" + PathConstant.BZ_UNIT_DETAIL; //'/Organization/BusinessUnit/Detail'
    public static ORG_JOB_TITLE = "/" + PathConstant.LR_ORG + "/" + PathConstant.JOB_TITLE; //'/Organization/JobTitle'
    //#endregion

    //#region Integration
    public static INTEGRATION_SEND_DAILY_MASTER = "/" + PathConstant.LR_INTEGRATION + "/" + PathConstant.SEND_DAILY_MASTER; //'/Integration/SendDailyMaster'
    //#endregion
    
    //#region Verif
    public static VERIF_QA_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_PAGING; //'/Verification/QuestionAnswer/Paging'
    public static VERIF_QA_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_ADD; //'/Verification/QuestionAnswer/Add'
    public static VERIF_QA_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_EDIT; //'/Verification/QuestionAnswer/Edit'
    public static VERIF_QA_GRP_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_PAGING; //'/Verification/QuestionGroup/Paging'
    public static VERIF_QA_GRP_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_ADD; //'/Verification/QuestionGroup/Add'
    public static VERIF_QA_GRP_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_EDIT; //'/Verification/QuestionGroup/Edit'
    public static VERIF_QA_GRP_MBR_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_MBR_PAGING; //'/Verification/QuestionGroupMember/Paging'
    public static VERIF_QA_GRP_MBR_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_MBR_ADD; //'/Verification/QuestionGroupMember/Add'
    public static VERIF_QA_GRP_MBR_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_MBR_EDIT; //'/Verification/QuestionGroupMember/Edit'
    public static VERIF_QA_SCHM_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_PAGING; //'/Verification/QuestionScheme/Paging'
    public static VERIF_QA_SCHM_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_ADD; //'/Verification/QuestionScheme/Add'
    public static VERIF_QA_SCHM_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_EDIT; //'/Verification/QuestionScheme/Edit'
    public static VERIF_QA_SCHM_MBR_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_MBR_PAGING; //'/Verification/QuestionSchemeMember/Paging'
    public static VERIF_QA_SCHM_MBR_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_MBR_ADD; //'/Verification/QuestionSchemeMember/Add'
    public static VERIF_QA_SCHM_MBR_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_MBR_EDIT; //'/Verification/QuestionSchemeMember/Edit'
    //#endregion

    //#region EMP
    public static EMP = "/" + PathConstant.LR_EMP; //'/Employee'
    public static EMP_PAGING = "/" + PathConstant.LR_EMP + "/" + PathConstant.PAGING; //'/Employee/Paging'
    public static EMP_DETAIL = "/" + PathConstant.LR_EMP + "/" + PathConstant.DETAIL; //'/Employee/Detail'
    public static EMP_BZ_UNIT_PAGING = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_BZ_UNIT_PAGING; //'/Employee/EmployeeBusinessUnit/Paging'
    public static EMP_BZ_UNIT_ADD = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_BZ_UNIT_ADD; //'/Employee/EmployeeBusinessUnit/Add'
    public static EMP_POS = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_POS; //'/Employee/EmployeePosition'
    public static EMP_POS_DETAIL = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_POS_DETAIL; //'/Employee/EmployeePosition/Detail'
    public static EMP_LEAVE_PAGING = "/" + PathConstant.LR_EMP + "/" + PathConstant.LEAVE_PAGING; //'/Employee/Leave/Paging'
    public static EMP_LEAVE_ADD = "/" + PathConstant.LR_EMP + "/" + PathConstant.LEAVE_ADD; //'/Employee/Leave/Add'
    //#endregion
    
    //#region COY
    public static COY_BOD = "/" + PathConstant.LR_COY + "/" + PathConstant.COY_BOD; //'/Company/Bod'
    public static COY_BOD_ADD = "/" + PathConstant.LR_COY + "/" + PathConstant.COY_BOD_ADD; //'/Company/Bod/Add'
    public static COY_COMMISSIONER = "/" + PathConstant.LR_COY + "/" + PathConstant.COY_COMMISSIONER; //'/Company/Commissioner'
    public static COY_COMMISSIONER_ADD = "/" + PathConstant.LR_COY + "/" + PathConstant.COY_COMMISSIONER_ADD; //'/Company/Commissioner/Add'
    public static COY_EDIT = "/" + PathConstant.LR_COY + "/" + PathConstant.EDIT; //'/Company/Edit'
    public static COY = "/" + PathConstant.LR_COY; //'/Company'
    //#endregion

    //#region Office
    public static OFFICE = "/" + PathConstant.LR_OFFICE; //'/Office'
    public static OFFICE_PAGING = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.PAGING; //'/Office/Paging'
    public static OFFICE_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.ADD; //'/Office/Add'
    public static OFFICE_AREA = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA; //'/Office/OfficeArea'
    public static OFFICE_AREA_DETAIL = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA_DETAIL; //'/Office/OfficeArea/Detail'
    public static OFFICE_AREA_MEMBER = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA_MEMBER; //'/Office/OfficeArea/Member'
    public static OFFICE_AREA_MEMBER_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA_MEMBER_ADD; //'/Office/OfficeArea/Member/Add'
    public static OFFICE_EMP_POS = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_EMP_POS; //'/Office/OfficeEmpPos'
    public static OFFICE_EMP_POS_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_EMP_POS_ADD; //'/Office/OfficeEmpPosAdd'
    public static OFFICE_GROUP_MEMBER = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_GROUP_MEMBER; //'/Office/Group/Member'
    public static OFFICE_GROUP_MEMBER_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_GROUP_MEMBER_ADD; //'/Office/Group/Member/Add'
    //#endregion
    
    //#region Cust
    public static CUST_PERSONAL_MAIN_INFO = '..' + "/" + PathConstant.CUST_PERSONAL_MAIN_INFO; //'../CustomerPersonal/MainInfo'
    public static CUST_COY_MAIN_INFO = '..' + "/" + PathConstant.CUST_COY_MAIN_INFO; //'../CustomerCompany/MainInfo'
    public static CUST_NEG_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_PAGING; //'/Customer/NegativeCustomer/Paging'
    public static CUST_NEG_DETAIL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_DETAIL; //'/Customer/NegativeCustomer/Detail'
    public static CUST_NEG_UPLOAD = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_UPLOAD; //'/Customer/NegativeCustomer/Upload'
    public static CUST_NEG_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_RVW_UPLOAD_PAGING; //'/Customer/NegativeCustomer/ReviewUploadPaging'
    public static CUST_NEG_RVW_UPLOAD_DETAIL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_RVW_UPLOAD_DETAIL; //'/Customer/NegativeCustomer/ReviewUploadDetail'
    public static CUST_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.PAGING; //'/Customer/Paging'
    public static CUST_EDIT_MAIN_DATA_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_EDIT_MAIN_DATA_PAGING; //'/Customer/EditMainData/Paging'
    public static CUST_EDIT_MAIN_DATA_PERSONAL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_EDIT_MAIN_DATA_PERSONAL; //'/Customer/EditMainData/Personal'
    public static CUST_EDIT_MAIN_DATA_COY = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_EDIT_MAIN_DATA_COY; //'/Customer/EditMainData/Company'
    public static CUST_COY_PAGE = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_COY_PAGE; //'/Customer/CustomerCompany/Page'
    public static CUST_COY_DUP_CHECK = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_COY_DUP_CHECK; //'/Customer/CustomerCompany/DuplicateCheck'
    public static CUST_PERSONAL_PAGE = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_PERSONAL_PAGE; //'/Customer/CustomerPersonal/Page'
    public static CUST_PERSONAL_DUP_CHECK = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_PERSONAL_DUP_CHECK; //'/Customer/CustomerPersonal/DuplicateCheck'
    public static CUST_UPDATE_DATA_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_UPDATE_DATA_PAGING; //'/Customer/UpdateDataCustomer/Paging'
    public static CUST_UPDATE_DATA_DETAIL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_UPDATE_DATA_DETAIL; //'/Customer/UpdateDataCustomer/Detail'
    public static CUST_SHRHLDR_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_SHRHLDR_PAGING; //'/Customer/CustShareholder/Paging'
    public static CUST_GUARANTOR_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_GUARANTOR_PAGING; //'/Customer/CustGuarantor/Paging'
    public static CUST_FAMILY_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_FAMILY_PAGING; //'/Customer/CustFamily/Paging'
    //#endregion

    //#region Document Management
    public static DOC_MNGMNT_RACK_PAGING = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.RACK_PAGING; //'/DocumentManagement/Rack/Paging'
    public static DOC_MNGMNT_RACK_ADD_EDIT = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.RACK_ADD_EDIT; //'/DocumentManagement/Rack/AddEdit'
    public static DOC_MNGMNT_FILING_PAGING = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.FILING_PAGING; //'/DocumentManagement/Filing/Paging'
    public static DOC_MNGMNT_FILING_ADD_EDIT = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.FILING_ADD_EDIT; //'/DocumentManagement/Filing/AddEdit'
    public static DOC_MNGMNT_CABINET_PAGING = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.CABINET_PAGING; //'/DocumentManagement/Cabinet/Paging'
    public static DOC_MNGMNT_CABINET_ADD_EDIT = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.CABINET_ADD_EDIT; //'/DocumentManagement/Cabinet/AddEdit'
    public static DOC_MNGMNT_VIEW_RACK = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.VIEW_RACK; //'/DocumentManagement/ViewRack'
    public static DOC_MNGMNT_VIEW_CABINET = "/" + PathConstant.CR_DOC_MNGMNT_VIEW + "/" + PathConstant.VIEW_CABINET; //'//DocumentManagementView/ViewCabinet'
    //#endregion

    //#region JOURNAL
    public static JOURNAL_MEDIA_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_PAGING;
    public static JOURNAL_MEDIA_DETAIL = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_DETAIL;
    public static JOURNAL_MEDIA_HEADER_FACT = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_HEADER_FACT;
    public static JOURNAL_MEDIA_GROUP = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_GROUP;
    public static JOURNAL_MEDIA_GROUP_FACT = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_GROUP_FACT;
    public static JOURNAL_MEDIA_GROUP_ITEM_VALUE = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_GROUP_ITEM_VALUE;
    public static JOURNAL_RESULT = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_RESULT;
    public static FAILED_JOURNAL_RESULT_LIST_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.FAILED_JOURNAL_RESULT_LIST_PAGING;
    //#endregion
}