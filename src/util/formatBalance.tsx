export type CardType = 'BNB' | 'BUSD' | 'CONUT' | 'KLAY';
export type CardWallet = 'Metamask' | 'Kaikas' ;
export type CardTypeNum = 0 | 1 | 2;

const BALANCE_MULTIPLE: {
  [key in CardType]: number;
} = {
  BNB: Math.pow(10, 18),
  BUSD: Math.pow(10, 18),
  CONUT: Math.pow(10, 18),
  KLAY: Math.pow(10, 18),
};

const parseCardType = (cardTypeNum: CardType | CardTypeNum): CardType => {
  switch (Number(cardTypeNum)) {
    case 0:
      return 'BNB';
    case 1:
      return 'BUSD';
    case 2:
      return 'CONUT';
    case 3:
      return 'KLAY';
    default:
      return cardTypeNum as CardType;
  }
};

export const formatSaleBalance = (unit: CardTypeNum | CardType, balance: number): number => {
  const balanceUnit = parseCardType(unit);
  return balance * BALANCE_MULTIPLE[balanceUnit];
};

export const formatBalance = (unit: CardType | CardTypeNum, balance: number): number => {
  const balanceUnit = parseCardType(unit);
  return Number((balance / BALANCE_MULTIPLE[balanceUnit]).toFixed(4));
};
