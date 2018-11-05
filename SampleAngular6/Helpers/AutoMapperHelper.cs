using AutoMapper;
using SampleFamilyTree.Dtos;
using SampleFamilyTree.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleFamilyTree.Helpers
{
    public class AutoMapperHelper : Profile
    {
        public AutoMapperHelper()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<FamilyTree, FamilyTreeDto>();
            CreateMap<FamilyTreeDto, FamilyTree>();
        }
    }
}
