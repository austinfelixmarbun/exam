
export class CommonConstant {

    // APPLICATION DATA
    public static USER_ACCESS = "UserAccess";
    public static USER_NAME = "UserName";
    public static BUSINESS_DT = "BusinessDt";
    public static BUSINESS_DATE = "BusinessDate";
    public static BUSINESS_DATE_RAW = "BusinessDateRaw";
    public static CURRENT_USER_CONTEXT = "currentUserContext"
    public static PAGE_ACCESS = "PageAccess";
    public static TOKEN = "Token";
    public static LOCAL_IP = "LocalIp"; 
    public static VERSION = "Version";
    public static LAST_ACCESS_TIME = "LastAccessTime";
    public static MENU = "Menu"
    public static ReturnObj = 'ReturnObject';

    //APPROVAL TASK MAPPER - TRX TYPE
    public static ApvTrxTypeProductHO = "PROD_HO_APV";
    public static ApvTrxTypeProductHODeact = "PROD_HO_DEACT_APV";
    public static ApvTrxTypeProductOffering = "PROD_OFF_APV";
    public static ApvTrxTypeProductOfferingDeact = "PROD_OFF_DEACT_APV";

    //Behaviour Type
    public static BehaviourTypeLock = "LOCK";
    public static BehaviourTypeMin = "MIN";
    public static BehaviourTypeMax = "MAX";
    public static BehaviourTypeDefault = "DEFAULT";

    // ProductDeact
    public static PROD_REASON_DEACT = "PROD_DEACT"

    //Product Status
    public static ProdStatApproval = "APVL";
    public static ProdStatReqDeact = "REQD";

    // Customer Type
    public static CustomerPersonal = "PERSONAL";
    public static CustomerCompany = "COMPANY";

    public static MR_MARITAL_STAT_CODE_MARRIED = "MARRIED";
    public static MR_MARITAL_STAT_CODE_SINGLE = "SINGLE";
    public static MR_CUST_TYPE_CODE_PERSONAL = "PERSONAL";
    public static MR_CUST_TYPE_CODE_COMPANY = "COMPANY";

    public static RefReasonTypeCodeProdDeactivate = "PROD_DEACT";

    // BOOLEAN CONDITION
    public static TRUE_CONDITION = "1";
    public static FALSE_CONDITION = "0";

    // VENDOR CATEGORY
    public static SUPPLIER_BRANCH = "SUPPLIER_BRANCH";
    public static ASSET_INSCO_BRANCH = "ASSET_INSCO_BRANCH";
    public static LIFE_INSCO_BRANCH = "LIFE_INSCO_BRANCH";
    public static SURVEYOR_BRANCH = "SURVEYOR_BRANCH";
    public static AGENCY_COMPANY = "AGENCY_COMPANY";
    public static AGENCY_PERSONAL = "AGENCY_PERSONAL";
    public static ASSET_INSCO_HO = "ASSET_INSCO_HO";
    public static LIFE_INSCO_HO = "LIFE_INSCO_HO";
    public static SUPPLIER_HO = "SUPPLIER_HO";
    public static SURVEYOR_HO = "SURVEYOR_HO";
    public static SUPPLIER_HOLDING = "SUPPLIER_HOLDING";
    public static SUPPLIER_ATPM = "SUPPLIER_ATPM";

    public static TITLE_SUPPLIER_ATPM = "Supplier ATPM";
    public static TITLE_SUPPLIER_BRANCH = "Supplier Branch";
    public static TITLE_ASSET_INSCO_BRANCH = "Insurance Branch";
    public static TITLE_LIFE_INSCO_BRANCH = "Life Insurance Branch";
    public static TITLE_SURVEYOR_BRANCH = "Surveyor Branch";
    public static TITLE_AGENCY_COMPANY = "Agency Company";
    public static TITLE_AGENCY_PERSONAL = "Agency Personal";

    // NOTIFICATION METHOD
    public static NotificationMethodIntLink = "INT_LINK";
    public static NotificationMethodExtLink = "EXT_LINK";
    //OFFICE TYPE
    public static HeadOffice = "HO";
    public static CollectionGroup = "CG";
    public static ATPM = "ATPM";
    public static Holding = "HOLDING";
    public static Branch = "BRANCH";
    
    //REF PROV DISTRICT
    public static RefProvDistrictTypeDis = "DIS";
    public static RefProvDistrictTypePrv = "PRV";

    // REF MASTER TYPE
    public static RefMasterTypeCodeSourceIncome = "SOURCE_OF_INCOME";
    public static RefMasterTypeCodeCustCompanyRelationship = "CUST_COMPANY_RELATIONSHIP";
    public static RefMasterTypeCodeCustPersonalRelationship = "CUST_PERSONAL_RELATIONSHIP";
    public static RefMasterTypeCodeCustRelationship = "CUST_RELATIONSHIP";
    public static RefMasterTypeCodeCustType = "CUST_TYPE";
    public static RefMasterTypeCodeLegalDocType = "LEGAL_DOC_TYPE";
    public static RefMasterTypeCodeCustAddrType = "CUST_ADDR_TYPE";
    public static RefMasterTypeCodeAddrType = "ADDR_TYPE";
    public static RefMasterTypeCodeJobPosition = "JOB_POSITION";
    public static RefMasterTypeCodeGender = "GENDER";
    public static RefMasterTypeCodeCustModel = "CUST_MODEL"
    public static RefMasterTypeCodeCompanyType = "COMPANY_TYPE";
    public static RefMasterTypeCodeIdType = "ID_TYPE";
    public static RefMasterTypeCodeNationality = "NATIONALITY";
    public static RefMasterTypeCodeMaritalStat = "MARITAL_STAT";
    public static RefMasterTypeCodeEducation = "EDUCATION";
    public static RefMasterTypeCodeReligion = "RELIGION";
    public static RefMasterTypeCodeSalutation = "SALUTATION";
    public static RefMasterTypeCodeJobStat = "JOB_STAT"
    public static RefMasterTypeCodeCoyScale = "COY_SCALE"
    public static RefMasterTypeCodeNegCustType = "NEG_CUST_TYPE";
    public static RefMasterTypeCodeNegCustSource = "NEG_CUST_SOURCE";
    public static RefMasterTypeCodeSkillLvl = "SKILL_LVL"
    public static RefMasterTypeCodeOfficeClass = "OFFICE_CLASS";
    public static RefMasterTypeCodeOfficeType = "OFFICE_TYPE";

    public static RefMasterTypeCodeCenterGrpType = "CENTER_GRP_TYPE";

    public static RefMasterTypeCodeKonvenSyariah = "KONVEN_SYARIAH";
    public static RefMasterTypeCodeNegAssetSource = "NEG_ASSET_SOURCE";
    public static RefMasterTypeCodeAssetTypeId = "ASSET_TYPE_ID";


    public static RefMasterTypeCodeNotificationType = "NOTIFICATION_TYPE";
    public static RefMasterTypeCodeNotificationMethod = "NOTIFICATION_METHOD";
    public static RefMasterTypeCodeVendorPosition = "VENDOR_POSITION";
    public static RefMasterTypeCodeTaxCalcMethod = "TAX_CALC_METHOD";
    

    public static RefMasterTypeCodeVendorCategory = "VENDOR_CATEGORY";
    public static RefMasterTypeCodeMaxRefundType = "MAX_REFUND_TYPE";
    public static RefMasterTypeCodeAssgmntType = "ASSGMNT_TYPE";
    public static RefMasterTypeCodeSupplierClass = "SUPPLIER_CLASS";

    
    public static RefMasterTypeCodeSupplierUpCalcMethod = "SUPPLIER_UP_CALC_METHOD";
    public static RefMasterTypeCodeVendorType = "VENDOR_TYPE";
    public static RefMasterTypeCodeIdTypeVendor = "ID_TYPE_VENDOR";
    public static RefMasterTypeCodeTaskAssignmentType = "TASK_ASSIGNMENT_TYPE";

    public static RefMasterTypeCodeScoreTrxType = "SCORE_TRX_TYPE";
    public static RefMasterTypeCodeAttrInputType = "ATTR_INPUT_TYPE";
    public static RefMasterTypeCodeRegularExpression = "REGULAR_EXPRESSION";
    
    // NATIONALITY CODE
    public static NationalityCodeLocal = "LOCAL"
    // GENERAL SETTING CODE
    public static GSCodeDefLocalNationality = "DEF_LOCAL_NATIONALITY";
    public static GsCodePasswordRegex = "PASSWORD_REGEX";

    // WNA COUNTRY CODE
    public static WnaCountryCodeIdn = "IDN";
    // CUST TYPE
    public static CustTypePersonal = "PERSONAL";
    public static CustTypeCompany = "COMPANY";

    // CUST ADDR TYPE 
    public static CustAddrTypeLegal = "LEGAL";
    public static CustAddrTypeContact = "CONTACT";
    public static CustAddrTypeResidence = "RESIDENCE";
    public static CustAddrTypeJob = "JOB";
    public static CustAddrTypeOthBiz = "OTH_BIZ";
    public static CustAddrTypePreJob = "PREV_JOB";


    // ADDR TYPE 
    public static AddrTypeLegal = "LEGAL";
    public static AddrTypeTax = "TAX";

    public static FROM = 'From';
    public static TO = 'To';
    public static BETWEEN = 'In Between';

    public static GTE = "Greater Than Equal";
    public static GT = "Greater Than";
    public static LTE = "Less Than Equal";
    public static LT = "Less Than";

    //Status Code
    public static STATUS_CODE_USER_LOCKED = "002";

    //Attribute Type Code
    public static AttrTypeCodeMaster = "MASTER";
}
