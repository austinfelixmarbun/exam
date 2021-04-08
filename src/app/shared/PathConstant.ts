export class PathConstant {
    // Notes: data yang di CombinePath itu arti ny ada lebih dari 1 Const dan ada /

    // layout-routes
    //#region layout-routes
    public static LR_DASHBOARD = "Dashboard";
    public static LR_FORMS = "forms";
    public static LR_COMPNT = "components";
    public static LR_NOTIF = "Notification";
    public static LR_PAGES = "Pages";
    public static LR_OFFICE = "Office";
    public static LR_OFFICE_BANK_ACC = "OfficeBankAcc";
    public static LR_EMP = "Employee";
    public static LR_ORG = "Organization";
    public static LR_CUST = "Customer";
    public static LR_SYSTEM_SETTING = "SystemSetting";
    public static LR_COY = "company";
    public static LR_COMMON_SETTING = "CommonSetting";
    public static LR_UPLOAD = "Upload";
    public static LR_PRODUCT = "Product";
    public static LR_ASSET = "Asset";
    public static LR_VENDOR = "Vendor";
    public static LR_VERIF = "Verification";
    public static LR_APPRV_SCRN = "ApprovalScreen";
    public static LR_ERROR = "Error";
    public static LR_SRVY = "Survey";
    public static LR_INTEGRATION = "Integration";
    public static LR_DOC_MNGMNT = "DocumentManagement";
    public static LR_FEE = "Fee";
    //#endregion

    //#region content-routes
    public static CR_PAGES = "Pages";
    public static CR_VIEW = "View";
    public static CR_DOC_MNGMNT_VIEW = "DocumentManagementView";
    //#endregion

    //#region content-pages
    public static LOGIN = "Login";
    public static CONTENT = "Content";
    public static REQ_PASSWORD = "RequestPassword";
    public static RESET_PASSWORD = "ResetPassword/:code";
    //#endregion

    //#region Common-Path
    public static VIEW = "View";
    public static PAGES = "pages";
    public static PAGING = "Paging";
    public static MAIN = "Main";
    public static ADD = "Add";
    public static EDIT = "Edit";
    public static ADD_EDIT = "AddEdit";
    public static DETAIL = "Detail";
    public static ADD_DETAIL = PathConstant.ADD + "/" + PathConstant.DETAIL;
    public static UPLOAD = "Upload";
    public static VERIF = "Verif";
    public static APPRV = "Approval";
    public static INQUIRY = "Inquiry";
    public static CANCEL = "Cancel";
    public static TYPE = "Type";
    public static PERSONAL = "Personal";
    public static COY = "Company";
    public static RVW_UPLOAD_PAGING = "ReviewUploadPaging";
    public static RVW_UPLOAD_DETAIL = "ReviewUploadDetail";
    public static MEMBER = "Member";
    public static RTN_PAGING = "ReturnPaging";
    public static GROUP = "Group";
    //#endregion

    //#region Asset
    public static ASSET_TYPE_PAGING = PathConstant.TYPE + "/" + PathConstant.PAGING;
    public static ASSET_TYPE_DETAIL = PathConstant.TYPE + "/" + PathConstant.DETAIL;
    public static ASSET_SCHM = "Scheme";
    public static ASSET_SCHM_PAGING = PathConstant.ASSET_SCHM + "/" + PathConstant.PAGING;
    public static ASSET_SCHM_MBR_DETAIL = PathConstant.ASSET_SCHM + "/MemberDetail";
    public static ASSET_SCHM_ADD_MBR = PathConstant.ASSET_SCHM + "/AddMember";
    public static ASSET_SCHM_INFO_DETAIL = PathConstant.ASSET_SCHM + "/InformationDetail";
    public static ASSET_CONFIG = "Configuration";
    public static ASSET_CONFIG_PAGING = PathConstant.ASSET_CONFIG + "/" + PathConstant.PAGING;
    public static ASSET_CATEGORY = "Category";
    public static ASSET_CATEGORY_PAGING = PathConstant.ASSET_CATEGORY + "/" + PathConstant.PAGING;
    public static ASSET_CATEGORY_DETAIL = PathConstant.ASSET_CATEGORY + "/" + PathConstant.DETAIL;
    public static ASSET_ACC = "Accessory";
    public static ASSET_ACC_PAGING = PathConstant.ASSET_ACC + "/" + PathConstant.PAGING;
    public static ASSET_ACC_DETAIL = PathConstant.ASSET_ACC + "/" + PathConstant.DETAIL;
    public static ASSET_ATTR = "Attribute";
    public static ASSET_ATTR_PAGING = PathConstant.ASSET_ATTR + "/" + PathConstant.PAGING;
    public static ASSET_ATTR_DETAIL = PathConstant.ASSET_ATTR + "/" + PathConstant.DETAIL;
    public static ASSET_DOC = "Document";
    public static ASSET_DOC_PAGING = PathConstant.ASSET_DOC + "/" + PathConstant.PAGING;
    public static ASSET_DOC_DETAIL = PathConstant.ASSET_DOC + "/" + PathConstant.DETAIL;
    public static ASSET_DOC_MASTER = "DocumentMaster";
    public static ASSET_DOC_MASTER_PAGING = PathConstant.ASSET_DOC_MASTER + "/" + PathConstant.PAGING;
    public static ASSET_DOC_MASTER_DETAIL = PathConstant.ASSET_DOC_MASTER + "/" + PathConstant.DETAIL;
    public static ASSET_NEG = "NegativeAsset";
    public static ASSET_NEG_PAGING = PathConstant.ASSET_NEG + "/" + PathConstant.PAGING;
    public static ASSET_NEG_DETAIL = PathConstant.ASSET_NEG + "/" + PathConstant.DETAIL;
    public static ASSET_NEG_UPLOAD = PathConstant.ASSET_NEG + "/" + PathConstant.UPLOAD;
    public static ASSET_NEG_RVW_UPLOAD_PAGING = PathConstant.ASSET_NEG + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static ASSET_NEG_RVW_UPLOAD_DETAIL = PathConstant.ASSET_NEG + "/" + PathConstant.RVW_UPLOAD_DETAIL;
    public static ASSET_MASTER = "AssetMaster";
    public static ASSET_MASTER_PAGING = PathConstant.ASSET_MASTER + "/" + PathConstant.PAGING;
    public static ASSET_MASTER_DETAIL = PathConstant.ASSET_MASTER + "/" + PathConstant.DETAIL;
    public static ASSET_MASTER_UPLOAD = PathConstant.ASSET_MASTER + "/" + PathConstant.UPLOAD;
    public static ASSET_MASTER_RVW_UPLOAD_PAGING = PathConstant.ASSET_MASTER + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static ASSET_MASTER_RVW_UPLOAD_DETAIL = PathConstant.ASSET_MASTER + "/" + PathConstant.RVW_UPLOAD_DETAIL;
    public static ASSET_MASTER_CHILD = PathConstant.ASSET_MASTER + "/Child";
    //#endregion
    
    //#region Common-Setting
    public static CS_MASTER_TYPE = "MasterType";
    public static CS_MASTER_TYPE_DETAIL = PathConstant.CS_MASTER_TYPE + "/" + PathConstant.DETAIL;
    public static CS_MASTER = "Master";
    public static CS_MASTER_DETAIL = PathConstant.CS_MASTER + "/" + PathConstant.DETAIL;
    public static CS_GEN_SETTING = "GeneralSetting";
    public static CS_GEN_SETTING_DETAIL = PathConstant.CS_GEN_SETTING + "/" + PathConstant.DETAIL;
    public static CS_GEN_SETTING_ADMIN = "GeneralSettingAdmin";
    public static CS_GEN_SETTING_DETAIL_ADMIN = PathConstant.CS_GEN_SETTING_ADMIN + "/" + PathConstant.DETAIL;
    public static CS_CURRENCY = "Currency";
    public static CS_CURRENCY_PAGING = PathConstant.CS_CURRENCY + "/" + PathConstant.PAGING;
    public static CS_CURRENCY_ADD = PathConstant.CS_CURRENCY + "/" + PathConstant.ADD;
    public static CS_WORKING_HOUR = "WorkingHour";
    public static CS_WORKING_HOUR_ADD = PathConstant.CS_WORKING_HOUR + "/" + PathConstant.ADD;
    public static CS_WORKING_HOUR_DETAIL = PathConstant.CS_WORKING_HOUR + "/" + PathConstant.DETAIL;
    public static CS_HOLIDAY = "Holiday";
    public static CS_HOLIDAY_ADD = PathConstant.CS_HOLIDAY + "/" + PathConstant.ADD;
    public static CS_HOLIDAY_EDIT = PathConstant.CS_HOLIDAY + "/" + PathConstant.EDIT;
    public static CS_HOLIDAY_DETAIL = PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL;
    public static CS_HOLIDAY_DETAIL_ADD = PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL + "/" + PathConstant.ADD;
    public static CS_HOLIDAY_DETAIL_EDIT = PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL  + "/" + PathConstant.EDIT;
    public static CS_OFFICE_ZIPCODE_MBR = "OfficeZipcodeMember";
    public static CS_OFFICE_ZIPCODE_MBR_PAGING = PathConstant.CS_OFFICE_ZIPCODE_MBR + "/" + PathConstant.PAGING;
    public static CS_OFFICE_ZIPCODE_MBR_ADD = PathConstant.CS_OFFICE_ZIPCODE_MBR + "/" + PathConstant.ADD;
    public static CS_ECONOMIC_SECTOR = "EconomicSector";
    public static CS_ECONOMIC_SECTOR_PAGING = PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstant.PAGING;
    public static CS_ECONOMIC_SECTOR_DETAIL = PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstant.DETAIL;
    public static CS_REF_PROVINCE = "RefProvince";
    public static CS_REF_PROVINCE_PAGING = PathConstant.CS_REF_PROVINCE + "/" + PathConstant.PAGING;
    public static CS_REF_PROVINCE_DETAIL = PathConstant.CS_REF_PROVINCE + "/" + PathConstant.DETAIL;
    public static CS_DISTRICT = "District";
    public static CS_DISTRICT_PAGING = PathConstant.CS_DISTRICT + "/" + PathConstant.PAGING;
    public static CS_DISTRICT_DETAIL = PathConstant.CS_DISTRICT + "/" + PathConstant.DETAIL;
    public static CS_REF_STATUS = "RefStatus";
    public static CS_REF_STATUS_PAGING = PathConstant.CS_REF_STATUS + "/" + PathConstant.PAGING;
    public static CS_PROFESSION = "Profession";
    public static CS_PROFESSION_PAGING = PathConstant.CS_PROFESSION + "/" + PathConstant.PAGING;
    public static CS_PROFESSION_DETAIL = PathConstant.CS_PROFESSION + "/" + PathConstant.DETAIL;
    public static CS_INDUSTRY_TYPE = "IndustryType";
    public static CS_INDUSTRY_TYPE_PAGING = PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstant.PAGING;
    public static CS_INDUSTRY_TYPE_DETAIL = PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstant.DETAIL;
    public static CS_BANK = "Bank";
    public static CS_BANK_PAGING = PathConstant.CS_BANK + "/" + PathConstant.PAGING;
    public static CS_BANK_DETAIL = PathConstant.CS_BANK + "/" + PathConstant.DETAIL;
    public static CS_OFFICE_BANK_ACCOUNT_PAGING = PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstant.PAGING;
    public static CS_OFFICE_BANK_ACCOUNT_DETAIL = PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstant.DETAIL;
    public static CS_OFFICE_BANK_ACCOUNT_ACC_DETAIL = PathConstant.LR_OFFICE_BANK_ACC + "/AccDetail";
    public static CS_ZIPCODE = "Zipcode";
    public static CS_ZIPCODE_PAGING = PathConstant.CS_ZIPCODE + "/" + PathConstant.PAGING;
    public static CS_ZIPCODE_DETAIL = PathConstant.CS_ZIPCODE + "/" + PathConstant.DETAIL;
    public static CS_SCORE_CATEGORY = "ScoreCategory";
    public static CS_SCORE_CATEGORY_PAGING = PathConstant.CS_SCORE_CATEGORY + "/" + PathConstant.PAGING;
    public static CS_SCORE_CATEGORY_TYPE = PathConstant.CS_SCORE_CATEGORY + "/" + PathConstant.TYPE;
    public static CS_SCORE_CATEGORY_SCORE = PathConstant.CS_SCORE_CATEGORY + "/Score";
    public static CS_REASON = "Reason";
    public static CS_REASON_PAGING = PathConstant.CS_REASON + "/" + PathConstant.PAGING;
    public static CS_REASON_DETAIL = PathConstant.CS_REASON + "/" + PathConstant.DETAIL;
    public static CS_PAYMENT_ALLOC = "PaymentAlloc";
    public static CS_PAYMENT_ALLOC_PAGING = PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstant.PAGING;
    public static CS_PAYMENT_ALLOC_DETAIL = PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstant.DETAIL;
    public static CS_PAYMENT_ALLOC_GRP = "PaymentAllocGrp";
    public static CS_PAYMENT_ALLOC_GRP_PAGING = PathConstant.CS_PAYMENT_ALLOC_GRP + "/" + PathConstant.PAGING;
    public static CS_PAYMENT_ALLOC_GRP_DETAIL = PathConstant.CS_PAYMENT_ALLOC_GRP + "/" + PathConstant.DETAIL;
    public static CS_COA = "Coa";
    public static CS_COA_PAGING = PathConstant.CS_COA + "/" + PathConstant.PAGING;
    public static CS_COA_DETAIL = PathConstant.CS_COA + "/" + PathConstant.DETAIL;
    public static CS_COA_DETAIL_EDIT = PathConstant.CS_COA + "/" + PathConstant.DETAIL + "/" + PathConstant.EDIT;
    public static CS_COA_SCHM = "CoaScheme";
    public static CS_COA_SCHM_PAGING = PathConstant.CS_COA_SCHM + "/" + PathConstant.PAGING;
    public static CS_COA_SCHM_DETAIL = PathConstant.CS_COA_SCHM + "/" + PathConstant.DETAIL;
    public static CS_COA_SCHM_VIEW = PathConstant.CS_COA_SCHM + "/" + PathConstant.VIEW;
    //#endregion

    //#region Cust
    public static CUST_COY = "CustomerCompany";
    public static CUST_PERSONAL = "CustomerPersonal";
    public static CUST_MAIN_INFO = "MainInfo";
    public static CUST_DUP_CHECK = "DuplicateCheck";
    public static CUST_PAGE = "Page";
    public static CUST_ADDR = "Address";
    public static CUST_FORM = "Form";
    public static CUST_JOB_DATA = "JobData";
    public static CUST_NON_PRO = "NonPro";
    public static CUST_PERSONAL_MAIN_INFO = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_MAIN_INFO;
    public static CUST_PERSONAL_DUP_CHECK = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_DUP_CHECK;
    public static CUST_PERSONAL_PAGE = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_PAGE;
    public static CUST_PERSONAL_ADDR = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_ADDR;
    public static CUST_PERSONAL_ADDR_FORM = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_ADDR + "/" + PathConstant.CUST_FORM;
    public static CUST_PERSONAL_JOB_DATA = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_JOB_DATA;
    public static CUST_PERSONAL_JOB_DATA_NON_PRO = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_JOB_DATA + "/" + PathConstant.CUST_NON_PRO;
    public static CUST_COY_MAIN_INFO = PathConstant.CUST_COY + "/" + PathConstant.CUST_MAIN_INFO;
    public static CUST_COY_DUP_CHECK = PathConstant.CUST_COY + "/" + PathConstant.CUST_DUP_CHECK;
    public static CUST_COY_PAGE = PathConstant.CUST_COY + "/" + PathConstant.CUST_PAGE;
    public static CUST_COY_ADDR = PathConstant.CUST_COY + "/" + PathConstant.CUST_ADDR;
    public static CUST_COY_ADDR_FORM = PathConstant.CUST_COY + "/" + PathConstant.CUST_ADDR + "/" + PathConstant.CUST_FORM;
    public static CUST_EDIT_MAIN_DATA = "EditMainData";
    public static CUST_EDIT_MAIN_DATA_PAGING = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstant.PAGING;
    public static CUST_EDIT_MAIN_DATA_PERSONAL = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstant.PERSONAL;
    public static CUST_EDIT_MAIN_DATA_COY = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstant.COY;
    public static CUST_FAMILY = "CustFamily";
    public static CUST_FAMILY_PAGING = PathConstant.CUST_FAMILY + "/" + PathConstant.PAGING;
    public static CUST_SHRHLDR = "CustShareholder";
    public static CUST_SHRHLDR_PAGING = PathConstant.CUST_SHRHLDR + "/" + PathConstant.PAGING;
    public static CUST_GUARANTOR = "CustGuarantor";
    public static CUST_GUARANTOR_PAGING = PathConstant.CUST_GUARANTOR + "/" + PathConstant.PAGING;
    public static CUST_UPDATE_DATA = "UpdateDataCustomer";
    public static CUST_UPDATE_DATA_PAGING = PathConstant.CUST_UPDATE_DATA + "/" + PathConstant.PAGING;
    public static CUST_UPDATE_DATA_DETAIL = PathConstant.CUST_UPDATE_DATA + "/" + PathConstant.DETAIL;
    public static CUST_NEG = "NegativeCustomer";
    public static CUST_NEG_PAGING = PathConstant.CUST_NEG + "/" + PathConstant.PAGING;
    public static CUST_NEG_DETAIL = PathConstant.CUST_NEG + "/" + PathConstant.DETAIL;
    public static CUST_NEG_VIEW = PathConstant.CUST_NEG + "/" + PathConstant.VIEW;
    public static CUST_NEG_UPLOAD = PathConstant.CUST_NEG + "/" + PathConstant.UPLOAD;
    public static CUST_NEG_RVW_UPLOAD_PAGING = PathConstant.CUST_NEG + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static CUST_NEG_RVW_UPLOAD_DETAIL = PathConstant.CUST_NEG + "/" + PathConstant.RVW_UPLOAD_DETAIL;
    public static CUST_VIEW = "CustomerView";
    public static CUST_VIEW_PAGE = PathConstant.CUST_VIEW + "/" + PathConstant.CUST_PAGE;
    //#endregion
    
    //#region COY
    public static COY_BOD = "Bod";
    public static COY_BOD_ADD = PathConstant.COY_BOD + "/" + PathConstant.ADD;
    public static COY_COMMISSIONER = "Commissioner";
    public static COY_COMMISSIONER_ADD = PathConstant.COY_COMMISSIONER + "/" + PathConstant.ADD;
    //#endregion

    //#region Dashboard-Module
    public static DASHBOARD1 = "DashBoard1";
    public static DASHBOARD2 = "DashBoard2";
    public static DASHBOARD = "Dash-Board";
    //#endregion
    
    //#region Document-Management-Module
    public static CABINET = "Cabinet";
    public static CABINET_PAGING = PathConstant.CABINET + "/" + PathConstant.PAGING;
    public static CABINET_ADD_EDIT = PathConstant.CABINET + "/" + PathConstant.ADD_EDIT;
    public static RACK = "Rack";
    public static RACK_PAGING = PathConstant.RACK + "/" + PathConstant.PAGING;
    public static RACK_ADD_EDIT = PathConstant.RACK + "/" + PathConstant.ADD_EDIT;
    public static FILING = "Filing";
    public static FILING_PAGING = PathConstant.FILING + "/" + PathConstant.PAGING;
    public static FILING_ADD_EDIT = PathConstant.FILING + "/" + PathConstant.ADD_EDIT;
    public static VIEW_CABINET = "ViewCabinet";
    public static VIEW_RACK = "ViewRack";
    //#endregion

    //#region Employee-Module
    public static EMP_POS = "EmployeePosition";
    public static EMP_POS_DETAIL = PathConstant.EMP_POS + "/" + PathConstant.DETAIL;
    public static LEAVE = "Leave";
    public static LEAVE_PAGING = PathConstant.LEAVE + "/" + PathConstant.PAGING;
    public static LEAVE_ADD = PathConstant.LEAVE + "/" + PathConstant.ADD;
    public static LEAVE_EDIT = PathConstant.LEAVE + "/" + PathConstant.EDIT;
    public static EMP_BZ_UNIT = "EmployeeBusinessUnit";
    public static EMP_BZ_UNIT_PAGING = PathConstant.EMP_BZ_UNIT + "/" + PathConstant.PAGING;
    public static EMP_BZ_UNIT_ADD = PathConstant.EMP_BZ_UNIT + "/" + PathConstant.ADD;
    //#endregion
    
    //#region Integration-Module
    public static SEND_DAILY_MASTER = "SendDailyMaster";
    //#endregion
    
    //#region Office-Module
    public static OFFICE_EMP_POS = "OfficeEmpPos";
    public static OFFICE_EMP_POS_ADD = "OfficeEmpPosAdd";
    public static OFFICE_AREA = "OfficeArea";
    public static OFFICE_AREA_DETAIL = PathConstant.OFFICE_AREA + "/" + PathConstant.DETAIL;
    public static OFFICE_AREA_MEMBER = PathConstant.OFFICE_AREA + "/" + PathConstant.MEMBER;
    public static OFFICE_AREA_MEMBER_ADD = PathConstant.OFFICE_AREA + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static OFFICE_GROUP_MEMBER = PathConstant.GROUP + "/" + PathConstant.MEMBER;
    public static OFFICE_GROUP_MEMBER_ADD = PathConstant.GROUP + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    //#endregion

    //#region Organization-Module
    public static JOB_TITLE = "JobTitle";
    public static JOB_TITLE_DETAIL = PathConstant.JOB_TITLE + "/" + PathConstant.DETAIL;
    public static BZ_UNIT = "BusinessUnit";
    public static BZ_UNIT_DETAIL = PathConstant.BZ_UNIT + "/" + PathConstant.DETAIL;
    public static BZ_UNIT_EDIT = PathConstant.BZ_UNIT + "/" + PathConstant.EDIT;
    public static BZ_UNIT_MEMBER = PathConstant.BZ_UNIT + "/" + PathConstant.MEMBER;
    //#endregion

    //#region Product-Module
    public static PROD_OFFERING = "ProdOffering";
    public static PROD_OFFERING_PAGING = PathConstant.PROD_OFFERING + "/" + PathConstant.PAGING;
    public static PROD_OFFERING_RTN_PAGING = PathConstant.PROD_OFFERING + "/" + PathConstant.RTN_PAGING;
    public static PROD_OFFERING_ADD = PathConstant.PROD_OFFERING + "/" + PathConstant.ADD;
    public static PROD_OFFERING_ADD_DETAIL = PathConstant.PROD_OFFERING + "/" + PathConstant.ADD_DETAIL;
    public static HO_PAGING = "HOPaging";
    public static HO_RTN_PAGING = "HOReturnPaging";
    public static HO_ADD = "HOAdd";
    public static HO_ADD_DETAIL = "HOAddDetail";
    public static HO_DEACTIVATE = "HODeactivate";
    public static HO_DEACTIVATE_EDIT = PathConstant.HO_DEACTIVATE + "/" + PathConstant.EDIT;
    public static HO_VIEW = "HOView";
    public static OFFERING_VIEW = "OfferingView";
    public static HO_APPRV = "HOApproval";
    public static HO_APPRV_DETAIL = PathConstant.HO_APPRV + "/" + PathConstant.DETAIL;
    public static OFFERING_APPRV = "OfferingApproval";
    public static OFFERING_APPRV_DETAIL = PathConstant.OFFERING_APPRV + "/" + PathConstant.DETAIL;
    public static HO_DEACTIVATE_APPRV = "HODeactivateApproval";
    public static HO_DEACTIVATE_APPRV_DETAIL = PathConstant.HO_DEACTIVATE_APPRV + "/" + PathConstant.DETAIL;
    public static OFFERING_DEACTIVATE = "OfferingDeactivate";
    public static OFFERING_DEACTIVATE_EDIT = PathConstant.HO_DEACTIVATE_APPRV + "/" + PathConstant.EDIT;
    public static OFFERING_DEACTIVATE_APPRV = "OfferingDeactivateApproval";
    public static OFFERING_DEACTIVATE_APPRV_DETAIL = PathConstant.OFFERING_DEACTIVATE_APPRV + "/" + PathConstant.DETAIL;
    public static HO_REVIEW = "HOReview";
    public static HO_REVIEW_DETAIL = PathConstant.HO_REVIEW + "/" + PathConstant.DETAIL;
    public static OFFERING_REVIEW = "OfferingReview";
    public static OFFERING_REVIEW_DETAIL = PathConstant.OFFERING_REVIEW + "/" + PathConstant.DETAIL;
    //#endregion

    //#region Survey-Module
    public static SRVY_TASK = "Task";
    public static SRVY_VIEW_TASK = PathConstant.VIEW + "/" + PathConstant.SRVY_TASK;
    public static VIEW_ORDER_EXT = "ViewOrderExternal";
    //#endregion

    //#region 
    public static SURVEYOR = "Surveyor";
    public static SURVEYOR_PAGING = PathConstant.SURVEYOR + "/" + PathConstant.PAGING
    public static SURVEYOR_ADD = PathConstant.SURVEYOR + "/" + PathConstant.ADD

    //#region System-Setting-Module
    public static NOTIF = "Notification";
    public static NOTIF_DETAIL = PathConstant.NOTIF + "/" + PathConstant.DETAIL;
    public static NOTIF_APPRV = "NotificationApproval";
    public static NOTIF_APPRV_DETAIL = PathConstant.NOTIF_APPRV + "/" + PathConstant.DETAIL;
    public static REF_USER = "RefUser";
    public static ROLE = "Role";
    public static ROLE_DETAIL = PathConstant.ROLE + "/" + PathConstant.DETAIL;
    public static USER_ROLE = "UserRole";
    public static ROLE_USER = "RoleUser";
    public static ROLE_FORM = "RoleForm";
    public static ROLE_FORM_ADD = PathConstant.ROLE_FORM + "/" + PathConstant.ADD;
    public static CHANGE_PASSWORD = "ChangePassword";
    public static REF_FORM = "RefForm";
    public static ROLE_MAP = "RoleMapping";
    public static REF_FORM_PAGING = PathConstant.REF_FORM + "/" + PathConstant.PAGING;
    public static REF_FORM_DETAIL = PathConstant.REF_FORM + "/" + PathConstant.DETAIL;
    public static REF_FORM_ROLE_MAP = PathConstant.REF_FORM + "/" + PathConstant.ROLE_MAP;
    public static REF_FORM_ROLE_MAP_ADD = PathConstant.REF_FORM + "/" + PathConstant.ROLE_MAP + "/" + PathConstant.ADD;
    public static SYS_ATTR = "Attribute";
    public static SYS_ATTR_PAGING = PathConstant.SYS_ATTR + "/" + PathConstant.PAGING;
    public static SYS_ATTR_DETAIL = PathConstant.SYS_ATTR + "/" + PathConstant.DETAIL;
    //#endregion

    //#region Upload-Module
    public static UPLOAD_MONITORING_PAGING = "UploadMonitoringPaging";
    public static UPLOAD_SETTING_PAGING = "UploadSettingPaging";
    public static UPLOAD_SETTING_EDIT = "UploadSettingEdit";
    //#endregion

    //#region Vendor-Module
    public static VENDOR_REG = "Registration";
    public static VENDOR_EMP = "Employee";
    public static VENDOR_LIST = "List";
    public static VENDOR_BRANCH = "Branch";
    public static VENDOR_BRANCH_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.PAGING;
    public static VENDOR_BRANCH_ADD = PathConstant.VENDOR_BRANCH + "/" + PathConstant.ADD;
    public static VENDOR_BRANCH_REG = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_BRANCH_VIEW = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VIEW;
    public static VENDOR_BRANCH_EMP_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.PAGING;
    public static VENDOR_BRANCH_EMP_DETAIL = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.DETAIL;
    public static VENDOR_BRANCH_MBR_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstant.PAGING;
    public static VENDOR_BRANCH_MBR_ADD = PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static VENDOR_CONTACT_PERSON = "ContactPerson";
    public static VENDOR_CONTACT_PERSON_ADD = PathConstant.VENDOR_CONTACT_PERSON + "/" + PathConstant.ADD;
    public static VENDOR_CONTACT_PERSON_EDIT = PathConstant.VENDOR_CONTACT_PERSON + "/" + PathConstant.EDIT;
    public static VENDOR_CONTACT_PERSON_LIST = PathConstant.VENDOR_CONTACT_PERSON + "/" + PathConstant.VENDOR_LIST;
    public static VENDOR_HOLDING = "Holding";
    public static VENDOR_HOLDING_PAGING = PathConstant.VENDOR_HOLDING + "/" + PathConstant.PAGING;
    public static VENDOR_HOLDING_DETAIL = PathConstant.VENDOR_HOLDING + "/" + PathConstant.DETAIL;
    public static VENDOR_HOLDING_REG = PathConstant.VENDOR_HOLDING + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_HOLDING_VIEW = PathConstant.VENDOR_HOLDING + "/" + PathConstant.VIEW;
    public static VENDOR_GRP_PAGING = PathConstant.GROUP + "/" + PathConstant.PAGING;
    public static VENDOR_GRP_ADD = PathConstant.GROUP + "/" + PathConstant.ADD;
    public static VENDOR_GRP_VIEW = PathConstant.GROUP + "/" + PathConstant.VIEW;
    public static VENDOR_GRP_MBR = "GroupMbr";
    public static VENDOR_GRP_MBR_ADD = PathConstant.VENDOR_GRP_MBR + "/" + PathConstant.ADD;
    public static VENDOR_SCHM = "VendorScheme";
    public static VENDOR_SCHM_PAGING = PathConstant.VENDOR_SCHM + "/" + PathConstant.PAGING;
    public static VENDOR_SCHM_DETAIL = PathConstant.VENDOR_SCHM + "/" + PathConstant.DETAIL;
    public static VENDOR_SCHM_MBR = PathConstant.VENDOR_SCHM + "/" + PathConstant.MEMBER;
    public static VENDOR_SCHM_MBR_ADD = PathConstant.VENDOR_SCHM + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static VENDOR_HO = "HO";
    public static VENDOR_HO_PAGING = PathConstant.VENDOR_HO + "/" + PathConstant.PAGING;
    public static VENDOR_HO_DETAIL = PathConstant.VENDOR_HO + "/" + PathConstant.DETAIL;
    public static VENDOR_HO_REG = PathConstant.VENDOR_HO + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_VIEW_HO = PathConstant.VIEW + "/" + "VendorHO";
    public static VENDOR_ATPM = "ATPM";
    public static VENDOR_ATPM_DETAIL = PathConstant.VENDOR_ATPM + "/" + PathConstant.DETAIL;
    public static VENDOR_ATPM_REG = PathConstant.VENDOR_ATPM + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_AUCTION_COY = "AuctionCompany";
    public static VENDOR_AUCTION_COY_PAGING = PathConstant.VENDOR_AUCTION_COY + "/" + PathConstant.PAGING;
    public static VENDOR_AUCTION_COY_ADD_EDIT = PathConstant.VENDOR_AUCTION_COY + "/" + PathConstant.ADD_EDIT;
    //#endregion
    
    //#region Verif-Module
    public static QA = "QuestionAnswer";
    public static QA_PAGING = PathConstant.QA + "/" + PathConstant.PAGING;
    public static QA_ADD = PathConstant.QA + "/" + PathConstant.ADD;
    public static QA_EDIT = PathConstant.QA + "/" + PathConstant.EDIT;
    public static QA_GRP = "QuestionGroup";
    public static QA_GRP_PAGING = PathConstant.QA_GRP + "/" + PathConstant.PAGING;
    public static QA_GRP_ADD = PathConstant.QA_GRP + "/" + PathConstant.ADD;
    public static QA_GRP_EDIT = PathConstant.QA_GRP + "/" + PathConstant.EDIT;
    public static QA_GRP_MBR = "QuestionGroupMember";
    public static QA_GRP_MBR_PAGING = PathConstant.QA_GRP_MBR + "/" + PathConstant.PAGING;
    public static QA_GRP_MBR_ADD = PathConstant.QA_GRP_MBR + "/" + PathConstant.ADD;
    public static QA_GRP_MBR_EDIT = PathConstant.QA_GRP_MBR + "/" + PathConstant.EDIT;
    public static QA_SCHM = "QuestionScheme";
    public static QA_SCHM_PAGING = PathConstant.QA_SCHM + "/" + PathConstant.PAGING;
    public static QA_SCHM_ADD = PathConstant.QA_SCHM + "/" + PathConstant.ADD;
    public static QA_SCHM_EDIT = PathConstant.QA_SCHM + "/" + PathConstant.EDIT;
    public static QA_SCHM_MBR = "QuestionSchemeMember";
    public static QA_SCHM_MBR_PAGING = PathConstant.QA_SCHM_MBR + "/" + PathConstant.PAGING;
    public static QA_SCHM_MBR_ADD = PathConstant.QA_SCHM_MBR + "/" + PathConstant.ADD;
    public static QA_SCHM_MBR_EDIT = PathConstant.QA_SCHM_MBR + "/" + PathConstant.EDIT;
    //#endregion

    //#region View-Module
    public static VIEW_CUST = "Customer";
    public static VIEW_OFFERING = "Offering";
    public static VIEW_VENDOR = "Vendor";
    public static VIEW_NEG_CUST = "NegativeCustomer";
    public static VIEW_PRODUCT_HO = "ProductHO";
    public static VIEW_SRVY = "Survey";
    public static VIEW_CUST_EXPSR = "CustExposureView";
    //#endregion

    //#region View-Vendor-Module
    public static VIEW_VENDOR_BRANCH = "VendorBranch";
    public static VIEW_VENDOR_HOLDING = "VendorHolding";
    public static VIEW_VENDOR_HO = "VendorHO";
    //#endregion

    //#region View-Survey-Module
    public static VIEW_SRVY_ORDER = "SurveyOrder";
    public static VIEW_SRVY_TASK = "SurveyTask";
    //#endregion

    //#region View-Cust-Module
    public static VIEW_CUST_PERSONAL_DETAIL = "PersonalDetail";
    public static VIEW_CUST_PERSONAL_CONTACT_PERSON = "PersonalContactPerson";
    public static VIEW_CUST_PERSONAL_JOB_DATA = "PersonalJobData";
    public static VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF = "PersonalJobDataNonProf";
    public static VIEW_CUST_PERSONAL_JOB_DATA_EMP = "PersonalJobDataEmp";
    public static VIEW_CUST_PERSONAL_JOB_DATA_SME = "PersonalJobDataSme";
    public static VIEW_CUST_PERSONAL_FINANCIAL_DATA = "PersonalFinancialData";
    public static VIEW_CUST_COY_OTHER = "CoyOther";
    public static VIEW_CUST_PERSONAL_APP_LISTING = "PersonalAppListing";
    public static VIEW_CUST_COY_DETAIL = "CoyDetail";
    public static VIEW_CUST_ADDR = "Address";
    public static VIEW_CUST_COY_MNGMNT = "CoyManagement";
    public static VIEW_CUST_COY_CONTACT = "CoyContact";
    public static VIEW_CUST_COY_FINANCIAL = "CoyFinancial";
    public static VIEW_CUST_COY_LEGAL = "CoyLegal";
    public static VIEW_CUST_GRP = "CustomerGroup";
    public static VIEW_CUST_DOC = "CustDocument";
    public static VIEW_CUST_OTH_INFO = "CustOthInfo";
    //#endregion
}