﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Portal.Domain.DatabaseModels.BaseModel
{
    public class BaseEntity
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public DateTime RegistedDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}
