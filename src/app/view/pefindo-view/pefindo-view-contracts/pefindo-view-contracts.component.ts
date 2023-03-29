import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ColorHelper } from '@swimlane/ngx-charts';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { MultiChartsObj } from 'app/shared/model/charts/multi-charts-obj.model';
import { ResForChartsObj } from 'app/shared/model/charts/res-for-charts-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResContractObj } from 'app/shared/model/Response/pefindo/res-contract-obj.model';
import { ResViewContractsObj } from 'app/shared/model/response/pefindo/res-view-contracts-obj.model';
import { ResViewSubjectInfoCompanyObj } from 'app/shared/model/response/pefindo/res-view-subject-info-company-obj.model';
import { ResViewPefindoContractsObj } from 'app/shared/model/response/pefindo/res-view-pefindo-contracts-obj.model';
import { ResViewSubjectInfoPersonalObj } from 'app/shared/model/response/pefindo/res-view-subject-info-personal-obj.model';

@Component({
  selector: 'app-pefindo-view-contracts',
  templateUrl: './pefindo-view-contracts.component.html'
})
export class PefindoViewContractsComponent implements OnInit {
  TrxNo: string;
  ResViewContractsObj: ResViewContractsObj = new ResViewContractsObj();
  ResListContractsObj: Array<ResContractObj> = [];
  ResSummaryContractsObj: Array<ResContractObj> = [];
  ViewDetailContract: ResContractObj = new ResContractObj();
  TempDetailContract: ResContractObj = new ResContractObj();
  NoOfFalseDisputes: number = 0;
  NoOfClosedDisputes: number = 0;
  IsViewMode: boolean = false;

  CustNo: string;
  MrCustTypeCode: string;
  CustObj: CustObj = new CustObj();

    this.route.queryParams.subscribe(params => {
      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }

      if (params["MrCustTypeCode"] != null) {
        this.MrCustTypeCode = params["MrCustTypeCode"];
      }

      if (params["CustNo"] != null) {
        this.CustNo = params["CustNo"];
      }
    });
  }

  async ngOnInit() {
    this.getSubjectInfo();

    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    await this.http.post(URLConstant.GetViewContracts, reqByTrxNo).toPromise().then(
      (response: ResViewContractsObj) => {
        this.ResViewContractsObj = response;
      }
    )

    await this.getData();
    await this.setCharts("All","");

    this.isReady = true;
  }

  getSubjectInfo()
  {
    if (this.CustNo != null)
    {
      let reqByCustNo: GenericObj = new GenericObj();
      reqByCustNo.CustNo = this.CustNo;
      this.http.post(URLConstant.GetCustByCustNo, reqByCustNo).subscribe(
        (response: CustObj) => {
          this.MrCustTypeCode = this.CustObj.MrCustTypeCode;
        })
    }

    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;

    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal)
    {
      reqByTrxNo.TrxNo = this.TrxNo;
      this.http.post(URLConstant.GetViewSubjectInfoPersonal, reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoPersonalObj) => {
        this.TempDetailContract.PefindoId = response.PefindoId;
        this.TempDetailContract.Name = response.FullName;
        this.TempDetailContract.IdNumber = response.IdNo;
        this.TempDetailContract.Addr = response.Addr;
        this.TempDetailContract.BirthDt = response.DateOfBirth;
      })
    }
    else
    {
      this.http.post(URLConstant.GetViewSubjectInfoCompany, reqByTrxNo).subscribe(
        (response: ResViewSubjectInfoCompanyObj) => {
          this.TempDetailContract.PefindoId = response.PefindoId;
          this.TempDetailContract.Name = response.CoyName;
          this.TempDetailContract.IdNumber = response.IdNo;
          this.TempDetailContract.Addr = response.Addr;
        }
      )
    }
  }

  async viewOnClick(idx: number)
  {
    this.ViewDetailContract = this.ResListContractsObj[idx];

    this.ViewDetailContract.PefindoId = this.TempDetailContract.PefindoId;
    this.ViewDetailContract.Name = this.TempDetailContract.Name;
    this.ViewDetailContract.IdNumber = this.TempDetailContract.IdNumber;
    this.ViewDetailContract.Addr = this.TempDetailContract.Addr;

    if (this.ViewDetailContract.RPefindoCntrctDsptsListObjs.length > 0)
    {
      this.NoOfClosedDisputes = this.ViewDetailContract.RPefindoCntrctDsptsListObjs.filter(x => x.DsptsStat == "Closed").length;
      this.NoOfFalseDisputes = this.ViewDetailContract.RPefindoCntrctDsptsListObjs.filter(x => x.Resolution == "FalseDispute").length;
    }
    
    this.IsViewMode = true;
  }

  backOnClick()
  {
    this.ViewDetailContract = new ResContractObj();
    this.NoOfClosedDisputes = 0;
    this.NoOfFalseDisputes = 0;
    
    this.IsViewMode = false;
  }

  pascalToSpace(ori:string='')
  {
    if (ori == undefined || ori == null) return '';
    return ori.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
  }

  //#region Charts
  colors: ColorHelper = new ColorHelper('picnic', 'ordinal', [], null);
  colorScheme = {
    domain: this.colors.colorDomain
  };
  schemeType: string = "ordinal"
  xAxisLabel: string = "Years";
  yAxisLabel: string = "Sum of Total";
  legendTitle: string = "";
  barPadding: number = 1;

  tempYear: string = "";
  multiCharts: Array<MultiChartsObj> = new Array<MultiChartsObj>();
  initMulti: Array<MultiChartsObj> = new Array<MultiChartsObj>();
  tempListForChartsObj: Array<ResForChartsObj> = new Array<ResForChartsObj>();
  tempListResViewPefindoContractsObj: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
  ListResViewPefindoContractsObj: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
  Years: Array<string> = new Array<string>();
  Quarters: Array<string> = new Array<string>();

  isChartReady: boolean = false;
  isDdlReady: boolean = false;
  isReady: boolean = false;
  async getData()
  {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    await this.http.post(URLConstant.GetPefindoContracts, reqByTrxNo).toPromise().then(
      (response: {ReturnObject: Array<ResContractObj>}) => {
        this.ResListContractsObj = response.ReturnObject;
        this.ResListContractsObj = this.ResListContractsObj.filter(x => x.ClientRole == 'MainDebtor');
        this.ResListContractsObj.forEach(x => {
          var idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          if (idx < 0)
          {
            let newItem = new ResContractObj();
            newItem.Creditor = x.Creditor;
            this.ResSummaryContractsObj.push(newItem);
            idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          }
          let curr = this.ResSummaryContractsObj[idx];
          curr.TtlAmt += x.TtlAmt;
          curr.OsAmt += x.OsAmt;
          curr.PastDueAmt += x.PastDueAmt;
          curr.PastDueDays = x.PastDueDays > curr.PastDueDays ? x.PastDueDays : curr.PastDueDays;
        })

        this.ResListContractsObj.forEach(x => {
          let resViewPefindoContractsObj = new ResViewPefindoContractsObj();
          resViewPefindoContractsObj.Creditor = x['Creditor'];
          resViewPefindoContractsObj.StartDt = x['StartDt'];
          resViewPefindoContractsObj.TtlAmt = x['TtlAmt'];
          resViewPefindoContractsObj.Years = new Date(x['StartDt']).getFullYear();

          let month = new Date(x['StartDt']).getMonth();
          resViewPefindoContractsObj.Month = month;
          resViewPefindoContractsObj.Quarters = month >= 0 && month < 3? 1 : month >= 3 && month < 6? 2 : month >= 6 && month < 9? 3 : 4;

          this.ListResViewPefindoContractsObj.push(resViewPefindoContractsObj);
        });
      })

    this.ListResViewPefindoContractsObj.sort((a, b) => {
      if(a["Years"] < b["Years"]) return -1;
      if(a["Years"] > b["Years"]) return 1;
      if (a["Quarters"] < b["Quarters"]) return -1;
      if (a["Quarters"] > b["Quarters"]) return 1;
      if (a["Month"] < b["Month"]) return -1;
      if (a["Month"] > b["Month"]) return 1;
    });

    let tempYear: Array<string> = new Array<string>();
    tempYear = this.ListResViewPefindoContractsObj.map(x => x.Years.toString());
    this.Years.push(...tempYear.filter((item, index, self) => self.indexOf(item) === index))

    this.isDdlReady = true;
  }

  async initCharts(data: Array<ResForChartsObj>)
  {
    this.isChartReady = false;
    this.multiCharts = new Array<MultiChartsObj>();

    for (let i = 0; i < data.length; i++)
    {
      let numName = 0
      numName = this.multiCharts.findIndex(x => x.name == data[i].Name);
      if (numName < 0)
      {
        let multi = new MultiChartsObj();
        let one = new ChartsObj();
        one.name = data[i].SeriesName;
        one.value = data[i].Value;
        multi.name = data[i].Name;
        multi.series.push(one);

        this.multiCharts.push(multi)
        continue
      }

      let numSeriesName = this.multiCharts[numName].series.findIndex(x => x.name == data[i].SeriesName);
      if (numSeriesName < 0)
      {
        let one = new ChartsObj();
        one.name = data[i].SeriesName;
        one.value = data[i].Value;
        this.multiCharts[numName].series.push(one); 
      }
      else
      {
        this.multiCharts[numName].series[numSeriesName].value += data[i].Value;
      }
    }

    this.initMulti = this.multiCharts;

    setTimeout (() => {
      this.isChartReady = true
    }, 50);
  }

  async setCharts(year: string, quarter: string)
  {
    //legend by years
    if(year == "All")
    {
      this.tempListForChartsObj = new Array<ResForChartsObj>();
      
      this.ListResViewPefindoContractsObj.forEach(x => {
        let temp = new ResForChartsObj();
        temp.Name = x.Years.toString();
        temp.SeriesName = x.Creditor;
        temp.Value = x.TtlAmt;

        this.tempListForChartsObj.push(temp);
      });

      this.xAxisLabel = "Years";
      await this.initCharts(this.tempListForChartsObj);
      return;
    }

    //legend by quarters
    if((year != "" && quarter == "") || (quarter == "All"))
    {
      this.tempYear = year;
      this.tempListForChartsObj = new Array<ResForChartsObj>();
      this.tempListResViewPefindoContractsObj = new Array<ResViewPefindoContractsObj>();
      this.tempListResViewPefindoContractsObj = this.ListResViewPefindoContractsObj.filter(x => x.Years.toString() == year);

      this.tempListResViewPefindoContractsObj.forEach(x => {
        let temp = new ResForChartsObj();
        temp.Name = "Q" + x.Quarters.toString();
        temp.SeriesName = x.Creditor;
        temp.Value = x.TtlAmt;

        this.tempListForChartsObj.push(temp);
      });

      this.xAxisLabel = "Quarters";
      await this.initCharts(this.tempListForChartsObj);
      return;
    }

    //legend by months
    if(quarter != "")
    {
      const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];

      this.tempListForChartsObj = new Array<ResForChartsObj>();
      this.tempListResViewPefindoContractsObj = new Array<ResViewPefindoContractsObj>();
      this.tempListResViewPefindoContractsObj = this.ListResViewPefindoContractsObj.filter(x => x.Years.toString() == year && x.Quarters.toString() == quarter[1]);
      
      this.tempListResViewPefindoContractsObj.forEach(x => {
        let temp = new ResForChartsObj();
        temp.Name = monthNames[x.Month];
        temp.SeriesName = x.Creditor;
        temp.Value = x.TtlAmt;

        this.tempListForChartsObj.push(temp);
      });

      this.xAxisLabel = "Months";
      await this.initCharts(this.tempListForChartsObj);
      return;
    }
  }

  async getQuarters(event: any)
  {
    this.isDdlReady = false;

    this.Quarters = new Array<string>();
    this.Quarters.push("All")

    let temp: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
    temp = this.ListResViewPefindoContractsObj.filter(x => x.Years == event);

    temp.forEach(x => {
      if (!this.Quarters.includes(x.Quarters.toString())) this.Quarters.push("Q" + x.Quarters.toString());
    });

    setTimeout (() => {
      this.isDdlReady = true
    }, 50);

    await this.setCharts(event, "")
  }

  onSelect(event: any)
  {
    if (this.isLegend(event)) {
      if (this.isDataShown(event)) {
        const tempData = JSON.parse(JSON.stringify(this.multiCharts));
        tempData.forEach(x => {
          x.series.forEach(y => {
            if (y.name === event) {
              y.value = 0;
            }
          });
        });
        this.multiCharts = tempData;
      } else {
        this.initMulti.forEach(x => {
          x.series.forEach(y => {           
             if (y.name === event && y.value !== 0){ 
              this.setChartDataBackToInitData(x.name, y.name, y.value)
             }
          });
        });
      }     
    }
  }

  isLegend = (event) => typeof event === 'string';

  isDataShown(event): boolean {
    let isDataShown = false;
    this.multiCharts.forEach(x => {
      x.series.forEach(y => {
        if (y.name == event && y.value != 0) isDataShown = true;
      });
    });

    return isDataShown;
  }

  setChartDataBackToInitData = (name, creditor, total) => {
    const tempData = JSON.parse(JSON.stringify(this.multiCharts));
    tempData.find(x => x.name === name).series.find(y => y.name === creditor).value = total;
    this.multiCharts = tempData;
  }
  //#endregion

}
