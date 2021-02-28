import * as path from "path";
import * as fs from "fs";

const _path = path.join(path.dirname(__dirname),"commands");


export function getCategories(){
    return fs.readdirSync(_path);
}

export function getByCategory(category: string): Map<string, any>{
    const categories = getCategories();
    if(!categories.includes(category)) return new Map()

    const categoryPath = path.join(_path, category);
    const commandFilesByCategory = fs.readdirSync(categoryPath);
    const commands = new Map<string, any>();
    commandFilesByCategory.forEach(async (value) => {
        const name = path.basename(value);
        const command = import(path.join(categoryPath, value));
        commands.set(name, command);
    })
    return commands as Map<string, any>;
}