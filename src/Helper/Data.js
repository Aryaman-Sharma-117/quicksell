const api = "https://api.quicksell.co/v1/internal/frontend-assignment";

const fetchData = async () => {
    try{
        const res = await fetch(api);
        if(!res.ok){
            throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        return data;
    } catch(err){
        throw new Error(err.message);
    }
}

export default fetchData;