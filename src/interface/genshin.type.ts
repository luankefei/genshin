export interface IWeapon {
  id: string;
  name: string;
  affix: number;
  level: number;
}

export interface IWeaponData {
  id: string;
  name: string;
  type: string;
  rarity: number;
  baseAttack?: number;
  subStat?: string;
  passiveName?: string;
  passiveDesc?: string;
  location?: string;
}

export interface ICharacter {
  enName: string;
  name: string;
  level: number;
  talents: { [key: string]: number };
  constellation: number;
  weapon: IWeapon;
  weaponType: string;
  artifacts: {
    list: string[];
    primary_attribute: string[];
    critical_score: number;
    main: number;
    count: number;
  };
  score: number;
}
