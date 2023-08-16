import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
        .then(response => response.data);

}

const getAll = () => {
    return axios.get(baseUrl)
        .then (response => response.data);
}

const deletePerson = (personId) => {
    return axios.delete(`${baseUrl}/${personId}`);
}

const updatePerson = (personId) => {
    return axios.put(`${baseUrl}/${personId}`)
        .then(response => response.data);
}
export default { getAll, create, deletePerson };