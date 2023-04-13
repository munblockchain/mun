import { V1Beta1GetTxsEventResponse as GetTxsEventResponse } from 'mun-client-ts/cosmos.tx.v1beta1/rest'
import axios, {AxiosResponse} from 'axios'

export function copyToClipboard(str: string): void {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 999999);
  document.execCommand("copy");
  document.body.removeChild(el);
}
export function str2rgba(r: string): string {
  const o: any = [];
  for (let a, c = 0; c < 256; c++) {
    a = c;
    for (let f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ (a >>> 1) : a >>> 1;
    o[c] = a;
  }
  let n = -1;
  for (let t = 0; t < r.length; t++)
    n = (n >>> 8) ^ o[255 & (n ^ r.charCodeAt(t))];
  return ((-1 ^ n) >>> 0).toString(16);
}

export function toShortAddress(address: string): string {
  return address.substring(0, 10) + "..." + address.slice(-4);
}

export function sec2time(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  let str = s + "s";
  if (m != 0) str = m + "m " + str;
  if (h != 0) str = h + "h " + str;
  return str;
}

export async function getTxsByEvent(
  baseUrl: string,
  event: string,
  offset: number,
  limit: number,
  order: 'asc' | 'desc'
): Promise<AxiosResponse<GetTxsEventResponse, any>> {
  return axios.get<GetTxsEventResponse>(
    `${baseUrl}` +
    `/cosmos/tx/v1beta1/txs` +
    `?events=${event}` +
    `&pagination.offset=${offset}` +
    `&pagination.limit=${limit}` +
    `&order_by=${order == 'asc' ? 1 : 2}`
  )
}