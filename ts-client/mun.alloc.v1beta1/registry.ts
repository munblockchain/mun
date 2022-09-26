import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateVestingAccount } from "./types/alloc/v1beta1/tx";
import { MsgFundFairburnPool } from "./types/alloc/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/mun.alloc.v1beta1.MsgCreateVestingAccount", MsgCreateVestingAccount],
    ["/mun.alloc.v1beta1.MsgFundFairburnPool", MsgFundFairburnPool],
    
];

export { msgTypes }