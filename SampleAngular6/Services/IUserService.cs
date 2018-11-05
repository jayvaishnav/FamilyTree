using SampleFamilyTree.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleFamilyTree.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Method to Authenticate User
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        User Authenticate(string username, string password);

        /// <summary>
        /// Get All Users
        /// </summary>
        /// <returns></returns>
        IEnumerable<User> GetAll();

        /// <summary>
        /// Get User by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        User GetById(int id);

        /// <summary>
        /// Get Family Tree by UserId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        List<FamilyTree> GetFamilyTreeByUserId(int userId);

        /// <summary>
        /// Get Family Tree by ParentId
        /// </summary>
        /// <param name="parentId"></param>
        /// <returns></returns>
        List<FamilyTree> GetFamilyTreeByParentId(int parentId);

        /// <summary>
        /// Delete Family Tree
        /// </summary>
        /// <param name="id"></param>
        int DeleteFamilyTreeById(int id);

        /// <summary>
        /// Insert Family Tree
        /// </summary>
        /// <param name="familyTree"></param>
        int InsertFamilyTree(FamilyTree familyTree);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="familyTree"></param>
        /// <returns></returns>
        int UpdateFamilyTree(FamilyTree familyTree);
    }
}
