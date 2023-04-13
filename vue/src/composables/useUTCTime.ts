import axios from 'axios'

export interface WorldTimeApiResponse {
    abbreviation: string;
    client_ip: string;
    datetime: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
}

const loadUTCTime = async (): Promise<number> => {
    let unixtime;
    
    try {
        const { data } = await axios.get<WorldTimeApiResponse>('http://worldtimeapi.org/api/timezone/etc/UTC');
        unixtime = data.unixtime
    } catch (error) {
        console.error(error)
        unixtime = Math.floor(Date.now() / 1000)
    }

    return unixtime
}

export default loadUTCTime