import { AvatarConfig } from "react-nice-avatar";

export type AvatarConfigNoBoolean = Omit<
  AvatarConfig,
  "hairColorRandom" | "isGradient"
>;
type MandatoryFields = Required<AvatarConfigNoBoolean>;

type ClosetConfig = {
  [K in keyof AvatarConfigNoBoolean]: MandatoryFields[K][];
};

const skinColors = [
  "pink",
  "white",
  "#F5C5AA",
  "#D6A888",
  "#9C5D42",
  "#D6A98C",
  "#F2B395",
  "#C0946F",
  "#F1D4C0",
  "#C39A78",
  "#673B2A",
  "#C38A6D",
  "#AF6E61",
  "#77392A",
  "#E4B28B",
  "#FCE3D2",
  "#D28659",
  "#F3B68B",
  "#A4614F",
  "green",
  "purple",
];

export const closetConfigs: ClosetConfig = {
  faceColor: skinColors,
  eyeStyle: ["oval", "circle", "smile"],
  earSize: ["big", "small"],
  hatStyle: ["none", "beanie", "turban"],
  hatColor: skinColors,
  hairStyle: ["thick", "normal", "mohawk", "womanLong", "womanShort"],
  hairColor: skinColors,
  noseStyle: ["long", "short", "round"],
  mouthStyle: ["smile", "laugh", "peace"],
  shirtStyle: ["hoody", "short", "polo"],
  shirtColor: skinColors,
  glassesStyle: ["round", "square", "none"],
};
