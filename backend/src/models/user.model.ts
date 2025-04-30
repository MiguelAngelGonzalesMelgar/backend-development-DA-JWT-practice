interface User {
    id: number;
    email: string;
    password: string; //hashed
}

const users: User[] = [];

export default{
    users,
}
