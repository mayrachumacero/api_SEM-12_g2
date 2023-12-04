interface NoSQLWrapper {
    CreateUser: (user: any) => Promise<any>;
    FindAllUsers: () => Promise<any[]>;
    FindUserByEmail:(user: any) => Promise<any>
    FindUserById:(user: any) => Promise<any>

}
export default NoSQLWrapper;