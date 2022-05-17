import { Affix } from "../utils/mona.artifact";

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
  weapon: IWeapon | null;
  weaponType: string;
  artifacts: {
    list: string[];
    primary_attribute: string[];
    critical_score: number;
    main: number;
    count: number;
  };
  score: number;
  update?: string;
}

export interface IAffix {
  key: string;
  value: number;
}

export interface IArtifact {
  set: string;
  slot: string;
  rarity: number;
  level: number;
  lock: boolean;
  location: string;
  mainKey: string;
  // mainKeys: string;
  minors: Affix[];
  data: {
    index: number;
    affnum: {
      cur: number;
      avg: number;
      min: number;
      max: number;
    };
    lock: boolean;
  };
}
