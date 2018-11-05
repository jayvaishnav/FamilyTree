using SampleFamilyTree.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleFamilyTree.Services
{
    public class UserService : IUserService
    {

        private static List<User> Users = new List<User>() {
            new User(){
                Id=1,
                FirstName="John",
                LastName="Doe",
                Password="pass@123",
                UserName="john"
            },
           new User(){
               Id=2,
                FirstName="Ron",
                LastName="Peter",
                Password="pass@123",
                 UserName="peter"
            }
        };

        private static List<FamilyTree> FamilyTrees = new List<FamilyTree>() {
            new FamilyTree(){
                Id=1,
                FirstName="John",
                LastName="Doe",
                ParentId=0,
                UserId=1
            },
           new FamilyTree(){
                Id=2,
                FirstName="Johnson",
                LastName="Doe",
                ParentId=1,
                UserId=1
            },
           new FamilyTree(){
                Id=3,
                FirstName="Jeen",
                LastName="Doe",
                ParentId=1,
                UserId=1
            },
           new FamilyTree(){
                Id=4,
                FirstName="johny",
                LastName="Doe",
                ParentId=2,
                UserId=1
            },

           new FamilyTree(){
                Id=5,
                FirstName="Peter",
                LastName="Doe",
                ParentId=0,
                UserId=2
            },
           new FamilyTree(){
                Id=6,
                FirstName="Roni",
                LastName="Doe",
                ParentId=5,
                UserId=2
            },
           new FamilyTree(){
                Id=7,
                FirstName="Scott",
                LastName="Doe",
                ParentId=6,
                UserId=2
            },
           new FamilyTree(){
                Id=8,
                FirstName="Dora",
                LastName="Doe",
                ParentId=7,
                UserId=2
            },
           new FamilyTree(){
                Id=9,
                FirstName="johny",
                LastName="Daughter",
                ParentId=4,
                UserId=1
            },
            new FamilyTree(){
                Id=10,
                FirstName="johny",
                LastName="Son",
                ParentId=4,
                UserId=1
            }
        };

        public UserService()
        {
            
        }

        public User Authenticate(string username, string password)
        {
            //here we do not check any password hash or key since we are using in memory user records.
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = Users.SingleOrDefault(x => x.UserName == username && x.Password==password);

            // check if username exists
            if (user == null)
                return null;


            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return Users;
        }

        public User GetById(int id)
        {
            return Users.FirstOrDefault(x => x.Id == id);
        }

        public List<FamilyTree> GetFamilyTreeByUserId(int userId)
        {
            return FamilyTrees.Where(x => x.UserId == userId).ToList();
        }

        public List<FamilyTree> GetFamilyTreeByParentId(int parentId)
        {
            return FamilyTrees.Where(x => x.ParentId == parentId).ToList();
        }

        public int DeleteFamilyTreeById(int id)
        {
            var familyTree = FamilyTrees.FirstOrDefault(x => x.Id == id);
            if (familyTree != null)
            {
                FamilyTrees.Remove(familyTree);
                return id;
            }
            return 0;
        }

        public int InsertFamilyTree(FamilyTree familyTree)
        {
            var id = 0;
            if (familyTree != null)
            {
                var familyTrees = FamilyTrees;
                id = FamilyTrees.Max(x => x.Id) + 1;
                familyTree.Id = id;
                familyTrees.Add(familyTree);
                return id;
            }
            return id;
        }

        public int UpdateFamilyTree(FamilyTree familyTree)
        {
            var id = familyTree.Id;
            if (familyTree != null && id != 0)
            {
                var familyTreeOld = FamilyTrees.SingleOrDefault(x => x.Id == id);
                if (familyTreeOld != null)
                {
                    familyTree.ParentId = familyTreeOld.ParentId;
                    FamilyTrees.Remove(familyTreeOld);
                    FamilyTrees.Add(familyTree);
                    return id;
                }
            }
            return id;
        }
    }
}
