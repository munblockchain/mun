import EnglishBip39Words from './bip39/english'
import sha256 from "crypto-js/sha256";
import { RemittanceTx } from './types';

export function generatePasswordPhrases(): string[] {
    return EnglishBip39Words
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .filter((_, index) => index < 6);
}

export function calculatePasswordHash(phrases: string[]): string {
    return sha256(phrases.join()).toString();
}

function month2hex(m: number): string {
    if (m < 10) return m + ""
    if (m == 10) return 'A'
    if (m == 11) return 'B'
    return 'C'
}
function make2digits(n: number): string {
    return ("0" + n).slice(-2)
}

export function calculateDisplayTransactionID(tx: RemittanceTx): string {
    let h = sha256(tx.transaction.sender + "M" + tx.transaction.receiver + "U" + tx.transaction.sent_at + "N" + tx.transaction.id).toString()
    h = h.replace(/i/ig, '').replace(/o/ig, '').replace(/1/ig, '').replace(/0/g, '')

    let date = new Date(tx.transaction.sent_at)
    let id = 'm-' + (date.getFullYear() % 10) + month2hex(date.getMonth() + 1) + make2digits(date.getUTCDate()) + "-" + h.substring(0, 6)

    return id.toUpperCase();
}

export function checkReceiveRawLog(rawLog: string) {
    let received = true;
    let refunded = false;
    const events: any[] = JSON.parse(rawLog)[0].events;
    let brokerEvents = events.filter((event) => event.type == "ibank");
    if (brokerEvents.length == 0) {
      return [false, false];
    }
  
    brokerEvents.forEach((event) => {
      event.attributes.forEach((attr: any) => {
        switch (attr.key) {
          case "receive_success":
            received = attr.value == "true";
            break;
  
          case "refund":
            refunded = attr.value == "true";
            break;
  
          default:
            break;
        }
      });
    });
    return [received, refunded];
  }
  