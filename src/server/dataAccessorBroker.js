const axios = require('axios');

const putToDo = async (todo) => {
    const response = await axios.put('https://api.xilution.com/elements-data-accessor-beta/thing', todo);

    return response.data;
};

const getToDo = async (id) => {
    const response = await axios.put(`https://api.xilution.com/elements-data-accessor-beta/thing/${id}`);

    return response.data;
};

const deleteToDo = async (id) => {
    const response = await axios.delete(`https://api.xilution.com/elements-data-accessor-beta/thing/${id}`);

    return response.data;
};

const fetchToDos = async (userId) => {
    const response = await axios.get('https://api.xilution.com/elements-data-accessor-beta/fetch-things');

    return response.data;
};

module.exports = {
    deleteToDo,
    fetchToDos,
    getToDo,
    putToDo
};
