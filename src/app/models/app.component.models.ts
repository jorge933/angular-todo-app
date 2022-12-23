import { Settings, Task } from '@todo-app/models';

export type ObjectType = Settings | Task;
export type Keys = Array<keyof ObjectType>;
