import { log } from "../decorators/log.js";

export class UserService {

    @log({ level: "INFO", logger: console })
    createUser(id, age) {
        return {
            id,
            age
        };
    }

    @log({ level: "INFO", logger: console })
    updateUser(id, newAge) {
        return {
            id,
            age: newAge
        };
    }

    @log({ level: "ERROR", errorsOnly: true, logger: console })
    deleteUser(userId) {
        if (userId === 1) {
            throw new Error("User 1 cannot be deleted");
        }
        return true;
    }
}