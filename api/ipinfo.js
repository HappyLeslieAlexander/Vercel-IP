// api/ipinfo.js
export default async function handler(req, res) {
    const token = process.env.IPINFO_TOKEN;
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    const data = await response.json();
    res.status(200).json(data);
}
