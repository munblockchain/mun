import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgInitialClaim } from "./types/claim/v1beta1/tx";
import { MsgClaimFor } from "./types/claim/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/mun.claim.v1beta1.MsgInitialClaim", MsgInitialClaim],
    ["/mun.claim.v1beta1.MsgClaimFor", MsgClaimFor],
    
];

export { msgTypes }