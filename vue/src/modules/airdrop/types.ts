import { Amount } from "../../utils/interfaces";

export type QueryClaimRecordResponse = {
    claim_record: {
        action_completed?: boolean[];
        action_ready?: boolean[];
        address?: string;
        initial_claimable_amount?: Amount[];
    };
};

export type ClaimableForActionResponse = {
    coins: Amount[];
};