import trophyGold from "@/assets/trophy-gold.jpg";
import trophySilver from "@/assets/trophy-sliver.jpg";
import trophyBronze from "@/assets/trophy-bronze.jpg";
import trophyMetal from "@/assets/trophy-metal.jpg";

export const ENCRYPT_KEY = "nzFPuW7y0A2P+naekHxf+A==";

export const contributionStatusColors = {
  pending: "yellow" as const,
  selected: "green" as const,
  rejected: "red" as const,
  "": "gray" as const,
} as const;

export const trophyImages = {
  gold: trophyGold,
  silver: trophySilver,
  bronze: trophyBronze,
  metal: trophyMetal,
};

export const userBrowsers = [
  "chrome",
  "firefox",
  "safari",
  "brave",
  "opera",
  "other",
];
