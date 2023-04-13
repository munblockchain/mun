import { SHA256 } from "crypto-js";
import { Store } from "vuex";
import { DenomTrace } from "../utils/interfaces";

type Params = {
  $s: Store<any>;
};

export default function ({ $s }: Params) {
  const data = $s.getters["common/ibc/denom"];

  const parseIBCDenom = (ibc_denom: string): string => {
    return data[ibc_denom.toLowerCase()] ?? "";
  };

  const setIBCDenom = (ibc_denom: string, base_denom: string) => {
    $s.dispatch("common/ibc/append", { ibc_denom, base_denom });
  };

  const setIBCDenomTraces = (traces: any[]) => {
    traces.forEach((trace) => {
      let hash: string = SHA256(trace.path + '/' + trace.base_denom).toString();
      setIBCDenom("ibc/" + hash, trace.base_denom);
    });
  };

  return {
    parseIBCDenom,
    setIBCDenomTraces,
  };
}
