export class ResViewSubjectInfoPersonalObj {
  FullName: string;
  Alias: string;
  Gender: string;
  DateOfBirth: Date;
  Citizenship: string;
  MotherMaidernName: string;
  SocialStat: string;
  Employment: string;
  Employer: string;
  PlaceOfBirth: string;
  MaritalStat: string;
  Education: string;
  Addr: string;
  MobilePhnNo: string;
  FixedLineNo: string;
  Email: string;
  ClsdDsptsSbjctNum: number;
  FalseDsptsNum: number;

  constructor() {
    this.FullName = "";
    this.Alias = "";
    this.Gender = "";
    this.DateOfBirth = new Date();
    this.Citizenship = "";
    this.MotherMaidernName = "";
    this.SocialStat = "";
    this.Employment = "";
    this.Employer = "";
    this.PlaceOfBirth = "";
    this.MaritalStat = "";
    this.Education = "";
    this.Addr = "";
    this.MobilePhnNo = "";
    this.FixedLineNo = "";
    this.Email = "";
    this.ClsdDsptsSbjctNum = 0;
    this.FalseDsptsNum = 0;
  }
}