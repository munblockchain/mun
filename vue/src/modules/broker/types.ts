import { Amount } from "../../utils/interfaces";

export interface RemittanceTx {
    transaction: {
        id: string;
        hash?: string;
        sender: string;
        receiver: string;
        coins: Amount[];
        sent_at: string;
        received_at: string;
        retry: number;
        status: string;
    };
    time_left: number;
}
