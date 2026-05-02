import { MathService } from "./services/MathService.js";
import { UserService } from "./services/UserService.js";
import { ConsoleLogger } from "./logger/ConsoleLogger.js";

const logger = new ConsoleLogger();

const math = new MathService();
const user = new UserService();

math.add(10, 20);
math.multiply(5, 6);
math.power(2, 3);

user.createUser(101, 25);
user.updateUser(101, 30);

try {
    user.deleteUser(1);
} catch (e) {
    console.log("Handled error");
}