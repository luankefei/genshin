/**
 * data source from https://api.genshin.dev/artifacts
 */
export const artifacts = [
  "adventurer",
  "archaic-petra",
  "berserker",
  "blizzard-strayer",
  "bloodstained-chivalry",
  "brave-heart",
  "crimson-witch-of-flames",
  "defender-s-will",
  "emblem-of-severed-fate",
  "gambler",
  "glacier-and-snowfield",
  "gladiator-s-finale",
  "heart-of-depth",
  "husk-of-opulent-dreams",
  "instructor",
  "lavawalker",
  "lucky-dog",
  "maiden-beloved",
  "martial-artist",
  "noblesse-oblige",
  "ocean-hued-clam",
  "pale-flame",
  "prayers-for-destiny",
  "prayers-for-illumination",
  "prayers-for-wisdom",
  "prayers-to-springtime",
  "prayers-to-the-firmament",
  "resolution-of-sojourner",
  "retracing-bolide",
  "scholar",
  "shimenawa-s-reminiscence",
  "tenacity-of-the-millelith",
  "the-exile",
  "thundering-fury",
  "thundersoother",
  "tiny-miracle",
  "traveling-doctor",
  "viridescent-venerer",
  "wanderer-s-troupe",
];

interface IArtifactData {
  id: string;
  type?: string;
  rarity?: number;
  data?: {
    en: {
      name: string;
      "2p": string;
      "4p": string;
    };
    zh: {
      name: string;
      "2p": string;
      "4p": string;
    };
  };
}

/**
 * data source from https://github.com/tmdict/genshin-tldr-tmp
 */
export const artifactMap: { [key: string]: IArtifactData } = {
  adventurer: {
    id: "adventurer",
    type: "artifact",
    rarity: 3,
    data: {
      en: {
        name: "Adventurer",
        "2p": "Max HP increased by 1,000.",
        "4p": "Opening a chest regenerates 30% Max HP over 5s.",
      },
      zh: { name: "冒险家", "2p": "生命值上限提升1000点。", "4p": "开启各类宝箱后5秒内，持续恢复30%生命值。" },
    },
  },
  "archaic-petra": {
    id: "archaic-petra",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Archaic Petra",
        "2p": "Gain a 15% Geo DMG Bonus.",
        "4p": "Upon obtaining an Elemental Shard created through a Crystallize Reaction, all party members gain a 35% DMG Bonus for that particular element for 10s. Only one form of Elemental DMG Bonus can be gained in this manner at any one time.",
      },
      zh: {
        name: "悠古的磐岩",
        "2p": "获得15%岩元素伤害加成。",
        "4p": "获得结晶反应形成的晶片时，队伍中所有角色获得35%对应元素伤害加成，持续10秒。同时只能通过该效果获得一种元素伤害加成。",
      },
    },
  },
  berserker: {
    id: "berserker",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Berserker",
        "2p": "CRIT Rate +12%",
        "4p": "When HP is below 70%, CRIT Rate increases by an additional 24%.",
      },
      zh: { name: "战狂", "2p": "暴击率提高12%。", "4p": "生命值低于70%时，暴击率额外提升24%。" },
    },
  },
  "blizzard-strayer": {
    id: "blizzard-strayer",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Blizzard Strayer",
        "2p": "Cryo DMG Bonus +15%",
        "4p": "When a character attacks an opponent affected by Cryo, their CRIT Rate is increased by 20%. If the opponent is Frozen, CRIT Rate is increased by an additional 20%.",
      },
      zh: {
        name: "冰风迷途的勇士",
        "2p": "获得15%冰元素伤害加成",
        "4p": "攻击处于冰元素影响下的敌人时，暴击率提高20%；若敌人处于冻结状态下，则暴击率额外提高20%。",
      },
    },
  },
  "bloodstained-chivalry": {
    id: "bloodstained-chivalry",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Bloodstained Chivalry",
        "2p": "Physical DMG +25%",
        "4p": "After defeating an opponent, increases Charged Attack DMG by 50%, and reduces its Stamina cost to 0 for 10s.",
      },
      zh: {
        name: "染血的骑士道",
        "2p": "造成的物理伤害提高25%。",
        "4p": "击败敌人后的10秒内，施放重击时不消耗体力，且重击造成的伤害提升50%。",
      },
    },
  },
  "brave-heart": {
    id: "brave-heart",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Brave Heart",
        "2p": "ATK +18%.",
        "4p": "Increases DMG by 30% against opponents with more than 50% HP.",
      },
      zh: { name: "勇士之心", "2p": "攻击力提高18%。", "4p": "对生命值高于50%的敌人，造成的伤害增加30%。" },
    },
  },
  "crimson-witch-of-flames": {
    id: "crimson-witch-of-flames",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Crimson Witch of Flames",
        "2p": "Pyro DMG Bonus +15%",
        "4p": "Increases Overloaded and Burning DMG by 40%. Increases Vaporize and Melt DMG by 15%. Using Elemental Skill increases the 2-Piece Set Bonus by 50% of its starting value for 10s. Max 3 stacks.",
      },
      zh: {
        name: "炽烈的炎之魔女",
        "2p": "获得15%火元素伤害加成。",
        "4p": "超载、燃烧反应造成的伤害提升40%，蒸发、融化反应的加成系数提高15%。施放元素战技后的10秒内，2件套的效果提高50%，该效果最多叠加3次。",
      },
    },
  },
  "defender-s-will": { id: "defender-s-will" },
  "emblem-of-severed-fate": {
    id: "emblem-of-severed-fate",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Emblem of Severed Fate",
        "2p": "Energy Recharge +20%",
        "4p": "Increases Elemental Burst DMG by 25% of Energy Recharge. A maximum of 75% bonus DMG can be obtained in this way.",
      },
      zh: {
        name: "绝缘之旗印",
        "2p": "元素充能效率提高20%。",
        "4p": "基于元素充能效率的25%，提高元素爆发造成的伤害。至多通过这种方式获得75%提升。",
      },
    },
  },
  gambler: {
    id: "gambler",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Gambler",
        "2p": "Increases Elemental Skill DMG by 20%.",
        "4p": "Defeating an opponent has a 100% chance to remove Elemental Skill CD. Can only occur once every 15s.",
      },
      zh: {
        name: "赌徒",
        "2p": "元素战技造成的伤害提升20%。",
        "4p": "击败敌人时，有100%概率清除元素战技的冷却时间。该效果每15秒至多触发一次。",
      },
    },
  },
  "glacier-and-snowfield": { id: "glacier-and-snowfield" },
  "gladiator-s-finale": { id: "gladiator-s-finale" },
  "heart-of-depth": {
    id: "heart-of-depth",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Heart of Depth",
        "2p": "Hydro DMG Bonus +15%",
        "4p": "After using Elemental Skill, increases Normal Attack and Charged Attack DMG by 30% for 15s.",
      },
      zh: {
        name: "沉沦之心",
        "2p": "获得15%水元素伤害加成。",
        "4p": "施放元素战技后的15秒内，普通攻击与重击造成的伤害提高30%。",
      },
    },
  },
  "husk-of-opulent-dreams": {
    id: "husk-of-opulent-dreams",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Husk of Opulent Dreams",
        "2p": "DEF +30%",
        "4p": "A character equipped with this Artifact set will obtain the Curiosity effect in the following conditions: When on the field, the character gains 1 stack after hitting an opponent with a Geo attack, triggering a maximum of once every 0.3s. When off the field, the character gains 1 stack every 3s. Curiosity can stack up to 4 times, each providing 6% DEF and a 6% Geo DMG Bonus. When 6 seconds pass without gaining a Curiosity stack, 1 stack is lost.",
      },
      zh: {
        name: "华馆梦醒形骸记",
        "2p": "防御力提高30%。",
        "4p": "装备此圣遗物套装的角色在以下情况下，将获得「问答」效果：在场上用岩元素攻击命中敌人后获得一层，每0.3秒至多触发一次；在队伍后台中，每3秒获得一层。问答至多叠加4层，每层能提供6%防御力与6%岩元素伤害加成。每6秒，若未获得问答效果，将损失一层。",
      },
    },
  },
  instructor: {
    id: "instructor",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Instructor",
        "2p": "Increases Elemental Mastery by 80.",
        "4p": "Upon triggering an Elemental Reaction, increases all party members’ Elemental Mastery by 120 for 8s.",
      },
      zh: {
        name: "教官",
        "2p": "元素精通提高80点。",
        "4p": "触发元素反应后，队伍中所有角色的元素精通提高120点，持续8秒。",
      },
    },
  },
  lavawalker: {
    id: "lavawalker",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Lavawalker",
        "2p": "Pyro RES increased by 40%.",
        "4p": "Increases DMG against opponents affected by Pyro by 35%.",
      },
      zh: {
        name: "渡过烈火的贤人",
        "2p": "火元素抗性提高40%。",
        "4p": "对处于火元素影响下的敌人造成的伤害提升35%。",
      },
    },
  },
  "lucky-dog": {
    id: "lucky-dog",
    type: "artifact",
    rarity: 3,
    data: {
      en: { name: "Lucky Dog", "2p": "DEF increased by 100.", "4p": "Picking up Mora restores 300 HP." },
      zh: { name: "幸运儿", "2p": "防御力提高100点。", "4p": "拾取摩拉时，恢复300点生命值。" },
    },
  },
  "maiden-beloved": {
    id: "maiden-beloved",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Maiden Beloved",
        "2p": "Character Healing Effectiveness +15%",
        "4p": "Using an Elemental Skill or Burst increases healing received by all party members by 20% for 10s.",
      },
      zh: {
        name: "被怜爱的少女",
        "2p": "角色造成的治疗效果提升15%。",
        "4p": "施放元素战技或元素爆发后的10秒内，队伍中所有角色受治疗效果加成提高20%。",
      },
    },
  },
  "martial-artist": {
    id: "martial-artist",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Martial Artist",
        "2p": "Increases Normal Attack and Charged Attack DMG by 15%.",
        "4p": "After using Elemental Skill, increases Normal Attack and Charged Attack DMG by 25% for 8s.",
      },
      zh: {
        name: "武人",
        "2p": "普通攻击与重击造成的伤害提高15%；",
        "4p": "施放元素战技后的8秒内，普通攻击和重击造成的伤害提升25%。",
      },
    },
  },
  "noblesse-oblige": {
    id: "noblesse-oblige",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Noblesse Oblige",
        "2p": "Elemental Burst DMG +20%",
        "4p": "Using an Elemental Burst increases all party members’ ATK by 20% for 12s. This effect cannot stack.",
      },
      zh: {
        name: "昔日宗室之仪",
        "2p": "元素爆发造成的伤害提升20%。",
        "4p": "施放元素爆发后，队伍中所有角色攻击力提升20%，持续12秒。该效果不可叠加。",
      },
    },
  },
  "ocean-hued-clam": {
    id: "ocean-hued-clam",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Ocean-Hued Clam",
        "2p": "Healing Bonus +15%.",
        "4p": "When the character equipping this artifact set heals a character in the party, a Sea-Dyed Foam will appear for 3 seconds, accumulating the amount of HP recovered from healing (including overflow healing). At the end of the duration, the Sea-Dyed Foam will explode, dealing DMG to nearby opponents based on 90% of the accumulated healing. (This DMG is calculated similarly to Reactions such as Electro-Charged, and Superconduct, but is not affected by Elemental Mastery, Character Levels, or Reaction DMG Bonuses). Only one Sea-Dyed Foam can be produced every 3.5 seconds. Each Sea-Dyed Foam can accumulate up to 30,000 HP (including overflow healing). There can be no more than one Sea-Dyed Foam active at any given time. This effect can still be triggered even when the character who is using this artifact set is not on the field.",
      },
      zh: {
        name: "海染砗磲",
        "2p": "治疗加成提高15%。",
        "4p": "装备此圣遗物套装的角色对队伍中的角色进行治疗时，将产生持续3秒的海染泡沫，记录治疗的生命值回复量（包括溢出值）。持续时间结束时，海染泡沫将会爆炸，对周围的敌人造成90%累计回复量的伤害（该伤害结算方式同感电、超导等元素反应，但不受元素精通、等级或反应伤害加成效果影响）。每3.5秒至多产生一个海染泡沫；海染泡沫至多记录30000点回复量，含溢出部分的治疗量；自己的队伍中同时至多存在一个海染泡沫。装备此圣遗物套装的角色处于队伍后台时，依然能触发该效果。",
      },
    },
  },
  "pale-flame": {
    id: "pale-flame",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Pale Flame",
        "2p": "Physical DMG is increased by 25%.",
        "4p": "When an Elemental Skill hits an opponent, ATK is increased by 9% for 7s. This effect stacks up to 2 times and can be triggered once every 0.3s. Once 2 stacks are reached, the 2-set effect is increased by 100%.",
      },
      zh: {
        name: "苍白之火",
        "2p": "造成的物理伤害提高25%。",
        "4p": "元素战技命中敌人后，攻击力提升9%。该效果持续7秒，至多叠加2层，每0.3秒至多触发一次。叠满2层时，2件套的效果提升100%。",
      },
    },
  },
  "prayers-for-destiny": { id: "prayers-for-destiny" },
  "prayers-for-illumination": { id: "prayers-for-illumination" },
  "prayers-for-wisdom": { id: "prayers-for-wisdom" },
  "prayers-to-springtime": { id: "prayers-to-springtime" },
  "prayers-to-the-firmament": { id: "prayers-to-the-firmament" },
  "resolution-of-sojourner": {
    id: "resolution-of-sojourner",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Resolution of Sojourner",
        "2p": "ATK +18%.",
        "4p": "Increases Charged Attack CRIT Rate by 30%.",
      },
      zh: { name: "行者之心", "2p": "攻击力提高18%。", "4p": "重击的暴击率提升30%。" },
    },
  },
  "retracing-bolide": {
    id: "retracing-bolide",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Retracing Bolide",
        "2p": "Increases Shield Strength by 35%.",
        "4p": "While protected by a shield, gain an additional 40% Normal and Charged Attack DMG.",
      },
      zh: {
        name: "逆飞的流星",
        "2p": "护盾强效提高35%。",
        "4p": "处于护盾庇护下时，额外获得40%普通攻击和重击伤害加成。",
      },
    },
  },
  scholar: {
    id: "scholar",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Scholar",
        "2p": "Energy Recharge +20%",
        "4p": "Gaining Elemental Particles or Orbs gives 3 Energy to all party members who have a bow or a catalyst equipped. Can only occur once every 3s.",
      },
      zh: {
        name: "学士",
        "2p": "元素充能效率提高20%。",
        "4p": "获得元素微粒或元素晶球时，队伍中所有弓箭和法器角色额外恢复3点元素能量。该效果每3秒只能触发一次。",
      },
    },
  },
  "shimenawa-s-reminiscence": { id: "shimenawa-s-reminiscence" },
  "tenacity-of-the-millelith": {
    id: "tenacity-of-the-millelith",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Tenacity of the Millelith",
        "2p": "HP increased by 20%.",
        "4p": "When an Elemental Skill hits an opponent, the ATK of all nearby party members is increased by 20% and their Shield Strength is increased by 30% for 3s. This effect can be triggered once every 0.5s. This effect can still be triggered even when the character who is using this artifact set is not on the field.",
      },
      zh: {
        name: "千岩牢固",
        "2p": "生命值提升20%",
        "4p": "元素战技命中敌人后，使队伍中附近的所有角色攻击力提升20%，护盾强效提升30%，持续3秒。该效果每0.5秒至多触发一次。装备此圣遗物套装的角色处于队伍后台时，依然能触发该效果。",
      },
    },
  },
  "the-exile": {
    id: "the-exile",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "The Exile",
        "2p": "Energy Recharge +20%",
        "4p": "Using an Elemental Burst regenerates 2 Energy for all party members (excluding the wearer) every 2s for 6s. This effect cannot stack.",
      },
      zh: {
        name: "流放者",
        "2p": "元素充能效率提高20%。",
        "4p": "施放元素爆发后，每2秒为队伍中所有角色（不包括自己）恢复2点元素能量。该效果持续6秒，无法叠加。",
      },
    },
  },
  "thundering-fury": {
    id: "thundering-fury",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Thundersoother",
        "2p": "Electro RES increased by 40%.",
        "4p": "Increases DMG against opponents affected by Electro by 35%.",
      },
      zh: {
        name: "平息鸣雷的尊者",
        "2p": "雷元素抗性提高40%。",
        "4p": "对处于雷元素影响下的敌人造成的伤害提升35%。",
      },
    },
  },
  thundersoother: {
    id: "thundersoother",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Thundersoother",
        "2p": "Electro RES increased by 40%.",
        "4p": "Increases DMG against opponents affected by Electro by 35%.",
      },
      zh: {
        name: "平息鸣雷的尊者",
        "2p": "雷元素抗性提高40%。",
        "4p": "对处于雷元素影响下的敌人造成的伤害提升35%。",
      },
    },
  },
  "tiny-miracle": {
    id: "tiny-miracle",
    type: "artifact",
    rarity: 4,
    data: {
      en: {
        name: "Tiny Miracle",
        "2p": "All Elemental RES increased by 20%.",
        "4p": "Incoming elemental DMG increases corresponding Elemental RES by 30% for 10s. Can only occur once every 10s.",
      },
      zh: {
        name: "奇迹",
        "2p": "所有元素抗性提高20%。",
        "4p": "受到某个元素类型的伤害后，相应的抗性提升30%，持续10秒。该效果每10秒只能触发一次。",
      },
    },
  },
  "traveling-doctor": {
    id: "traveling-doctor",
    type: "artifact",
    rarity: 3,
    data: {
      en: {
        name: "Traveling Doctor",
        "2p": "Increases incoming healing by 20%.",
        "4p": "Using Elemental Burst restores 20% HP.",
      },
      zh: { name: "游医", "2p": "角色受到的治疗效果提高20%。", "4p": "施放元素爆发时，恢复20%生命值。" },
    },
  },
  "viridescent-venerer": {
    id: "viridescent-venerer",
    type: "artifact",
    rarity: 5,
    data: {
      en: {
        name: "Viridescent Venerer",
        "2p": "Anemo DMG Bonus +15%",
        "4p": "Increases Swirl DMG by 60%. Decreases opponent’s Elemental RES to the element infused in the Swirl by 40% for 10s.",
      },
      zh: {
        name: "翠绿之影",
        "2p": "获得15%风元素伤害加成。",
        "4p": "扩散反应造成的伤害提升60%。根据扩散的元素类型，降低受到影响的敌人40%的对应元素抗性，持续10秒。",
      },
    },
  },
  "wanderer-s-troupe": { id: "wanderer-s-troupe" },
};

export default artifacts;
