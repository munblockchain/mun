import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgClaimFor } from "./types/claim/v1beta1/tx";
import { MsgInitialClaim } from "./types/claim/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/mun.claim.v1beta1.MsgClaimFor", MsgClaimFor],
    ["/mun.claim.v1beta1.MsgInitialClaim", MsgInitialClaim],
    
];

export { msgTypes }