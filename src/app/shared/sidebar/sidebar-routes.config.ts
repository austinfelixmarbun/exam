import { RouteInfo } from './sidebar.metadata';
import { CommonConstant } from '../constant/CommonConstant';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  { Path: '/dashboard/dash-board', Title: 'Menu', Icon: 'ft-home', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : [] },
  {
    Path: '', Title: 'Organization', Icon: 'ft-bar-chart-2', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/Office/Paging', Title: 'Office', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : [] },
      { Path: '/Office/OfficeArea', Title: 'Office Area', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Organization/BusinessUnit', Title: 'Business unit', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Organization/JobTitle', Title: 'Job Title', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Employee/Paging', Title: 'Employee', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Employee/Leave/Paging', Title: 'Employee Leave', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : [] },
      { Path: '/SystemSetting/Role', Title: 'Role', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  }

    ], Params : [] 
  },
  {
    Path: '', Title: 'System Setting', Icon: 'ft-users', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/CommonSetting/GeneralSetting', Title: 'General Setting', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] , Params : [] },
      { Path: '/CommonSetting/Holiday', Title: 'Holiday Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] , Params : [] },
      { Path: '/CommonSetting/WorkingHour', Title: 'Working Hour', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/Bank/Paging', Title: 'Bank', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/RefProvince/Paging', Title: 'Province', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/Zipcode/Paging', Title: 'Zipcode', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/Master', Title: 'Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/RefStatus/Paging', Title: 'Status', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/IndustryType/Paging', Title: 'Industry Type', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/EconomicSector/Paging', Title: 'Economic Sector', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/Currency/Paging', Title: 'Currency', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/CommonSetting/Profession/Paging', Title: 'Profession', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/SystemSetting/Notification', Title: 'Notification', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/SystemSetting/NotificationApproval', Title: 'Notification Approval', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/SystemSetting/RefForm/Paging', Title: 'Ref Form', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/SystemSetting/Attribute/Paging', Title: 'Attribute Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  }
    ], Params : [] 
  },
  {
    Path: '', Title: 'Asset', Icon: 'ft-aperture', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/Asset/Configuration/Paging', Title: 'Asset Configuration', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/DocumentMaster/Paging', Title: 'Asset Document Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/NegativeAsset/Paging', Title: 'Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/AssetMaster/Paging', Title: 'Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/Scheme/Paging', Title: 'Asset Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/Type/Paging', Title: 'Asset Type', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/AssetMaster/Upload', Title: 'Upload Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/AssetMaster/ReviewUploadPaging', Title: 'Review Upload Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/NegativeAsset/Upload', Title: 'Upload Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Asset/NegativeAsset/ReviewUploadPaging', Title: 'Review Upload Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
    ], Params : [] 
  },
  {
    Path: '', Title: 'Vendor', Icon: 'ft-briefcase', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      {
        Path: '', Title: 'Supplier', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [
          
          { Path: '/Vendor/Paging', Title: 'Supplier ATPM', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_ATPM }] },
          { Path: '/Vendor/Paging', Title: 'Supplier Holding', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_HOLDING }] },
          { Path: '/Vendor/Paging', Title: 'Supplier HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_HO }] },
          { Path: '/Vendor/Paging', Title: 'Supplier Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_BRANCH }] },
          { Path: '/Vendor/Paging', Title: 'Supplier Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_BRANCH }] },
          { Path: '/Vendor/Paging', Title: 'Supplier Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_BRANCH }] },
      
        ], Params : [] 
      },{
        Path: '', Title: 'Asset Insurance', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [
          
          { Path: '/Vendor/Paging', Title: 'Insurance HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_HO }] },
          { Path: '/Vendor/Paging', Title: 'Insurance Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_BRANCH }] },
          { Path: '/Vendor/Paging', Title: 'Insurance Branch Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" },{ Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_BRANCH }] },
          { Path: '/Vendor/Paging', Title: 'Insurance Branch Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_BRANCH }] },
      
        ], Params : [] 
      },{
        Path: '', Title: 'Life Insurance', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [
          
          { Path: '/Vendor/Paging', Title: 'Life Insurance HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_HO }] },
          { Path: '/Vendor/Paging', Title: 'Life Insurance Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_BRANCH }] },      
          { Path: '/Vendor/Paging', Title: 'Life Insurance Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_BRANCH }] },      
          { Path: '/Vendor/Paging', Title: 'Life Insurance Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [],  Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_BRANCH }] },      
        ], Params : [] 
      },
      {
        Path: '', Title: 'Surveyor', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [
          
          { Path: '/Vendor/Paging', Title: 'Surveyor HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_HO }] },
          { Path: '/Vendor/Paging', Title: 'Surveyor Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_BRANCH }] },  
          { Path: '/Vendor/Paging', Title: 'Surveyor Branch Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_BRANCH }] },      
          { Path: '/Vendor/Paging', Title: 'Surveyor Branch Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_BRANCH }] },   
        ], Params : [] 
      },
      {
        Path: '', Title: 'Agency', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [
          
          { Path: '/Vendor/Paging', Title: 'Agency Personal', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_PERSONAL }] },
          { Path: '/Vendor/Paging', Title: 'Agency Company', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_COMPANY }] },  
          { Path: '/Vendor/Paging', Title: 'Agency Personal Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_PERSONAL }] },      
          { Path: '/Vendor/Paging', Title: 'Agency Company Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_COMPANY }] },      
          { Path: '/Vendor/Paging', Title: 'Agency Personal Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_PERSONAL }] }, 
          { Path: '/Vendor/Paging', Title: 'Agency Company Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_COMPANY }] }, 
      
        ], Params : [] 
      },
    ], Params : [] 
  },
  {
    Path: '', Title: 'Product', Icon: 'ft-package', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/Product/HOpaging', Title: 'Product HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/HOReview', Title: 'Product HO Review', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/HOApproval', Title: 'Product HO Approval', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/HOReturnPaging', Title: 'Product HO Return', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/HODeactivate', Title: 'Product HO Deactivation', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/HODeactivateApproval', Title: 'Product HO Deactivate Approval', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/ProdOffering/Paging', Title: 'Product Offering', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/OfferingReview', Title: 'Product Offering Review', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/OfferingApproval', Title: 'Product Offering Approval', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/ProdOffering/Returnpaging', Title: 'Product Offering Return', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/OfferingDeactivate', Title: 'Product Offering Deactivation', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Product/OfferingDeactivateApproval', Title: 'Product Offering Deactivate Approval', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  }
      
    ], Params : [] 
  },
  {
    Path: '', Title: 'Survey', Icon: 'ft-clipboard', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/Survey/Paging', Title: 'Survey Order', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  }
      
    ], Params : [] 
  },
  {
    Path: '', Title: 'Verification', Icon: 'ft-layers', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/Verification/QuestionAnswer/Paging', Title: 'Question Answer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Verification/QuestionScheme/Paging', Title: 'Question Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Verification/QuestionGroup/Paging', Title: 'Question Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  }
      
    ], Params : [] 
  },
  
  {
    Path: '', Title: 'Customer', Icon: 'ft-user', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/Customer/Paging', Title: 'Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },
      { Path: '/Customer/EditMainData/Paging', Title: 'Edit Main Data Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },  
      { Path: '/Customer/NegativeCustomer/Paging', Title: 'Negative Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },   
      { Path: '/Customer/NegativeCustomer/Upload', Title: 'Upload Negative Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },         
      { Path: '/Customer/NegativeCustomer/ReviewUploadPaging', Title: 'Review Upload Negative Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },      
    ], Params : [] 
  },
  {
    Path: '', Title: 'Integration', Icon: 'ft-home', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: '/Integration/SendDailyMaster', Title: 'Send Daily Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: CommonConstant.DailyMasterTypeSingle }] },
      { Path: '/Integration/SendDailyMaster', Title: 'Send Daily Master With Range Date', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: CommonConstant.DailyMasterTypeRange }] },
    ], Params: []
  },
  // {
  //     Path: '', Title: 'LOS', Icon: 'ft-users', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/LOS/CreditProcess/CustomerData', Title: 'New Application', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Supplier', Icon: 'ft-copy', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/supplier', Title: 'Supplier  Maintenance', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },

  // {
  //     Path: '', Title: 'Dashboard', Icon: 'ft-home', Class: 'has-sub', Badge: '2', BadgeClass: 'Badge Badge-pill Badge-danger float-right mr-1 mt-1', IsExternalLink: false, Submenu: [
  //         { Path: '/dashboard/dashboard1', Title: 'Dashboard1', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/dashboard/dashboard2', Title: 'Dashboard2', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: '/colorpalettes', Title: 'Color Palette', Icon: 'ft-droplet', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/inbox', Title: 'Inbox', Icon: 'ft-mail', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/chat', Title: 'Chat', Icon: 'ft-message-square', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/chat-ngrx', Title: 'Chat NgRx', Icon: 'ft-message-square', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/taskboard', Title: 'Task Board', Icon: 'ft-file-text', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/taskboard-ngrx', Title: 'Task Board NgRx', Icon: 'ft-file-text', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/player', Title: 'Player', Icon: 'ft-music', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // {
  //     Path: '', Title: 'UI Kit', Icon: 'ft-aperture', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [

  //         { Path: '/uikit/grids', Title: 'Grid', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/typography', Title: 'Typography', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/syntaxhighlighter', Title: 'Syntax Highlighter', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/helperClasses', Title: 'Helper Classes', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/textutilities', Title: 'Text Utilities', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },

  //         {
  //             Path: '', Title: 'Icons', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //                 { Path: '/uikit/feather', Title: 'Feather Icon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/uikit/font-awesome', Title: 'Font Awesome Icon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/uikit/simple-line', Title: 'Simple Line Icon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //             ]
  //         },

  //     ]
  // },
  // {
  //     Path: '', Title: 'Components', Icon: 'ft-box', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [

  //         {
  //             Path: '', Title: 'Bootstrap', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //                 { Path: '/components/lists', Title: 'List', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/buttons', Title: 'Buttons', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/ng-buttons', Title: 'NG Buttons', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/alerts', Title: 'Alerts', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/Badges', Title: 'Badges', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/dropdowns', Title: 'Dropdowns', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/inputgroups', Title: 'Input Groups', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/media', Title: 'Media Objects', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/pagination', Title: 'Pagination', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/progress', Title: 'Progress Bars', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/models', Title: 'Modals', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/collapse', Title: 'Collapse', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/accordion', Title: 'Accordion', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/carousel', Title: 'Carousel', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/datepicker', Title: 'Datepicker', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/popover', Title: 'Popover', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/rating', Title: 'Rating', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tabs', Title: 'Tabs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/timepicker', Title: 'Timepicker', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tooltip', Title: 'Tooltip', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/typeahead', Title: 'Typeahead', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //         {
  //             Path: '', Title: 'Extra', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //                 { Path: '/components/sweetalerts', Title: 'Sweet Alert', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/toastr', Title: 'Toastr', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/select', Title: 'Select', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/nouislider', Title: 'NoUI Slider', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/upload', Title: 'Upload', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/editor', Title: 'Editor', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/dragndrop', Title: 'Drag and Drop', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tour', Title: 'Tour', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/cropper', Title: 'Image Cropper', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tags', Title: 'Input Tags', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/switch', Title: 'Switch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Forms', Icon: 'ft-edit', Class: 'has-sub', Badge: 'New', BadgeClass: 'Badge Badge-pill Badge-primary float-right mr-1 mt-1', IsExternalLink: false,
  //     Submenu: [
  //         {
  //             Path: '', Title: 'Elements', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //             Submenu: [
  //                 { Path: '/forms/inputs', Title: 'Inputs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/input-groups', Title: 'Input Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/input-grid', Title: 'Input Grid', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //         {
  //             Path: '', Title: 'Layouts', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //             Submenu: [
  //                 { Path: '/forms/basic', Title: 'Basic Forms', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/horizontal', Title: 'Horizontal Forms', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/hidden-labels', Title: 'Hidden Labels', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/form-actions', Title: 'Form Actions', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/bordered', Title: 'Bordered Forms', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/striped-rows', Title: 'Striped Rows', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //         { Path: '/forms/validation', Title: 'Validation', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/forms/wizard', Title: 'Wizard', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/forms/ngx', Title: 'NGX Wizard', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/forms/archwizard', Title: 'ArchWizard', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //     ]
  // },
  // {
  //     Path: '', Title: 'Tables', Icon: 'ft-grid', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/tables/regular', Title: 'Regular', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/tables/extended', Title: 'Extended', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/tables/smart', Title: 'Smart Tables', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },

  //     ]
  // },
  // {
  //     Path: '', Title: 'Data Tables', Icon: 'ft-layout', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/datatables/basic', Title: 'Basic', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/editing', Title: 'Editing', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/filter', Title: 'Filter', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/fullscreen', Title: 'Fullscreen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/Paging', Title: 'Paging', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/pinning', Title: 'Pinning', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/selection', Title: 'Selection', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/sorting', Title: 'Sorting', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //     ]
  // },
  // {
  //     Path: '', Title: 'Cards', Icon: 'ft-layers', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //         { Path: '/cards/basic', Title: 'Basic Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/cards/advanced', Title: 'Advanced Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Maps', Icon: 'ft-map', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/maps/google', Title: 'Google Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/maps/fullscreen', Title: 'Full Screen Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Charts', Icon: 'ft-bar-chart-2', Class: 'has-sub', Badge: '2', BadgeClass: 'Badge Badge-pill Badge-success float-right mr-1 mt-1', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/charts/chartjs', Title: 'ChartJs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/chartist', Title: 'Chartist', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/ngx', Title: 'NGX Chart', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: '/calendar', Title: 'Calendar', Icon: 'ft-calendar', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // {
  //     Path: '', Title: 'Pages', Icon: 'ft-copy', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/pages/forgotpassword', Title: 'Forgot Password', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/horizontaltimeline', Title: 'Horizontal Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/verticaltimeline', Title: 'Vertical Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/login', Title: 'Login', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/register', Title: 'Register', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/profile', Title: 'User Profile', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/lockscreen', Title: 'Lock Screen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/invoice', Title: 'Invoice', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/error', Title: 'Error', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/comingsoon', Title: 'Coming Soon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/maintenance', Title: 'Maintenance', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/gallery', Title: 'Gallery', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/search', Title: 'Search', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/faq', Title: 'FAQ', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/kb', Title: 'Knowledge Base', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Data Tables', Icon: 'ft-layout', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/datatables/basic', Title: 'Basic', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/editing', Title: 'Editing', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/filter', Title: 'Filter', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/fullscreen', Title: 'Fullscreen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/Paging', Title: 'Paging', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/pinning', Title: 'Pinning', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/selection', Title: 'Selection', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/sorting', Title: 'Sorting', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //     ]
  // },
  // {
  //     Path: '', Title: 'Cards', Icon: 'ft-layers', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //         { Path: '/cards/basic', Title: 'Basic Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/cards/advanced', Title: 'Advanced Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Maps', Icon: 'ft-map', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/maps/google', Title: 'Google Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/maps/fullscreen', Title: 'Full Screen Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Charts', Icon: 'ft-bar-chart-2', Class: 'has-sub', Badge: '2', BadgeClass: 'Badge Badge-pill Badge-success float-right mr-1 mt-1', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/charts/chartjs', Title: 'ChartJs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/chartist', Title: 'Chartist', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/ngx', Title: 'NGX Chart', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: '/calendar', Title: 'Calendar', Icon: 'ft-calendar', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // {
  //     Path: '', Title: 'Pages', Icon: 'ft-copy', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/pages/forgotpassword', Title: 'Forgot Password', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/horizontaltimeline', Title: 'Horizontal Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/verticaltimeline', Title: 'Vertical Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/login', Title: 'Login', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/register', Title: 'Register', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/profile', Title: 'User Profile', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/lockscreen', Title: 'Lock Screen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/invoice', Title: 'Invoice', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/error', Title: 'Error', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/comingsoon', Title: 'Coming Soon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/maintenance', Title: 'Maintenance', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/gallery', Title: 'Gallery', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/search', Title: 'Search', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/faq', Title: 'FAQ', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/kb', Title: 'Knowledge Base', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', Title: 'Documentation', Icon: 'ft-book', Class: '', Badge: '', BadgeClass: '', IsExternalLink: true, Submenu: [] },
  // { Path: 'https://pixinvent.ticksy.com/', Title: 'Support', Icon: 'ft-life-buoy', Class: '', Badge: '', BadgeClass: '', IsExternalLink: true, Submenu: [] },
];
