export class PortfolioItem {
  type_id: number | null;
  name: string;
  file: string | null;
  desc: string;

  constructor() {
    this.type_id = process.env.NODE_ENV !== 'production' ? 2 : null;
    this.name = process.env.NODE_ENV !== 'production' ? 'ผลงาน' : '';
    this.file = null;
    this.desc = process.env.NODE_ENV !== 'production' ? 'รายละเอียดผลงาน' : '';
  }
}

export class Portfolio {
  portfolio: Array<any>;

  constructor() {
    this.portfolio = [new PortfolioItem()];
  }
}

export class PortfolioType {
  portfolioType: Record<string, any>[];

  constructor() {
    this.portfolioType = [new PortfolioTypeItem()];
  }
}

export class PortfolioTypeItem {
  type_id: number;
  name: string;
  desc: string;

  constructor() {
    this.type_id = 0;
    this.name = '';
    this.desc = '';
  }
}
