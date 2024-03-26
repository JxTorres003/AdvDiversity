using Sabio.Models.Requests.Locations;
using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.JobFair
{
    public class JobFairAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int JobFairTypeId { get; set; }
        [Required]
        [StringLength(250, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(250, MinimumLength = 2)]
        public string Summary { get; set; }
        [Required]
        [StringLength(4000, MinimumLength = 2)]
        public string ShortDescription { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int GroupId { get; set; }
        [Required]
        public LocationAddRequest Location { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int JobFairStatusId { get; set; }
        [Required]
        [StringLength(400, MinimumLength = 2)]
        public string ImageUrl { get; set; }
        [Required]
        [StringLength(400, MinimumLength = 2)]
        public string ExternalSiteUrl { get; set; }
        [Required]
        public DateTime DateStart { get; set; }
        [Required]
        public DateTime DateEnd { get; set; }
    }
}
