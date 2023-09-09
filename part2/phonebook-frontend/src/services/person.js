import axios from "axios";

const baseUrl = "/api/persons";

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

const update = (personId, changedPerson) => {
    return axios.put(`${baseUrl}/${personId}`, changedPerson)
        .then(response => response.data);
}
export default { getAll, create, deletePerson, update };