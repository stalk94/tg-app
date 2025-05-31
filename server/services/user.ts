export async function create(id: number, data: UserModel) {
    const has = await db?.has(`user.${id}`);

    if(!has) {
        await db?.set(`user.${id}`, data);
        return new User(id);
    }
}
export async function findUser(id: number) {
    const user = await db?.get(`user.${id}`);

    if(user) return new User(id, user);
}


export class User {
    private autorise: boolean
    data?: UserModel

    constructor(id: number, data?: UserModel) {
        this.autorise = false;
        if (data) {
            this.data = data;
            this.autorise = true;
        }
        else this.load(id);
    }
    private async load(id: number) {
        const data = await db?.get(`user.${id}`);
        if (data) {
            this.data = data;
            this.autorise = true;
        }
    }
    async set(key: string, data: any) {
        if(this.autorise) await db?.set(`user.${this.data.id}.${key}`, data);
    }
    async dump() {
        if(this.autorise) await db?.set(`user.${this.data.id}`, this.data);
    }
}