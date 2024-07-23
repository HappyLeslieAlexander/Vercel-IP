import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState({});
    const [latency, setLatency] = useState(null);
    const [userAgent, setUserAgent] = useState('');
    const [language, setLanguage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const start = Date.now();
                const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
                const response = await fetch(`https://ipinfo.io/json?token=${token}`);
                const data = await response.json();
                setLatency(Date.now() - start);
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

        if (typeof navigator !== 'undefined') {
            setUserAgent(navigator.userAgent);
            setLanguage(navigator.language || navigator.userLanguage);
        }
    }, []);

    return (
        <div className="container">
            <h1>IP Address Information</h1>
            <p>Your IP: <span>{data.ip}</span></p>
            <p>City: <span>{data.city}</span></p>
            <p>Region (State): <span>{data.region}</span></p>
            <p>Country: <span>{data.country}</span></p>
            <p>Location: <span>{data.loc}</span></p>
            <p>ASN & Organization: <span>{data.org}</span></p>
            <p>Postal Code: <span>{data.postal}</span></p>
            <p>Timezone: <span>{data.timezone}</span></p>
            <p>Language: <span>{language}</span></p>
            <p>User Agent: <span>{userAgent}</span></p>
            <p>Latency: <span>{latency} ms</span></p>
        </div>
    );
}
