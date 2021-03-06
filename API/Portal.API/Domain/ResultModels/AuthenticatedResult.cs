﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portal.API.Domain.ResultModels
{
    public class AuthenticatedResult
    {
        public bool Authenticated { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int RoleID { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public int OrgID { get; set; }
        public int StatusCode { get; set; }
        public string Phone { get; set; }
        public List<string> ErrorMessages { get; set; }
        public string Token { get; set; }
    }
}
