using Models.Domain.Location;
using Models.Domain.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.JobFair
{
    public class JobFair
    {
        public int Id { get; set; }
        public LookUp JobFairType { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string ShortDescription { get; set; }
        public Group Group { get; set; }
        public Location Location { get; set; }
        public LookUp JobFairStatus { get; set; }
        public string ImageUrl { get; set; }
        public string ExternalSiteUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

    }
}

