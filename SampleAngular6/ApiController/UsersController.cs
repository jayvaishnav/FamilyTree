using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SampleFamilyTree.Dtos;
using SampleFamilyTree.Entities;
using SampleFamilyTree.Helpers;
using SampleFamilyTree.Services;

namespace SampleFamilyTree.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
             IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString
            });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpGet()]
        [Route("FamilyTree/{userid}")]
        public IActionResult GetFamilyTreeByUserId(int userid)
        {
            var familyTrees = _userService.GetFamilyTreeByUserId(userid).Select(x => new
            {
                text = x.FirstName + " " + x.LastName,
                value = x.Id,
                ParentId = x.ParentId
            }).ToList();
            return Ok(familyTrees);

        }

        [HttpPost("familytree")]
        public IActionResult FamilyTree([FromBody]FamilyTreeDto familyTreeDto)
        {
            var familyTree = _mapper.Map<FamilyTree>(familyTreeDto);
            var id = familyTree.Id == 0 ? _userService.InsertFamilyTree(familyTree) : _userService.UpdateFamilyTree(familyTree);
            return Ok(id);
        }

        [HttpDelete("familytree")]
        public IActionResult FamilyTree(int id)
        {
            id = _userService.DeleteFamilyTreeById(id);
            return Ok(id);
        }

    }
}
