
export const getRequest = async (argument) => {
    try {
        const request = await fetch(argument);
        const answer = await request.json();
        return answer;
    } catch (e) {
        console.log(e);
    }
}
