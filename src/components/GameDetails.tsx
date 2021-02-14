import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const GameMode = {
  classic: { name: "کلاسیک", en: "classic", icon: <SupervisorAccountIcon /> },
  classicPro: {
    name: "کلاسیک پیشرفته",
    en: "classicPro",
    icon: <SupervisorAccountIcon />,
  },
  mafiaNight: {
    name: "شب مافیا",
    en: "mafiaNight",
    icon: <SupervisorAccountIcon />,
  },
  mafiaJory: {
    name: "مافیا ژوری",
    en: "mafiaJory",
    icon: <SupervisorAccountIcon />,
  },
  werewolf: { name: "ور ولف", en: "werewolf", icon: <SupervisorAccountIcon /> },
  godfather: {
    name: "پدرخوانده ",
    en: "godfather",
    icon: <SupervisorAccountIcon />,
  },
} as const;

export default GameMode;

export type Sharvands = typeof PlayerRols.shahrvands;

export type Mafias = typeof PlayerRols.mafias;

export type Mostaghel = typeof PlayerRols.mostaghel;

export interface IPlayerRoles {
  shahrvands: Array<keyof Sharvands>;
  mafias: Array<keyof Mafias>;
  mostaghel?: Array<keyof Mostaghel>;
}

export type IFinalRoles = Array<
  keyof Sharvands | keyof Mafias | keyof Mostaghel
>;

export const RolesNames = {
  shahrvands: "شهروند",
  mafias: "مافیا",
  mostaghel: "مستقل",
};
export const shahrvands = {
  rooinTan: "رویین تن",
  sniper: "اسنایپر",
  keshish: "کشیش",
  ghazi: "قاضی",
  kaboy: "کابوی",
  tofangdar: "تفنگدار",
  mohafez: "محافظ",
  ankabot: "عنکبوت",
  farmandeh: "فرمانده",
  ahangar: "اهنگر",
  saghi: "ساقی",
  feramason: "فراماسون",
  tyler: "تایلر",
  negahban: "نگهبان",
  bazgo: "بازجو",
  ghomarbaz: "قمارباز",
};
export const mafias = {
  godfather: "گادفادر",
  terorist: "تروریست",
  natasha: "ناتاشا",
  vakil: "وکیل",
  gasos: "جاسوس",
  mardGhavi: "مرد قوی",
  yakoza: "یاکوزا",
  kharabkar: "خرابکار",
  afsongar: "افسونگر",
  dozd: "دزد",
  nato: "ناتو",
};
export const mostaghel = {
  joker: "جوکر",
  neron: "نرون",
  killer: "کیلر",
};

export const AllRols = {
  ...shahrvands,
  ...mafias,
  ...mostaghel,
} as const;

export const PlayerRols = {
  shahrvands,
  mafias,
  mostaghel,
} as const;
