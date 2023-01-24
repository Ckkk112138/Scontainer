import {observable, computed, action, decorate} from 'mobx';

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    userList = [];
    courses = [];
    userToEdit = null;

    createUser = (userData) => {
        return fetch("/api/users", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(userData)
        }).then(response => response.status === 201);
    };

    getUser = (userId) => {
        fetch("/api/users/" + userId)
            .then(response => response.json())
            .then(user => this.userToEdit = user)
    };

    updateUser = (user) => {
        return fetch("/api/users/" + user.id,
            {
                method: "PUT",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(user)
            }).then(response => response.status === 200);
    };

    deleteUser = (userId) => {
        fetch("/api/users/" + userId, {method: "DELETE"})
            .then(() => this.getUsers())
    };

    getCourses = () => {
        fetch("/api/courses")
            .then(response => response.json())
            .then(json => this.courses = json)
    };

    getUsers = () => {
        fetch("/api/users")
            .then(response => response.json())
            .then(json => this.userList = json)
    };

}

decorate(UserStore, {
        userList: observable,
        courses: observable,
        userToEdit: observable,

        getCourses: action,
        getUsers: action,

        createUser: action,
        getUser: action,
        deleteUser: action,
        updateUser: action,
    }
);

export default UserStore;