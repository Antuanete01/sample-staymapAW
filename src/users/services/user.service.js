import httpInstance from "../../shared/services/http.instance.js";

/**
 * @class UserService
 * @description Service class for handling CRUD operations on users using HTTP requests
 */
export class UserService {
    /** @type {string} The API endpoint for users */
    resourceEndpoint = import.meta.env.VITE_USERS_ENDPOINT_PATH;

    /** Get all users */
    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    /** Get a user by ID */
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    /** Create a new user */
    create(user) {
        return httpInstance.post(this.resourceEndpoint, user);
    }

    /** Update a user */
    update(id, user) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, user);
    }

    /** Delete a user */
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    /** Find user by email (login helper) */
    getByEmail(email) {
        return httpInstance.get(`${this.resourceEndpoint}?email=${email}`);
    }
}