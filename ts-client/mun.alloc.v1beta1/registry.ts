import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgFundFairburnPool } from "./types/alloc/v1beta1/tx";
import { MsgCreateVestingAccount } from "./types/alloc/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/mun.alloc.v1beta1.MsgFundFairburnPool", MsgFundFairburnPool],
    ["/mun.alloc.v1beta1.MsgCreateVestingAccount", MsgCreateVestingAccount],
    
];

export { msgTypes }