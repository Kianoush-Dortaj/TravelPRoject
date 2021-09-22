// import OperationResult from "../../../core/Operation/OperationResult";
// import { CreateUserRoleDto } from "../../../DTO/UserRole/UserRoleDto";
// import { IUserRoleDoc } from "../../Context/UserRole/IUserRoleDock";
// import { UserRoleEntitie } from "../../Context/UserRole/UserRole";
// import { IUserRoleRepository } from "./IUserRoleRepository";

// export default class UserRoleRepository implements IUserRoleRepository {


//     /*******
//     * Set User Role For User
//     ******/

//     async SetUserRole(item: CreateUserRoleDto): Promise<OperationResult<IUserRoleDoc>> {
//         try {

//             let userRole = await UserRoleEntitie
//                 .build({ roles: [...item.roles], userId: item.userId })

//             await userRole.save();
//             return OperationResult.BuildSuccessResult('Operation Success', userRole);

//         } catch (error) {
//             return OperationResult.BuildFailur(error.message);
//         }

//     }

//     /*******
//     * Update User Role For User
//     ******/

//     async UpdateUserRole(item: CreateUserRoleDto): Promise<OperationResult<boolean>> {

//         try {

//             await UserRoleModel.updateOne(
//                 {
//                     userId: item.userId,
//                 },
//                 { roleId: [...item.roles] });

//             return OperationResult.BuildSuccessResult('Operation Success', true);

//         } catch (error) {
//             return OperationResult.BuildFailur(error.message);
//         }

//     }


// }