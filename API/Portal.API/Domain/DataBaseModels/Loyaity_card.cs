﻿using Portal.API.Domain.BaseModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Portal.API.Domain.DataBaseModels
{
    public class Loyaity_card: BaseEntity
    {
        [Required]
        public int no_of_point { get; set; }
    }
}
