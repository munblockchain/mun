import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSend } from "./types/ibank/tx";
import { MsgReceive } from "./types/ibank/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/mun.ibank.MsgSend", MsgSend],
    ["/mun.ibank.MsgReceive", MsgReceive],
    
];

export { msgTypes }