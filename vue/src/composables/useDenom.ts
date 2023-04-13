import { Store } from "vuex";

import { Amount, DenomTrace } from "../utils/interfaces";

import denomInfo from "../denom.json";
import { AssetForUI } from "./useAssets";
import useIBCDenom from "./useIBCDenom";

interface IDenomInfo {
  denom: string;
  base_denom: string;
  decimal: number;
}

type Response = {
  getDenomTrace: (denom: string) => Promise<DenomTrace>;
  // normalizeDenom: (denom: string) => string;
  normalizeAmount: (amt: Amount) => Amount;
  unnormalizeAmount: (amt: AssetForUI) => Amount;
  denomInfo: IDenomInfo[];
};

type Params = {
  $s: Store<any>;
  opts?: any;
};

export default function ({ $s }: Params): Response {
  //actions
  let queryDenomTrace = (opts: any) =>
    $s.dispatch("ibc.applications.transfer.v1/QueryDenomTrace", opts);

  const { parseIBCDenom } = useIBCDenom({ $s });

  // methods
  let getDenomTrace = async (denom: string): Promise<DenomTrace> => {
    let hash = denom.split("/")[1];

    let denomTrace: DenomTrace = await queryDenomTrace({
      options: { subscribe: false, all: false },
      params: { hash },
    });

    return denomTrace;
  };
  // let normalizeDenom = (denom: string): string => {
  //   let normalized = denom.toUpperCase();

  //   let isIBC = denom.indexOf("ibc/") == 0;

  //   if (isIBC) {
  //     normalized = parseIBCDenom(denom);
  //   }

  //   let di = denomInfo.find(
  //     (d) => d.base_denom.toLowerCase() == normalized.toLowerCase()
  //   );
  //   if (!di) return normalized.toUpperCase();

  //   return di.denom.toUpperCase();
  // };

  let normalizeAmount = (amount: Amount): Amount => {
    let isIBC = amount.denom.indexOf("ibc/") == 0;
    let r = { ...amount };

    if (isIBC) {
      r.denom = parseIBCDenom(r.denom)
    }
    let di = denomInfo.find((d) => d.base_denom == r.denom);
    if (!di) {
      return r;
    }
    r.denom = di.denom;
    r.amount = (Number(r.amount) / 10 ** di.decimal).toString();
    return r;
  };

  let unnormalizeAmount = (amount: AssetForUI): Amount => {
    let r = { ...amount.amount };
    let di = denomInfo.find((d) => d.denom == amount.amount.denom);
    if (!di) {
      return r;
    }
    r.denom = amount.ibc_denom ? amount.ibc_denom : di.base_denom;
    r.amount = (Number(r.amount) * 10 ** di.decimal).toString();
    return r;
  };

  return {
    getDenomTrace,
    // normalizeDenom,
    normalizeAmount,
    unnormalizeAmount,
    denomInfo,
  };
}
