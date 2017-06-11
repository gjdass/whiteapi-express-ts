import { container as container_default } from './container.default';
import { container as container_test } from './container.test';

let container;

switch (process.env.NODE_ENV) {
    case "test":
        container = container_test;
        break;
    default:
        container = container_default;
        break;
}

export { container };